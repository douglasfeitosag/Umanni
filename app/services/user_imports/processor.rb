module UserImports
  class Processor
    BATCH_SIZE = 100

    def self.call(user_import_id)
      new(UserImport.find(user_import_id)).call
    end

    def initialize(user_import)
      @user_import = user_import
    end

    def call
      @user_import.with_lock do
        return if @user_import.completed? || @user_import.completed_with_errors? || @user_import.failed?

        @user_import.update!(status: :processing, started_at: @user_import.started_at || Time.current)
        rows = read_rows
        duplicate_emails = rows.filter_map { |row| normalize_email(row.email) }.tally.select { |_email, count| count > 1 }.keys
        rows.each_slice(BATCH_SIZE) { |batch| process_batch(batch, duplicate_emails) }
        finish!
      end
    rescue Reader::InvalidSource
      @user_import.update!(status: :failed, failure_code: :source_unreadable, finished_at: Time.current)
      broadcast_change
    end

    private

    def read_rows
      attachment = @user_import.source_file
      raise Reader::InvalidSource, :invalid_file unless attachment.attached?

      attachment.open do |file|
        extension = File.extname(attachment.filename.to_s).downcase
        extension == ".csv" ? CsvReader.new(file).read : XlsxReader.new(file).read
      end
    end

    def process_batch(rows, duplicate_emails)
      created_count = 0
      ActiveRecord::Base.transaction do
        Current.suppress_dashboard_metrics = true
        rows.each do |row|
          next if @user_import.rows.exists?(row_number: row.number)

          created_count += 1 if process_row(row, duplicate_emails)
        end
        refresh_counts!
      ensure
        Current.suppress_dashboard_metrics = false
      end
      User.invalidate_dashboard_metrics! if created_count.positive?
      broadcast_change
    end

    def process_row(row, duplicate_emails)
      email = normalize_email(row.email)
      role = row.role.to_s.strip.presence || "regular"
      error = row.error_code || validation_error(row, email, role)
      error ||= "duplicate_in_file" if email.present? && duplicate_emails.include?(email)
      if error
        @user_import.rows.create!(row_number: row.number, status: :rejected, normalized_email: email, normalized_role: role.in?(User::ROLES.values) ? role : nil, error_code: error)
        return false
      end

      user = User.new(full_name: row.full_name.to_s.strip, email:, role:)
      if user.save
        @user_import.rows.create!(row_number: row.number, status: :created, normalized_email: email, normalized_role: role, user:)
        true
      else
        @user_import.rows.create!(row_number: row.number, status: :rejected, normalized_email: email, normalized_role: role, error_code: "duplicate_existing")
        false
      end
    rescue ActiveRecord::RecordNotUnique
      @user_import.rows.create!(row_number: row.number, status: :rejected, normalized_email: email, normalized_role: role, error_code: "duplicate_existing")
      false
    end

    def validation_error(row, email, role)
      return "missing_full_name" if row.full_name.to_s.strip.blank?
      return "missing_email" if email.blank?
      return "invalid_email" unless email.match?(URI::MailTo::EMAIL_REGEXP)
      return "invalid_role" unless role.in?(User::ROLES.values)
    end

    def normalize_email(value)
      value.to_s.strip.downcase.presence
    end

    def refresh_counts!
      created = @user_import.rows.created.count
      rejected = @user_import.rows.rejected.count
      @user_import.update!(created_count: created, rejected_count: rejected, processed_count: created + rejected)
    end

    def finish!
      @user_import.reload
      @user_import.update!(status: @user_import.rejected_count.positive? ? :completed_with_errors : :completed, finished_at: Time.current)
      broadcast_change
    end

    def broadcast_change
      ActionCable.server.broadcast("user_import:#{@user_import.id}", { type: "user_import.changed", schemaVersion: 1, importId: @user_import.id.to_s })
    end
  end
end

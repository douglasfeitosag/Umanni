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

        start!
        process_rows(read_rows)
        finish!
      end
    rescue Reader::InvalidSource
      fail_as_unreadable!
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

    def start!
      @user_import.update!(status: :processing, started_at: @user_import.started_at || Time.current)
    end

    def process_rows(rows)
      duplicate_emails = duplicate_emails_in(rows)
      rows.each_slice(BATCH_SIZE) { |batch| process_batch(batch, duplicate_emails) }
    end

    def duplicate_emails_in(rows)
      rows.filter_map { |row| normalize_email(row.email) }
          .tally
          .select { |_email, count| count > 1 }
          .keys
    end

    def fail_as_unreadable!
      @user_import.update!(status: :failed, failure_code: :source_unreadable, finished_at: Time.current)
      broadcast_change
    end

    def process_batch(rows, duplicate_emails)
      created_count = process_batch_transaction(rows, duplicate_emails)
      User.invalidate_dashboard_metrics! if created_count.positive?
      broadcast_change
    end

    def process_batch_transaction(rows, duplicate_emails)
      Current.suppress_dashboard_metrics = true
      ActiveRecord::Base.transaction do
        persist_batch(rows, duplicate_emails)
      ensure
        Current.suppress_dashboard_metrics = false
      end
    end

    def persist_batch(rows, duplicate_emails)
      created_count = rows.count do |row|
        next false if @user_import.rows.exists?(row_number: row.number)

        RowProcessor.new(@user_import, row, duplicate_emails).call
      end
      refresh_counts!
      created_count
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
      @user_import.update!(status: @user_import.rejected_count.positive? ? :completed_with_errors : :completed,
                           finished_at: Time.current)
      broadcast_change
    end

    def broadcast_change
      ActionCable.server.broadcast("user_import:#{@user_import.id}",
                                   { type: "user_import.changed", schemaVersion: 1, importId: @user_import.id.to_s })
    end
  end
end

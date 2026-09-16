module UserImports
  class RowProcessor
    def initialize(user_import, row, duplicate_emails)
      @user_import = user_import
      @row = row
      @duplicate_emails = duplicate_emails
    end

    def call
      return create_rejected_row(error) && false if error

      create_user_row
    rescue ActiveRecord::RecordNotUnique
      create_rejected_row("duplicate_existing")
      false
    end

    private

    def email
      @email ||= @row.email.to_s.strip.downcase.presence
    end

    def role
      @role ||= @row.role.to_s.strip.presence || "regular"
    end

    def error
      @row.error_code || validation_error || duplicate_error
    end

    def validation_error
      return "missing_full_name" if @row.full_name.to_s.strip.blank?
      return "missing_email" if email.blank?
      return "invalid_email" unless email.match?(URI::MailTo::EMAIL_REGEXP)

      "invalid_role" unless role.in?(User::ROLES.values)
    end

    def duplicate_error
      "duplicate_in_file" if email.present? && @duplicate_emails.include?(email)
    end

    def create_rejected_row(error_code)
      normalized_role = role if role.in?(User::ROLES.values)
      @user_import.rows.create!(row_number: @row.number, status: :rejected, normalized_email: email,
                                normalized_role:, error_code:)
    end

    def create_user_row
      user = User.new(full_name: @row.full_name.to_s.strip, email:, role:)
      return create_rejected_row("duplicate_existing") && false unless user.save

      @user_import.rows.create!(row_number: @row.number, status: :created, normalized_email: email,
                                normalized_role: role, user:)
      true
    end
  end
end

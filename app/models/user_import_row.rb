class UserImportRow < ApplicationRecord
  ERROR_CODES = %w[missing_full_name missing_email invalid_email invalid_role formula_not_allowed field_too_long
                   row_too_large duplicate_in_file duplicate_existing malformed_row].freeze

  belongs_to :user_import
  belongs_to :user, optional: true

  enum :status, { created: "created", rejected: "rejected" }, validate: true

  validates :row_number, numericality: { only_integer: true, greater_than_or_equal_to: 2 }
  validates :normalized_email, length: { maximum: 254 }, allow_nil: true
  validates :normalized_role, inclusion: { in: User::ROLES.values }, allow_nil: true
  validates :error_code, inclusion: { in: ERROR_CODES }, allow_nil: true
  validate :result_is_consistent

  private

  def result_is_consistent
    if created?
      errors.add(:error_code, "must be blank for created rows") if error_code.present?
    elsif rejected?
      errors.add(:error_code, "is required for rejected rows") if error_code.blank?
      errors.add(:user, "must be blank for rejected rows") if user.present?
    end
  end
end

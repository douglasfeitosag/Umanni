class UserImport < ApplicationRecord
  STATUSES = { queued: "queued", processing: "processing", completed: "completed",
               completed_with_errors: "completed_with_errors", failed: "failed" }.freeze
  FAILURE_CODES = %w[source_unreadable retry_exhausted technical_failure].freeze

  belongs_to :imported_by, class_name: "User", optional: true
  has_many :rows, class_name: "UserImportRow", dependent: :restrict_with_exception
  has_one_attached :source_file

  enum :status, STATUSES, default: :queued, validate: true

  validates :total_count, :processed_count, :created_count, :rejected_count,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :total_count, numericality: { less_than_or_equal_to: 10_000 }
  validates :failure_code, inclusion: { in: FAILURE_CODES }, allow_nil: true
  validate :counts_are_consistent
  validate :timestamps_match_status
  validate :terminal_states_are_complete

  def progress_percent
    return 0 if total_count.zero?

    (processed_count * 100.0 / total_count).round
  end

  private

  def counts_are_consistent
    unless processed_count == created_count + rejected_count
      errors.add(:processed_count,
                 "must equal created and rejected counts")
    end
    errors.add(:processed_count, "cannot exceed total count") if processed_count > total_count
  end

  def timestamps_match_status
    validate_queued_timestamps if queued?
    validate_processing_timestamps if processing?
    validate_terminal_timestamp if terminal?
    validate_failure_code
  end

  def terminal_states_are_complete
    return unless completed? || completed_with_errors?

    validate_completion_counts
    validate_terminal_rejections
  end

  def validate_queued_timestamps
    errors.add(:started_at, "must be blank while queued") if started_at.present?
    errors.add(:finished_at, "must be blank while queued") if finished_at.present?
  end

  def validate_processing_timestamps
    errors.add(:started_at, "is required while processing") if started_at.blank?
    errors.add(:finished_at, "must be blank while processing") if finished_at.present?
  end

  def validate_terminal_timestamp
    return if finished_at.present?

    errors.add(:finished_at, "is required for a terminal import")
  end

  def validate_failure_code
    errors.add(:failure_code, "is required when failed") if failed? && failure_code.blank?
    errors.add(:failure_code, "must be blank unless failed") unless failed? || failure_code.blank?
  end

  def terminal?
    completed? || completed_with_errors? || failed?
  end

  def validate_completion_counts
    return if processed_count == total_count

    errors.add(:processed_count, "must equal total count when complete")
  end

  def validate_terminal_rejections
    validate_completed_rejections if completed?
    validate_completed_with_errors_rejections if completed_with_errors?
  end

  def validate_completed_rejections
    return unless rejected_count.positive?

    errors.add(:rejected_count, "must be zero when completed")
  end

  def validate_completed_with_errors_rejections
    return unless rejected_count.zero?

    errors.add(:rejected_count,
               "must be positive when completed with errors")
  end
end

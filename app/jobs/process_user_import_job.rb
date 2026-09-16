class ProcessUserImportJob < ApplicationJob
  queue_as :imports
  self.enqueue_after_transaction_commit = false

  retry_on ActiveRecord::ConnectionFailed, wait: :polynomially_longer, attempts: 3

  def perform(user_import_id)
    UserImports::Processor.call(user_import_id)
  rescue ActiveRecord::ConnectionFailed
    raise
  rescue StandardError => error
    Rails.logger.error("user_import.failed class=#{error.class}")
    UserImport.where(id: user_import_id).where.not(status: %w[completed completed_with_errors]).update_all(status: "failed", failure_code: "technical_failure", finished_at: Time.current)
  end
end

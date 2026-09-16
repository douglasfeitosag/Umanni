class ProcessUserImportJob < ApplicationJob
  queue_as :imports
  self.enqueue_after_transaction_commit = false

  retry_on ActiveRecord::ConnectionFailed, wait: :polynomially_longer, attempts: 3

  def perform(user_import_id)
    UserImports::Processor.call(user_import_id)
  rescue ActiveRecord::ConnectionFailed
    raise
  rescue StandardError => e
    Rails.logger.error("user_import.failed class=#{e.class}")
    pending_imports(user_import_id).find_each { |user_import| fail_import(user_import) }
  end

  private

  def pending_imports(user_import_id)
    UserImport.where(id: user_import_id).where.not(status: %w[completed completed_with_errors])
  end

  def fail_import(user_import)
    user_import.update!(status: :failed, failure_code: "technical_failure", finished_at: Time.current)
  end
end

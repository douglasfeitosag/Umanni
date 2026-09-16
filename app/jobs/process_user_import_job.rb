class ProcessUserImportJob < ApplicationJob
  queue_as :imports
  self.enqueue_after_transaction_commit = false

  retry_on ActiveRecord::ConnectionFailed, wait: :polynomially_longer, attempts: 3 do |job, _error|
    job.send(:fail_imports, job.arguments.fetch(0), "retry_exhausted")
  end

  def perform(user_import_id)
    UserImports::Processor.call(user_import_id)
  rescue ActiveRecord::ConnectionFailed
    raise
  rescue StandardError => e
    Rails.logger.error("user_import.failed class=#{e.class}")
    fail_imports(user_import_id, "technical_failure")
  end

  private

  def pending_imports(user_import_id)
    UserImport.where(id: user_import_id).where.not(status: %w[completed completed_with_errors])
  end

  def fail_imports(user_import_id, failure_code)
    pending_imports(user_import_id).find_each do |user_import|
      user_import.update!(status: :failed, failure_code:, finished_at: Time.current)
      ActionCable.server.broadcast("user_import:#{user_import.id}",
                                   { type: "user_import.changed", schemaVersion: 1, importId: user_import.id.to_s })
    end
  end
end

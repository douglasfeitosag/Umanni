module UserImports
  class Enqueue
    class Failed < StandardError; end

    def self.call(imported_by:, upload:, total_count:)
      ActiveRecord::Base.transaction do
        user_import = UserImport.create!(imported_by:, total_count:)
        user_import.source_file.attach(upload)
        result = ProcessUserImportJob.perform_later(user_import.id)
        raise Failed unless result

        user_import
      end
    end
  end
end

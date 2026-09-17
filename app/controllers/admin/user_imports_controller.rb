module Admin
  class UserImportsController < BaseController
    PAGE_SIZE = 50

    def index
      render_index
    end

    def show
      user_import = UserImport.find(params.expect(:id))
      render inertia: "Admin/UserImports/Show", props: show_props(user_import)
    end

    def create
      upload = params.dig(:user_import, :source_file)
      return render_index_error(:missing_file) if upload.blank?

      preflight = UserImports::Preflight.call(upload)
      return render_index_error(preflight.error) unless preflight.success?

      user_import = UserImports::Enqueue.call(imported_by: Current.user, upload:, total_count: preflight.rows.length)
      redirect_to admin_user_import_path(user_import), notice: t("notices.user_import_enqueued")
    rescue UserImports::Enqueue::Failed
      render_index_error(:enqueue_failed)
    end

    private

    def render_index_error(code)
      render_index(errors: { sourceFile: import_error_message(code) }, status: :unprocessable_content)
    end

    def render_index(errors: nil, status: :ok)
      props = { imports: imports_props }
      props[:errors] = errors if errors
      render inertia: "Admin/UserImports/Index", props:, status:
    end

    def imports_props
      UserImport.order(created_at: :desc).map { |user_import| import_props(user_import) }
    end

    def show_props(user_import)
      results, pagination = paginated_rows(user_import.rows.order(:row_number))
      {
        userImport: import_props(user_import, detail: true),
        results: results.map { |row| row_props(row) },
        pagination:
      }
    end

    def paginated_rows(relation)
      total_items = relation.count
      total_pages = [1, (total_items.to_f / PAGE_SIZE).ceil].max
      page = params.fetch(:page, 1).to_i.clamp(1, total_pages)
      results = relation.offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE)
      [results, { page:, pageSize: PAGE_SIZE, totalPages: total_pages, totalItems: total_items }]
    end

    def import_props(user_import, detail: false)
      props = import_summary_props(user_import)
      return props unless detail

      props.merge(import_detail_props(user_import))
    end

    def import_summary_props(user_import)
      {
        id: user_import.id.to_s,
        filename: user_import.source_file.attached? ? user_import.source_file.filename.to_s : "Arquivo indisponível",
        status: user_import.status,
        **import_counter_props(user_import),
        importedBy: imported_by_props(user_import),
        **import_timestamp_props(user_import)
      }
    end

    def import_counter_props(user_import)
      {
        totalCount: user_import.total_count,
        processedCount: user_import.processed_count,
        createdCount: user_import.created_count,
        rejectedCount: user_import.rejected_count
      }
    end

    def import_timestamp_props(user_import)
      {
        createdAt: user_import.created_at.iso8601,
        startedAt: user_import.started_at&.iso8601,
        finishedAt: user_import.finished_at&.iso8601
      }
    end

    def imported_by_props(user_import)
      return unless user_import.imported_by

      { id: user_import.imported_by.id.to_s, fullName: user_import.imported_by.full_name }
    end

    def import_detail_props(user_import)
      {
        failureCode: user_import.failure_code,
        failureMessage: user_import.failure_code && t("user_imports.failure_message"),
        progressPercent: user_import.progress_percent
      }
    end

    def row_props(row)
      {
        rowNumber: row.row_number,
        status: row.status,
        normalizedEmail: row.normalized_email,
        normalizedRole: row.normalized_role,
        errorCode: row.error_code,
        errorMessage: row.error_code && import_error_message(row.error_code),
        userId: row.user_id&.to_s
      }
    end

    def import_error_message(code)
      t("user_imports.errors.#{code}", default: t("user_imports.errors.default"))
    end
  end
end

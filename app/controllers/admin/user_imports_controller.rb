module Admin
  class UserImportsController < BaseController
    PAGE_SIZE = 50

    def index
      render inertia: "Admin/UserImports/Index", props: { imports: UserImport.order(created_at: :desc).map { |user_import| import_props(user_import) } }
    end

    def show
      user_import = UserImport.find(params.expect(:id))
      requested_page = [params.fetch(:page, 1).to_i, 1].max
      relation = user_import.rows.order(:row_number)
      total_items = relation.count
      total_pages = [1, (total_items.to_f / PAGE_SIZE).ceil].max
      page = [requested_page, total_pages].min
      results = relation.offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE)
      render inertia: "Admin/UserImports/Show", props: {
        userImport: import_props(user_import, detail: true),
        results: results.map { |row| row_props(row) },
        pagination: { page:, pageSize: PAGE_SIZE, totalPages: total_pages, totalItems: total_items }
      }
    end

    def create
      upload = params.require(:user_import).fetch(:source_file)
      preflight = UserImports::Preflight.call(upload)
      return render_index_error(preflight.error) unless preflight.success?

      user_import = UserImports::Enqueue.call(imported_by: Current.user, upload:, total_count: preflight.rows.length)
      redirect_to admin_user_import_path(user_import), notice: "Importação adicionada à fila."
    rescue UserImports::Enqueue::Failed, ActiveRecord::ActiveRecordError
      render_index_error(:enqueue_failed)
    end

    private

    def render_index_error(code)
      render inertia: "Admin/UserImports/Index", props: { imports: UserImport.order(created_at: :desc).map { |user_import| import_props(user_import) }, errors: { sourceFile: import_error_message(code) } }, status: :unprocessable_content
    end

    def import_props(user_import, detail: false)
      props = {
        id: user_import.id.to_s,
        filename: user_import.source_file.attached? ? user_import.source_file.filename.to_s : "Arquivo indisponível",
        status: user_import.status,
        totalCount: user_import.total_count,
        processedCount: user_import.processed_count,
        createdCount: user_import.created_count,
        rejectedCount: user_import.rejected_count,
        importedBy: user_import.imported_by && { id: user_import.imported_by.id.to_s, fullName: user_import.imported_by.full_name },
        createdAt: user_import.created_at.iso8601,
        startedAt: user_import.started_at&.iso8601,
        finishedAt: user_import.finished_at&.iso8601
      }
      return props unless detail

      props.merge(failureCode: user_import.failure_code, failureMessage: user_import.failure_code && "A importação não pôde ser concluída.", progressPercent: user_import.progress_percent)
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
      {
        missing_file: "Selecione um arquivo CSV ou XLSX.", unsupported_file: "Envie um CSV UTF-8 ou XLSX válido.", file_too_large: "O arquivo deve ter no máximo 10 MiB.", too_many_rows: "O arquivo deve ter no máximo 10.000 linhas.", invalid_headers: "Use os cabeçalhos full_name, email e role.", invalid_file: "O arquivo não pôde ser lido.", invalid_workbook: "O XLSX deve conter uma única planilha válida.", enqueue_failed: "A importação não pôde ser adicionada à fila. Tente novamente.", missing_full_name: "Nome obrigatório.", missing_email: "E-mail obrigatório.", invalid_email: "E-mail inválido.", invalid_role: "Papel inválido.", formula_not_allowed: "Fórmulas não são permitidas.", field_too_long: "Um campo excede o limite.", row_too_large: "Uma linha excede o limite.", duplicate_in_file: "E-mail repetido no arquivo.", duplicate_existing: "E-mail já cadastrado.", malformed_row: "Linha inválida."
      }.fetch(code.to_sym, "O arquivo não pôde ser processado.")
    end
  end
end

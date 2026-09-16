class CreateUserImports < ActiveRecord::Migration[8.1]
  def change
    create_table :user_imports do |t|
      t.references :imported_by, foreign_key: { to_table: :users, on_delete: :nullify }, null: true
      t.string :status, null: false, default: "queued"
      t.integer :total_count, null: false, default: 0
      t.integer :processed_count, null: false, default: 0
      t.integer :created_count, null: false, default: 0
      t.integer :rejected_count, null: false, default: 0
      t.datetime :started_at
      t.datetime :finished_at
      t.string :failure_code
      t.timestamps
    end

    create_table :user_import_rows do |t|
      t.references :user_import, null: false, foreign_key: true
      t.integer :row_number, null: false
      t.string :status, null: false
      t.string :normalized_email
      t.string :normalized_role
      t.string :error_code
      t.references :user, foreign_key: { on_delete: :nullify }, null: true
      t.timestamps

      t.index %i[user_import_id row_number], unique: true
      t.index %i[user_import_id status row_number]
    end

    add_check_constraint :user_imports,
                         "processed_count >= 0 AND created_count >= 0 AND rejected_count >= 0 AND total_count >= 0 AND processed_count = created_count + rejected_count AND processed_count <= total_count",
                         name: "user_imports_counts_consistent"
    add_check_constraint :user_imports,
                         "status IN ('queued', 'processing', 'completed', 'completed_with_errors', 'failed')",
                         name: "user_imports_status_allowed"
    add_check_constraint :user_imports,
                         "failure_code IS NULL OR failure_code IN ('source_unreadable', 'retry_exhausted', 'technical_failure')",
                         name: "user_imports_failure_code_allowed"
    add_check_constraint :user_import_rows,
                         "status IN ('created', 'rejected')",
                         name: "user_import_rows_status_allowed"
    add_check_constraint :user_import_rows,
                         "error_code IS NULL OR error_code IN ('missing_full_name', 'missing_email', 'invalid_email', 'invalid_role', 'formula_not_allowed', 'field_too_long', 'row_too_large', 'duplicate_in_file', 'duplicate_existing', 'malformed_row')",
                         name: "user_import_rows_error_code_allowed"
    add_check_constraint :user_import_rows,
                         "(status = 'created' AND error_code IS NULL AND user_id IS NOT NULL) OR (status = 'rejected' AND error_code IS NOT NULL AND user_id IS NULL)",
                         name: "user_import_rows_result_consistent"
    add_check_constraint :users, "octet_length(full_name) <= 800", name: "users_full_name_bytes_limited"
    add_check_constraint :users, "octet_length(email) <= 254", name: "users_email_bytes_limited"
  end
end

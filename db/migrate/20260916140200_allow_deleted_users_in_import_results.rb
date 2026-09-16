# rubocop:disable-next Layout/LineLength
class AllowDeletedUsersInImportResults < ActiveRecord::Migration[8.1]
  def change
    remove_check_constraint :user_import_rows, name: "user_import_rows_result_consistent"
    add_check_constraint :user_import_rows,
                         "(status = 'created' AND error_code IS NULL) OR (status = 'rejected' AND error_code IS NOT NULL AND user_id IS NULL)",
                         name: "user_import_rows_result_consistent"
  end
end

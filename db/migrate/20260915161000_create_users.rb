class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |table|
      table.string :full_name, null: false
      table.string :email, null: false
      table.string :role, null: false, default: "regular"
      table.string :password_digest
      table.timestamps
    end

    add_index :users, "lower(email)", unique: true, name: "index_users_on_lower_email"
    add_check_constraint :users, "role IN ('admin', 'regular')", name: "users_role_allowed"
  end
end

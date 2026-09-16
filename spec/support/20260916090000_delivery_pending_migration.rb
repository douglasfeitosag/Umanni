class DeliveryPendingMigration < ActiveRecord::Migration[8.1]
  def change
    create_table :delivery_gate_probes do |table|
      table.string :purpose, null: false, default: "startup-gate"
    end
  end
end

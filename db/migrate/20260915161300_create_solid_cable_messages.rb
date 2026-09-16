class CreateSolidCableMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :solid_cable_messages do |table|
      table.binary :channel, limit: 1024, null: false
      table.binary :payload, limit: 536_870_912, null: false
      table.datetime :created_at, null: false
      table.bigint :channel_hash, null: false
      table.index :channel
      table.index :channel_hash
      table.index :created_at
    end
  end
end

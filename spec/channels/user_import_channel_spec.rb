require "rails_helper"

RSpec.describe UserImportChannel, type: :channel do
  before do
    UserImportRow.delete_all
    UserImport.delete_all
    Session.delete_all
    User.delete_all
  end

  it "streams only an existing import to an administrator" do
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    user_import = UserImport.create!(imported_by: admin, total_count: 0)

    stub_connection current_user: admin
    subscribe(id: user_import.id)

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("user_import:#{user_import.id}")
  end

  it "rejects regular users and forged import identifiers" do
    regular = User.create!(full_name: "Regular", email: "regular@example.com", password: "uma frase segura")

    stub_connection current_user: regular
    subscribe(id: "999999")

    expect(subscription).to be_rejected
  end
end

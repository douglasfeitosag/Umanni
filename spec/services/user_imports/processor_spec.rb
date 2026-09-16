require "rails_helper"

RSpec.describe UserImports::Processor do
  def upload(contents)
    file = Tempfile.new(["people", ".csv"])
    file.write(contents)
    file.rewind
    ActionDispatch::Http::UploadedFile.new(tempfile: file, filename: "people.csv", type: "text/csv")
  end

  def create_import(contents)
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    source = upload(contents)
    preflight = UserImports::Preflight.call(source)
    UserImports::Enqueue.call(imported_by: admin, upload: source, total_count: preflight.rows.length)
  end

  before do
    UserImportRow.delete_all
    UserImport.delete_all
    ActiveStorage::Attachment.delete_all
    ActiveStorage::Blob.delete_all
    Session.delete_all
    User.delete_all
  end

  it "creates only valid unique users and reports every duplicate in the file" do
    user_import = create_import("full_name,email,role\nAna,ana@example.com,regular\nOutra Ana, ANA@example.com ,admin\n,missing@example.com,regular\n")

    described_class.call(user_import.id)

    expect(user_import.reload).to have_attributes(status: "completed_with_errors", total_count: 3, processed_count: 3, created_count: 0, rejected_count: 3)
    expect(User.where(email: "ana@example.com")).not_to exist
    expect(user_import.rows.order(:row_number).pluck(:error_code)).to eq(["duplicate_in_file", "duplicate_in_file", "missing_full_name"])
  end

  it "preserves rows and counters when the same job is performed again" do
    user_import = create_import("full_name,email,role\nAna,ana@example.com,regular\n")

    described_class.call(user_import.id)
    snapshot = user_import.reload.attributes.slice("processed_count", "created_count", "rejected_count", "status")
    described_class.call(user_import.id)

    expect(user_import.reload.attributes.slice("processed_count", "created_count", "rejected_count", "status")).to eq(snapshot)
    expect(user_import.rows.count).to eq(1)
    expect(User.where(email: "ana@example.com").count).to eq(1)
  end

  it "rejects an address already owned by another account without changing it" do
    existing = User.create!(full_name: "Existente", email: "taken@example.com", password: "uma frase segura")
    user_import = create_import("full_name,email,role\nNovo nome,taken@example.com,admin\n")

    described_class.call(user_import.id)

    expect(existing.reload).to have_attributes(full_name: "Existente", role: "regular")
    expect(user_import.rows.first).to have_attributes(status: "rejected", error_code: "duplicate_existing")
  end

  it "creates valid accounts and records row-level validation failures" do
    user_import = create_import("full_name,email,role\nAna,ana@example.com,admin\nBia,invalid,regular\nCaio,caio@example.com,owner\nDora,dora@example.com,\n")

    described_class.call(user_import.id)

    expect(user_import.reload).to have_attributes(status: "completed_with_errors", processed_count: 4, created_count: 2, rejected_count: 2)
    expect(User.where(email: %w[ana@example.com dora@example.com]).order(:email).pluck(:role)).to eq(%w[admin regular])
    expect(user_import.rows.order(:row_number).pluck(:status, :error_code)).to eq([[ "created", nil ], [ "rejected", "invalid_email" ], [ "rejected", "invalid_role" ], [ "created", nil ]])
  end

  it "marks an unattached queued import as unreadable instead of creating accounts" do
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    user_import = UserImport.create!(imported_by: admin, total_count: 0)

    described_class.call(user_import.id)

    expect(user_import.reload).to have_attributes(status: "failed", failure_code: "source_unreadable")
    expect(User.where.not(id: admin.id)).not_to exist
  end
end

require "rails_helper"

RSpec.describe UserImports::Enqueue do
  def upload
    ActionDispatch::Http::UploadedFile.new(tempfile: Tempfile.new([ "people", ".csv" ]).tap { |file| file.write("full_name,email\nAna,ana@example.com\n"); file.rewind }, filename: "people.csv", type: "text/csv")
  end

  before do
    UserImportRow.delete_all
    UserImport.delete_all
    ActiveStorage::Attachment.delete_all
    ActiveStorage::Blob.delete_all
    Session.delete_all
    User.delete_all
  end

  it "rolls back the import and attachment when the job cannot be enqueued" do
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    allow(ProcessUserImportJob).to receive(:perform_later).and_return(nil)

    expect { described_class.call(imported_by: admin, upload:, total_count: 1) }.to raise_error(described_class::Failed)
    expect(UserImport.count).to eq(0)
    expect(ActiveStorage::Attachment.count).to eq(0)
  end
end

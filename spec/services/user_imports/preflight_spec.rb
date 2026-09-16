require "rails_helper"

RSpec.describe UserImports::Preflight do
  def upload(contents, filename: "people.csv")
    file = Tempfile.new(["user-import", File.extname(filename)])
    file.write(contents)
    file.rewind
    ActionDispatch::Http::UploadedFile.new(tempfile: file, filename:, type: "text/csv")
  end

  it "accepts canonical UTF-8 CSV rows without persisting data" do
    result = described_class.call(upload("full_name,email,role\nAna Silva,ANA@example.com,regular\n"))

    expect(result).to be_success
    expect(result.rows).to contain_exactly(have_attributes(number: 2, full_name: "Ana Silva", email: "ANA@example.com", role: "regular", error_code: nil))
  end

  it "rejects an unknown header before enqueue" do
    result = described_class.call(upload("full_name,email,department\nAna,ana@example.com,People\n"))

    expect(result).not_to be_success
    expect(result.error).to eq(:invalid_headers)
  end

  it "keeps formula input out of the valid processing path" do
    result = described_class.call(upload("full_name,email,role\n=SUM(A1),ana@example.com,regular\n"))

    expect(result).to be_success
    expect(result.rows.first.error_code).to eq("formula_not_allowed")
  end
end

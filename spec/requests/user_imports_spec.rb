require "rails_helper"

RSpec.describe "User imports", type: :request do
  around do |example|
    previous = ActionController::Base.allow_forgery_protection
    ActionController::Base.allow_forgery_protection = false
    example.run
  ensure
    ActionController::Base.allow_forgery_protection = previous
  end

  before do
    UserImportRow.delete_all
    UserImport.delete_all
    ActiveStorage::Attachment.delete_all
    ActiveStorage::Blob.delete_all
    Session.delete_all
    User.delete_all
  end

  def create_user(email:, role: :regular)
    User.create!(full_name: "Pessoa", email:, role:, password: "uma frase segura")
  end

  def sign_in(user)
    post "/session", params: { session: { email: user.email, password: "uma frase segura" } }, headers: inertia_headers
  end

  def inertia_headers
    { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
  end

  def csv_upload(contents = "full_name,email,role\nAna,ana@example.com,regular\n")
    Rack::Test::UploadedFile.new(StringIO.new(contents), "text/csv", original_filename: "people.csv")
  end

  it "allows an administrator to enqueue a valid file without creating users in the request" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)

    expect do
      post "/admin/user_imports", params: { user_import: { source_file: csv_upload } },
                                  headers: inertia_headers
    end.to change(UserImport, :count).by(1).and change(SolidQueue::Job, :count).by(1)

    user_import = UserImport.last
    expect(response).to redirect_to("/admin/user_imports/#{user_import.id}")
    expect(user_import).to be_queued
    expect(User.where(email: "ana@example.com")).not_to exist
  end

  it "denies import routes to a regular user without persisting an upload" do
    regular = create_user(email: "regular@example.com")
    sign_in(regular)

    expect do
      post "/admin/user_imports", params: { user_import: { source_file: csv_upload } },
                                  headers: inertia_headers
    end.not_to change(UserImport, :count)
    expect(response).to have_http_status(:forbidden)
    get "/admin/user_imports", headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
  end

  it "returns a safe field error when preflight rejects the upload" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)

    expect do
      post "/admin/user_imports",
           params: { user_import: { source_file: csv_upload(invalid_headers_csv) } }, headers: inertia_headers
    end.not_to change(UserImport, :count)

    expect(response).to have_http_status(:unprocessable_content)
    expect(response.parsed_body.dig("props", "errors",
                                    "sourceFile")).to eq("Use os cabeçalhos full_name, email e role.")
  end

  it "returns a field error without creating an import when the upload parameter is absent" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)

    expect do
      post "/admin/user_imports", params: {}, headers: inertia_headers
    end.not_to change(UserImport, :count).and change(SolidQueue::Job, :count).by(0)

    expect(response).to have_http_status(:unprocessable_content)
    expect(response.parsed_body.dig("props", "errors", "sourceFile")).to eq("Selecione um arquivo CSV ou XLSX.")
  end

  it "treats only the expected enqueue failure as a recoverable field error" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)
    allow(UserImports::Enqueue).to receive(:call).and_raise(UserImports::Enqueue::Failed)

    expect do
      post "/admin/user_imports", params: { user_import: { source_file: csv_upload } }, headers: inertia_headers
    end.not_to change(UserImport, :count).and change(SolidQueue::Job, :count).by(0)

    expect(response).to have_http_status(:unprocessable_content)
    expect(response.parsed_body.dig("props", "errors", "sourceFile")).to eq("A importação não pôde ser adicionada à fila. Tente novamente.")
  end

  it "does not convert an unexpected database failure into a field error" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)
    allow(UserImports::Preflight).to receive(:call).and_raise(ActiveRecord::ConnectionNotEstablished, "connection unavailable")

    expect do
      post "/admin/user_imports", params: { user_import: { source_file: csv_upload } }, headers: inertia_headers
    end.to raise_error(ActiveRecord::ConnectionNotEstablished, "connection unavailable")
  end

  def invalid_headers_csv
    "full_name,email,unknown\nAna,ana@example.com,nope\n"
  end

  it "lists imports and exposes paginated row results without a storage key" do
    admin = create_user(email: "admin@example.com", role: :admin)
    user_import = UserImport.create!(imported_by: admin, total_count: 1)
    UserImportRow.create!(user_import:, row_number: 2, status: :rejected, normalized_email: "ana@example.com",
                          normalized_role: "regular", error_code: "invalid_email")
    sign_in(admin)

    get "/admin/user_imports", headers: inertia_headers
    expect(response.parsed_body.dig("props", "imports",
                                    0)).to include("id" => user_import.id.to_s, "filename" => "Arquivo indisponível",
                                                   "totalCount" => 1)

    get "/admin/user_imports/#{user_import.id}", params: { page: 9 }, headers: inertia_headers
    expect(response.parsed_body.dig("props", "results",
                                    0)).to include("rowNumber" => 2, "errorCode" => "invalid_email",
                                                   "errorMessage" => "E-mail inválido.")
    expect(response.parsed_body.dig("props",
                                    "pagination")).to eq("page" => 1, "pageSize" => 50, "totalPages" => 1,
                                                         "totalItems" => 1)
    expect(response.body).not_to include("key")
  end
end

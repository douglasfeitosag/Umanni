require "rails_helper"

RSpec.describe "Profile and administration", type: :request do
  around do |example|
    previous = ActionController::Base.allow_forgery_protection
    ActionController::Base.allow_forgery_protection = false
    example.run
  ensure
    ActionController::Base.allow_forgery_protection = previous
  end

  before do
    Session.delete_all
    User.delete_all
  end

  it "US3.1 updates only the current profile fields and keeps role read-only" do
    user = create_user
    sign_in(user)

    patch "/profile", params: { profile: { full_name: "Ana Atualizada", email: "nova@example.com", role: "admin", password: "senha substituta" } }, headers: inertia_headers

    expect(response).to redirect_to("/profile")
    expect(user.reload).to have_attributes(full_name: "Ana Atualizada", email: "nova@example.com", role: "regular")
    expect(user.authenticate("uma frase segura")).to be_truthy
  end

  it "US3.3 requires EXCLUIR and invalidates the deleted account" do
    user = create_user
    sign_in(user)

    delete "/profile", params: { deletion: { confirmation: "wrong" } }, headers: inertia_headers
    expect(response).to have_http_status(:unprocessable_content)
    expect(user.reload).to be_persisted

    delete "/profile", params: { deletion: { confirmation: "  EXCLUIR " } }, headers: inertia_headers
    expect(response).to redirect_to("/sign-in")
    expect(User.where(id: user.id)).not_to exist
    expect(Session.where(user_id: user.id)).not_to exist
  end

  it "US4.1 lets an admin create, edit and delete a regular user without resetting an existing password" do
    admin = create_user(email: "admin@example.com", role: :admin)
    sign_in(admin)

    post "/admin/users", params: { admin_user: { full_name: "Bruno Lima", email: "bruno@example.com", role: "regular", password: "senha inicial segura", password_confirmation: "senha inicial segura" } }, headers: inertia_headers
    created = User.find_by!(email: "bruno@example.com")
    expect(response).to redirect_to("/admin/users")

    patch "/admin/users/#{created.id}", params: { admin_user: { full_name: "Bruno Novo", role: "admin", password: "senha forjada nova" } }, headers: inertia_headers
    expect(response).to redirect_to("/admin/users")
    expect(created.reload).to have_attributes(full_name: "Bruno Novo", role: "admin")
    expect(created.authenticate("senha inicial segura")).to be_truthy

    delete "/admin/users/#{created.id}", params: { deletion: { confirmation: "EXCLUIR" } }, headers: inertia_headers
    expect(User.where(id: created.id)).not_to exist
  end

  it "US4.2 denies every administrative endpoint to a regular user" do
    regular = create_user
    target = create_user(email: "target@example.com")
    sign_in(regular)

    get "/admin/dashboard", headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
    get "/admin/users", headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
    post "/admin/users", params: { admin_user: { full_name: "Forged", email: "forged@example.com", role: "admin", password: "senha forjada segura" } }, headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
    patch "/admin/users/#{target.id}", params: { admin_user: { role: "admin" } }, headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
    delete "/admin/users/#{target.id}", params: { deletion: { confirmation: "EXCLUIR" } }, headers: inertia_headers
    expect(response).to have_http_status(:forbidden)
    expect(target.reload).to be_regular
    expect(User.where(email: "forged@example.com")).not_to exist
  end

  private

  def create_user(email: "ana@example.com", role: :regular)
    User.create!(full_name: "Ana Silva", email:, role:, password: "uma frase segura")
  end

  def sign_in(user)
    post "/session", params: { session: { email: user.email, password: "uma frase segura" } }, headers: inertia_headers
  end

  def inertia_headers
    { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
  end
end

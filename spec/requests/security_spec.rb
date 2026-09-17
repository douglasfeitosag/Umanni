require "rails_helper"

RSpec.describe "Identity access security", type: :request do
  before do
    Session.delete_all
    User.delete_all
  end

  it "rejects a state-changing request without a CSRF token" do
    post "/sign-up", params: { registration: valid_registration }

    expect(response).to have_http_status(:unprocessable_content)
    expect(User.count).to eq(0)
  end

  it "treats SQL injection text as inert credentials and uses a neutral response" do
    without_forgery_protection do
      post "/session", params: { session: { email: "' OR 1=1 --", password: "uma frase segura" } },
                       headers: inertia_headers
    end

    expect(response).to have_http_status(:unprocessable_content)
    expect(response.parsed_body.dig("props", "errors", "credentials")).to eq("E-mail ou senha inválidos.")
  end

  it "stores XSS text as data and returns it only inside JSON props" do
    payload = "<script>window.pwned=true</script>"
    user = create_user(full_name: payload)

    without_forgery_protection do
      sign_in(user)
      get "/profile", headers: inertia_headers
    end

    expect(response.media_type).to eq("application/json")
    expect(response.parsed_body.dig("props", "profile", "fullName")).to eq(payload)
  end

  it "returns the same forbidden surface for existent and nonexistent admin targets" do
    regular = create_user
    target = create_user(email: "target@example.com")

    without_forgery_protection do
      sign_in(regular)
      get "/admin/users/#{target.id}", headers: inertia_headers
      existent = [response.status, response.body]
      get "/admin/users/999999999", headers: inertia_headers
      nonexistent = [response.status, response.body]
      expect(existent).to eq(nonexistent)
    end
  end

  it "renders the safe 403 surface for matched and unmatched admin routes requested by a regular user" do
    regular = create_user
    matched = nil
    unmatched = nil

    without_forgery_protection do
      sign_in(regular)
      get "/admin/dashboard", headers: inertia_headers
      matched = response.parsed_body
      expect(response).to have_http_status(:forbidden)
      get "/admin/not-a-real-route", headers: inertia_headers
      unmatched = response.parsed_body
      expect(response).to have_http_status(:forbidden)
    end

    expect(matched).to include("component" => "Errors/Show", "props" => include("status" => 403, "returnPath" => "/profile"))
    expect(unmatched).to eq(matched)
  end

  it "renders indistinguishable safe HTML for matched and unmatched admin routes requested by a regular user" do
    regular = create_user
    matched = nil
    unmatched = nil

    without_forgery_protection do
      sign_in(regular)
      get "/admin/dashboard"
      matched = response.body
      expect(response).to have_http_status(:forbidden)
      get "/admin/not-a-real-route"
      unmatched = response.body
      expect(response).to have_http_status(:forbidden)
    end

    expect(matched).to include('<html lang="pt-BR">', '"component":"Errors/Show"', '"status":403', '"returnPath":"/profile"')
    expect(matched).not_to include('Session', 'Current.user', 'stacktrace')
    expect(unmatched).to eq(matched)
  end

  it "keeps a nonexistent administrative route as a normal 404 for an administrator" do
    admin = create_user(email: "admin@example.com", role: :admin)

    without_forgery_protection do
      sign_in(admin)
      get "/admin/not-a-real-route", headers: inertia_headers
    end

    expect(response).to have_http_status(:not_found)
  end

  it "denies all administrative read and mutation routes to a regular user" do
    regular = create_user
    target = create_user(email: "target@example.com")

    without_forgery_protection do
      sign_in(regular)
      requests = [
        -> { get "/admin/dashboard", headers: inertia_headers },
        -> { get "/admin/users", headers: inertia_headers },
        -> { get "/admin/users/new", headers: inertia_headers },
        -> { get "/admin/users/#{target.id}", headers: inertia_headers },
        -> { get "/admin/users/#{target.id}/edit", headers: inertia_headers },
        lambda {
          post "/admin/users", params: { admin_user: valid_registration.merge(role: "admin") }, headers: inertia_headers
        },
        -> { patch "/admin/users/#{target.id}", params: { admin_user: { role: "admin" } }, headers: inertia_headers },
        lambda {
          delete "/admin/users/#{target.id}", params: { deletion: { confirmation: "EXCLUIR" } },
                                              headers: inertia_headers
        }
      ]
      requests.each do |request|
        request.call
        expect(response).to have_http_status(:forbidden)
      end
    end

    expect(target.reload).to be_regular
    expect(User.where(email: "new@example.com")).not_to exist
  end

  private

  def valid_registration
    { full_name: "New User", email: "new@example.com", password: "uma frase segura",
      password_confirmation: "uma frase segura" }
  end

  def create_user(full_name: "Ana Silva", email: "ana@example.com", role: :regular)
    User.create!(full_name:, email:, role:, password: "uma frase segura")
  end

  def sign_in(user)
    post "/session", params: { session: { email: user.email, password: "uma frase segura" } }, headers: inertia_headers
  end

  def inertia_headers
    { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
  end

  def without_forgery_protection
    previous = ActionController::Base.allow_forgery_protection
    ActionController::Base.allow_forgery_protection = false
    yield
  ensure
    ActionController::Base.allow_forgery_protection = previous
  end
end

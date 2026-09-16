require "rails_helper"

RSpec.describe "Authentication", type: :request do
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

  it "US1.1 registers a regular user, starts a session, and opens the profile" do
    post_with_csrf "/sign-up", params: {
      registration: {
        full_name: "Ana Silva",
        email: " ANA@example.com ",
        password: "uma frase segura",
        password_confirmation: "uma frase segura",
        role: "admin"
      }
    }

    user = User.sole
    expect(user).to be_regular
    expect(response).to redirect_to("/profile")

    get "/profile", headers: inertia_headers
    expect(response).to have_http_status(:ok)
    expect(inertia_props.fetch("profile")).to include("email" => "ana@example.com", "role" => "regular")
  end

  it "US1.3 rejects invalid registration without reflecting password values" do
    post_with_csrf "/sign-up", params: {
      registration: {
        full_name: "",
        email: "invalid",
        password: "short",
        password_confirmation: "different"
      }
    }

    expect(response).to have_http_status(:unprocessable_entity)
    expect(User.count).to eq(0)
    expect(response.body).not_to include('"password":"short"', '"password_confirmation":"different"')
  end

  it "US1.3 joins multiple field errors with the Portuguese connector" do
    post_with_csrf "/sign-up", params: {
      registration: {
        full_name: "Ana Silva",
        email: "",
        password: "uma frase segura",
        password_confirmation: "uma frase segura"
      }
    }

    expect(response).to have_http_status(:unprocessable_content)
    expected_error = "E-mail não pode ficar em branco e E-mail não é válido"
    expect(response.parsed_body.dig("props", "errors", "email")).to eq(expected_error)
  end

  it "US2.1 redirects valid credentials according to the persisted role" do
    regular = create_user(email: "regular@example.com")
    admin = create_user(email: "admin@example.com", role: :admin)

    post_with_csrf "/session",
                   params: { session: { email: regular.email, password: "uma frase segura" } }
    expect(response).to redirect_to("/profile")

    delete_with_csrf "/session"
    post_with_csrf "/session",
                   params: { session: { email: admin.email, password: "uma frase segura" } }
    expect(response).to redirect_to("/admin/dashboard")
  end

  it "US2.2 returns the same neutral failure for unknown email, wrong password, and passwordless account" do
    user = create_user(email: "known@example.com")
    User.create!(full_name: "Imported User", email: "passwordless@example.com")

    attempts = [
      { email: "missing@example.com", password: "uma frase segura" },
      { email: user.email, password: "senha totalmente errada" },
      { email: "passwordless@example.com", password: "uma frase segura" }
    ]

    messages = attempts.map do |credentials|
      post_with_csrf "/session", params: { session: credentials }
      expect(response).to have_http_status(:unprocessable_entity)
      inertia_props.dig("errors", "credentials")
    end

    expect(messages.uniq).to eq(["E-mail ou senha inválidos."])
  end

  it "US2.3 invalidates the old session cookie on logout" do
    user = create_user
    post_with_csrf "/session",
                   params: { session: { email: user.email, password: "uma frase segura" } }
    old_cookie = response.cookies.fetch("session_id")

    delete_with_csrf "/session"
    get "/profile", headers: { "Cookie" => "session_id=#{old_cookie}" }

    expect(response).to redirect_to("/sign-in")
    expect(Session.count).to eq(0)
  end

  it "US2.3 disconnects the user's open Cable connections on logout" do
    user = create_user
    remote = instance_double(ActionCable::RemoteConnections::RemoteConnection, disconnect: true)
    allow(ActionCable.server.remote_connections).to receive(:where).with(current_user: user).and_return(remote)
    post_with_csrf "/session", params: { session: { email: user.email, password: "uma frase segura" } }

    delete_with_csrf "/session"

    expect(remote).to have_received(:disconnect).once
  end

  private

  def create_user(email: "ana@example.com", role: :regular)
    User.create!(full_name: "Ana Silva", email:, role:, password: "uma frase segura",
                 password_confirmation: "uma frase segura")
  end

  def post_with_csrf(path, params:)
    post path, params:, headers: inertia_headers
  end

  def delete_with_csrf(path)
    delete path, headers: inertia_headers
  end

  def inertia_headers
    { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
  end

  def inertia_props
    response.parsed_body.fetch("props")
  end
end

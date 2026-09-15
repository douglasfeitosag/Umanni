require "rails_helper"

RSpec.describe "Foundation", type: :request do
  it "restricts executable assets to the application origin" do
    get "/"
    policy = response.headers.fetch("Content-Security-Policy", "")
    expect(policy).to include("default-src 'self'", "script-src 'self'", "object-src 'none'")
  end

  it "keeps the Rails session readable across consecutive browser visits" do
    get "/"
    expect(response).to have_http_status(:ok)

    get "/", headers: { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
    expect(response).to have_http_status(:ok)
  end

  it "serves only the approved page props on an Inertia visit" do
    get "/", headers: { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }

    expect(response).to have_http_status(:ok)
    expect(response.headers["X-Inertia"]).to eq("true")
    expect(response.headers["Vary"]).to include("X-Inertia")
    expect(response.parsed_body).to include("component" => "Auth/SignIn", "url" => "/")
    expect(response.parsed_body.fetch("props")).to eq(
      "auth" => { "user" => nil }, "errors" => {}, "flash" => {}
    )
    expect(response.parsed_body.fetch("version")).to be_present
  end

  it "requires a full reload when the asset version differs" do
    get "/", headers: { "X-Inertia" => "true", "X-Inertia-Version" => "outdated" }

    expect(response).to have_http_status(:conflict)
    expect(response.headers["X-Inertia-Location"]).to eq("http://www.example.com/")
  end

  it "reports application boot at the health endpoint" do
    get "/up"
    expect(response).to have_http_status(:ok)
  end

  it "returns not found for unknown routes" do
    get "/missing-foundation-route"
    expect(response).to have_http_status(:not_found)
  end

  it "preserves CSRF protection and supplies a token without adding page props" do
    get "/"
    expect(ApplicationController.allow_forgery_protection).to be(true)
    expect(response.body).to include('name="csrf-token"')
    expect(response.cookies.fetch("XSRF-TOKEN")).to be_present
  end

  it "renders the initial Portuguese HTML document" do
    get "/"

    expect(response).to have_http_status(:ok)
    expect(response.body).to include('lang="pt-BR"', "Auth/SignIn", "data-page", "/vite-test/")
  end
end

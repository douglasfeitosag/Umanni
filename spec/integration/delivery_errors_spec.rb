require "rails_helper"
require "cgi"

RSpec.describe "Delivery error responses" do
  it "returns a minimal Inertia page for an unexpected server error" do
    request_headers = {
      "HTTP_X_INERTIA" => "true",
      "QUERY_STRING" => "secret=sensitive-query-sentinel"
    }
    status, headers, body = call_exceptions_app(request_headers)
    page = JSON.parse(body_string(body))

    expect(status).to eq(500)
    expect(headers.fetch("x-inertia")).to eq("true")
    expect(headers.fetch("content-type")).to start_with("application/json")
    expect(page.fetch("component")).to eq("Errors/Show")
    expect(page.fetch("props")).to eq("status" => 500, "returnPath" => "/sign-in")
    expect(page.fetch("url")).to eq("/")
    expect(page.fetch("version")).to eq(InertiaRails.configuration.version)
    expect(page.to_json).not_to include("sensitive-exception-sentinel", "sensitive-query-sentinel")
  end

  it "returns a complete Portuguese Inertia document for an HTML request" do
    request_headers = {
      "QUERY_STRING" => "secret=sensitive-query-sentinel",
      "CONTENT_TYPE" => "application/json",
      "CONTENT_LENGTH" => "32",
      "HTTP_COOKIE" => "session=sensitive-cookie-sentinel",
      "HTTP_AUTHORIZATION" => "Bearer sensitive-token-sentinel"
    }
    status, headers, body = call_exceptions_app(request_headers)
    html = body_string(body)
    encoded_page = html.match(%r{<script data-page="app" type="application/json">(.+?)</script>}m)&.captures&.first
    page = JSON.parse(CGI.unescape_html(encoded_page.to_s))

    expect(status).to eq(500)
    expect(headers.fetch("content-type")).to start_with("text/html")
    expect(html).to include('<html lang="pt-BR">')
    expect(page.fetch("component")).to eq("Errors/Show")
    expect(page.fetch("props")).to eq("status" => 500, "returnPath" => "/sign-in")
    expect(page.fetch("url")).to eq("/")
    expect(html).not_to include(
      "sensitive-exception-sentinel",
      "sensitive-query-sentinel",
      "sensitive-cookie-sentinel",
      "sensitive-token-sentinel"
    )
  end

  it "chooses a safe return path from the failed request route without retaining request state" do
    {
      "/admin/people" => "/admin/dashboard",
      "/profile" => "/profile",
      "/__delivery_error_probe__" => "/sign-in"
    }.each do |path, expected_return_path|
      status, _headers, body = call_exceptions_app({ "HTTP_X_INERTIA" => "true", "HTTP_COOKIE" => "session=sensitive-cookie-sentinel" }, path: path)
      page = JSON.parse(body_string(body))

      expect(status).to eq(500)
      expect(page.fetch("props")).to eq("status" => 500, "returnPath" => expected_return_path)
      expect(page.to_json).not_to include("sensitive-cookie-sentinel", path)
    end
  end

  it "delegates a not-found exception to the existing public response" do
    exception = ActionController::RoutingError.new("sensitive-routing-sentinel")
    status, headers, body = call_exceptions_app(exception: exception, path: "/404")
    html = body_string(body)

    expect(status).to eq(404)
    expect(headers.fetch("content-type")).to start_with("text/html")
    expect(html).not_to include("sensitive-routing-sentinel")
  end

  it "falls back to safe HTML when request MIME headers are invalid" do
    request_headers = {
      "HTTP_ACCEPT" => "invalid/type; broken",
      "CONTENT_TYPE" => "invalid/type; broken"
    }
    status, headers, body = call_exceptions_app(request_headers)
    html = body_string(body)

    expect(status).to eq(500)
    expect(headers.fetch("content-type")).to start_with("text/html")
    expect(html).to include('<html lang="pt-BR">')
    expect(html).not_to include("sensitive-exception-sentinel")
  end

  def call_exceptions_app(headers = {}, exception: RuntimeError.new("sensitive-exception-sentinel"), path: "/")
    env = Rack::MockRequest.env_for(path, headers).merge(
      "action_dispatch.exception" => exception,
      "action_dispatch.original_exception" => exception
    )
    DeliveryExceptionsApp.call(env)
  end

  def body_string(body)
    result = +""
    body.each { |part| result << part }
    result
  ensure
    body.close if body.respond_to?(:close)
  end
end

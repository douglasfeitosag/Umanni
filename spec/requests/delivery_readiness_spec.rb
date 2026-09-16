require "rails_helper"

RSpec.describe "Delivery readiness", type: :request do
  it "reports ready after querying the database with no pending migrations" do
    get "/ready"

    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("text/plain")
    expect(response.body).to eq("ready\n")
    expect(response.headers["Cache-Control"]).to include("no-store")
  end

  it "reports unavailable without exposing a pending migration" do
    allow(ActiveRecord::Migration).to receive(:check_all_pending!).and_raise(
      ActiveRecord::PendingMigrationError.new("sensitive-migration-sentinel")
    )

    logs = capture_rails_logs { get "/ready" }

    expect(response).to have_http_status(:service_unavailable)
    expect(response.media_type).to eq("text/plain")
    expect(response.body).to eq("unavailable\n")
    expect(response.headers["Cache-Control"]).to include("no-store")
    expect(logs.lines(chomp: true).grep(/\Adelivery\./)).to eq(["delivery.readiness.unavailable"])
    expect(logs).not_to include("sensitive-migration-sentinel")
  end

  it "reports unavailable without exposing a database connection failure" do
    allow(ActiveRecord::Base.connection_pool).to receive(:with_connection).and_raise(
      ActiveRecord::ConnectionNotEstablished, "sensitive-database-sentinel"
    )

    logs = capture_rails_logs { get "/ready" }

    expect(response).to have_http_status(:service_unavailable)
    expect(response.body).to eq("unavailable\n")
    expect(logs.lines(chomp: true).grep(/\Adelivery\./)).to eq(["delivery.readiness.unavailable"])
    expect(logs).not_to include("sensitive-database-sentinel")
  end

  it "keeps the Rails liveness endpoint separate" do
    get "/up"

    expect(response).to have_http_status(:ok)
    expect(response.body).to include("green")
  end

  def capture_rails_logs
    output = StringIO.new
    previous_logger = Rails.logger
    Rails.logger = ActiveSupport::TaggedLogging.logger(output)
    yield
    output.string
  ensure
    Rails.logger = previous_logger
  end
end

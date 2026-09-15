require "rails_helper"

RSpec.describe DashboardMetricsChannel, type: :channel do
  before do
    Session.delete_all
    User.delete_all
  end

  it "US4.2 streams only for an administrator" do
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    stub_connection current_user: admin
    subscribe
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("dashboard_metrics")

    regular = User.create!(full_name: "Regular", email: "regular@example.com", password: "uma frase segura")
    stub_connection current_user: regular
    subscribe
    expect(subscription).to be_rejected
  end
end

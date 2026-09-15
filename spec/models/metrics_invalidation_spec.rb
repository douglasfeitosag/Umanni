require "rails_helper"

RSpec.describe "Metrics invalidation", type: :model do
  include ActionCable::TestHelper

  before do
    Session.delete_all
    User.delete_all
  end

  it "US7.2 broadcasts only the versioned invalidation after committed relevant changes" do
    expect do
      user = User.create!(full_name: "Regular", email: "regular@example.com", password: "uma frase segura")
      user.update!(full_name: "Renamed")
      user.update!(role: :admin)
      user.destroy!
    end.to have_broadcasted_to("dashboard_metrics").with(type: "dashboard.metrics.changed",
                                                         schemaVersion: 1).exactly(3).times
  end

  it "does not broadcast a rolled-back creation" do
    expect do
      User.transaction do
        User.create!(full_name: "Regular", email: "regular@example.com", password: "uma frase segura")
        raise ActiveRecord::Rollback
      end
    end.not_to have_broadcasted_to("dashboard_metrics")
  end

  it "US7.3 disconnects existing Cable connections after session destruction and demotion" do
    user = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    session = user.sessions.create!
    remote = instance_double(ActionCable::RemoteConnections::RemoteConnection, disconnect: true)
    allow(ActionCable.server.remote_connections).to receive(:where).with(current_user: user).and_return(remote)

    session.destroy!
    user.update!(role: :regular)

    expect(remote).to have_received(:disconnect).twice
  end
end

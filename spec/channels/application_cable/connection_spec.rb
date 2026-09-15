require "rails_helper"

RSpec.describe ApplicationCable::Connection, type: :channel do
  before do
    Session.delete_all
    User.delete_all
  end

  it "identifies a connection through a valid Rails session" do
    user = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    session = user.sessions.create!
    cookies.signed[:session_id] = session.id

    connect

    expect(connection.current_user).to eq(user)
  end

  it "rejects a connection with an invalid session" do
    cookies.signed[:session_id] = -1

    expect { connect }.to have_rejected_connection
  end
end

require "rails_helper"

RSpec.describe Session, type: :model do
  it "belongs to a user" do
    session = described_class.new

    expect(session).not_to be_valid
    expect(session.errors[:user]).to be_present
  end
end

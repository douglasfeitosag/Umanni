require "rails_helper"

RSpec.describe "Worker database isolation" do
  it "connects to its dedicated PostgreSQL test database" do
    suffix = ENV.fetch("TEST_ENV_NUMBER", "")
    expected = suffix.empty? ? "umanni_test" : "umanni_test2"
    expect(ActiveRecord::Base.connection.select_value("SELECT current_database()")).to eq(expected)
  end
end

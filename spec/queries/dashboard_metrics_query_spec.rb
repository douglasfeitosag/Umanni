require "rails_helper"

RSpec.describe DashboardMetricsQuery do
  before do
    Session.delete_all
    User.delete_all
  end

  it "US7.1 returns a consistent total and totals by role" do
    User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    2.times do |index|
      User.create!(full_name: "Regular #{index}", email: "regular#{index}@example.com", password: "uma frase segura")
    end

    expect(described_class.call).to eq(total: 3, byRole: { admin: 1, regular: 2 })
  end
end

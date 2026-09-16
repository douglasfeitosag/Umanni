require "rails_helper"

RSpec.describe UserImport, type: :model do
  it "keeps a queued import internally consistent before a worker starts" do
    import = described_class.new(
      status: :queued,
      total_count: 2,
      processed_count: 0,
      created_count: 0,
      rejected_count: 0
    )

    expect(import).to be_valid
  end

  it "rejects terminal counters that do not account for every input row" do
    import = described_class.new(
      status: :completed,
      total_count: 2,
      processed_count: 1,
      created_count: 1,
      rejected_count: 0,
      started_at: Time.current,
      finished_at: Time.current
    )

    expect(import).not_to be_valid
    expect(import.errors[:processed_count]).to be_present
  end
end

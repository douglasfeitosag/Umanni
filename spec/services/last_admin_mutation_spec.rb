require "rails_helper"

RSpec.describe LastAdminMutation do
  before do
    Session.delete_all
    User.delete_all
  end

  it "US4.3 refuses sequential deletion or demotion of the last administrator" do
    admin = create_admin("one@example.com")

    expect(described_class.destroy(admin)).to be_failure
    expect(described_class.update(admin, role: :regular)).to be_failure
    expect(admin.reload).to be_admin
  end

  it "US4.3 preserves an administrator under concurrent removal attempts" do
    admins = [create_admin("one@example.com"), create_admin("two@example.com")]
    ready = Queue.new
    start = Queue.new
    threads = admins.map do |admin|
      Thread.new do
        ready << true
        start.pop
        described_class.destroy(User.find(admin.id))
      end
    end
    2.times { ready.pop }
    2.times { start << true }

    results = threads.map(&:value)
    expect(results.count(&:success?)).to eq(1)
    expect(results.count(&:failure?)).to eq(1)
    expect(User.admin.count).to eq(1)
  end

  it "returns validation errors under their original fields without mutating the user" do
    user = create_admin("one@example.com")

    result = described_class.update(user, email: "invalid")

    expect(result).to be_failure
    expect(result.errors).to include(email: include("não é válido"))
    expect(user.reload.email).to eq("one@example.com")
  end

  private

  def create_admin(email)
    User.create!(full_name: "Admin User", email:, role: :admin, password: "uma frase segura")
  end
end

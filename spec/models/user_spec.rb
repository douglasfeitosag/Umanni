require "rails_helper"

RSpec.describe User, type: :model do
  before do
    Session.delete_all
    described_class.delete_all
  end

  it "normalizes email and persists a regular user with a valid password" do
    user = described_class.create!(
      full_name: "Ana Silva",
      email: "  ANA@example.COM ",
      password: "uma frase segura",
      password_confirmation: "uma frase segura"
    )

    expect(user.email).to eq("ana@example.com")
    expect(user.role).to eq("regular")
    expect(user.authenticate("uma frase segura")).to eq(user)
  end

  it "rejects passwords outside the 12 character and 72 byte policy" do
    too_short = described_class.new(full_name: "Ana Silva", email: "ana@example.com", password: "short")
    too_long = described_class.new(full_name: "Ana Silva", email: "ana@example.com", password: "a" * 73)

    expect(too_short).not_to be_valid
    expect(too_short.errors[:password]).to be_present
    expect(too_long).not_to be_valid
    expect(too_long.errors[:password]).to be_present
  end

  it "requires confirmation whenever a password is required" do
    user = described_class.new(full_name: "Ana Silva", email: "ana@example.com", password: "uma frase segura")
    user.password_required = true

    expect(user).not_to be_valid
    expect(user.errors[:password_confirmation]).to be_present
  end

  it "requires unique normalized email addresses" do
    described_class.create!(full_name: "Ana Silva", email: "ana@example.com", password: "uma frase segura")
    duplicate = described_class.new(full_name: "Outra Ana", email: " ANA@EXAMPLE.COM ", password: "outra frase segura")

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:email]).to be_present
  end

  it "accepts only the declared roles" do
    user = described_class.new(full_name: "Ana Silva", email: "ana@example.com", password: "uma frase segura",
                               role: "owner")

    expect(user).not_to be_valid
    expect(user.errors[:role]).to be_present
  end
end

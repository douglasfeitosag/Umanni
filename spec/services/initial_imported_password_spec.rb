require "rails_helper"

RSpec.describe InitialImportedPassword do
  before do
    Session.delete_all
    User.delete_all
  end

  it "sets an initial password once and never overwrites it" do
    user = User.create!(full_name: "Importada", email: "importada@example.com", role: :regular)

    first = described_class.call(user:, password: "uma frase segura", password_confirmation: "uma frase segura")
    second = described_class.call(user:, password: "outra frase segura", password_confirmation: "outra frase segura")

    expect(first).to have_attributes(success?: true, error: nil)
    expect(second).to have_attributes(success?: false, error: "credencial já configurada")
    expect(user.reload.authenticate("uma frase segura")).to eq(user)
    expect(user.authenticate("outra frase segura")).to be_falsey
  end

  it "rejects empty, mismatched and short credentials without activating the account" do
    user = User.create!(full_name: "Importada", email: "importada@example.com", role: :regular)

    empty = described_class.call(user:, password: "", password_confirmation: "")
    mismatched = described_class.call(user:, password: "uma frase segura", password_confirmation: "diferente")
    short = described_class.call(user:, password: "curta", password_confirmation: "curta")

    expect([empty, mismatched, short]).to all(have_attributes(success?: false))
    expect(user.reload.password_digest).to be_nil
  end
end

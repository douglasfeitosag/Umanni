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
end

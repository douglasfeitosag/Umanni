require "rails_helper"

RSpec.describe FirstAdminBootstrap do
  before do
    Session.delete_all
    User.delete_all
  end

  it "US6.1 serializes two PostgreSQL executions into one creation and one no-op" do
    env = valid_env
    ready = Queue.new
    start = Queue.new
    results = 2.times.map do
      Thread.new do
        ready << true
        start.pop
        described_class.call(env:, environment: "development")
      end
    end
    2.times { ready.pop }
    2.times { start << true }

    expect(results.map(&:value).sort).to eq(%i[already_exists created])
    expect(User.admin.count).to eq(1)
    expect(User.admin.sole.authenticate(env.fetch("UMANNI_BOOTSTRAP_PASSWORD"))).to be_truthy
  end

  it "US6.2 leaves an existing administrator untouched without credential variables" do
    admin = User.create!(full_name: "Existing Admin", email: "admin@example.com", role: :admin,
                         password: "uma frase segura")
    env = valid_env.except("UMANNI_BOOTSTRAP_FULL_NAME", "UMANNI_BOOTSTRAP_EMAIL", "UMANNI_BOOTSTRAP_PASSWORD")

    expect(described_class.call(env:, environment: "development")).to eq(:already_exists)
    expect(admin.reload.authenticate("uma frase segura")).to be_truthy
    expect(User.admin.count).to eq(1)
  end

  it "US6.3 rejects a forbidden environment before persistence without echoing a password" do
    password = valid_env.fetch("UMANNI_BOOTSTRAP_PASSWORD")

    error = begin
      described_class.call(env: valid_env, environment: "production")
      nil
    rescue FirstAdminBootstrap::ConfigurationError => e
      e
    end
    expect(error.message).to include("development")
    expect(error.message).not_to include(password)
    expect(User.count).to eq(0)
  end

  it "US6.3 rejects mismatched confirmation and database values" do
    expect do
      described_class.call(env: valid_env.merge("UMANNI_BOOTSTRAP_CONFIRM" => "wrong"), environment: "development")
    end.to raise_error(FirstAdminBootstrap::ConfigurationError, /confirmation/)

    expect do
      described_class.call(env: valid_env.merge("UMANNI_BOOTSTRAP_DATABASE" => "other"), environment: "development")
    end.to raise_error(FirstAdminBootstrap::ConfigurationError, /database/)
    expect(User.count).to eq(0)
  end

  private

  def valid_env
    {
      "UMANNI_BOOTSTRAP_CONFIRM" => "CREATE_FIRST_ADMIN",
      "UMANNI_BOOTSTRAP_DATABASE" => ActiveRecord::Base.connection_db_config.database,
      "UMANNI_BOOTSTRAP_FULL_NAME" => "First Admin",
      "UMANNI_BOOTSTRAP_EMAIL" => "ADMIN@example.com",
      "UMANNI_BOOTSTRAP_PASSWORD" => "uma senha bootstrap segura"
    }
  end
end

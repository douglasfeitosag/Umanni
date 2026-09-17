require "rails_helper"
require "open3"

RSpec.describe "delivery credentials configuration" do
  let(:root) { Rails.root }
  let(:production_configuration) { root.join("config/environments/production.rb").read }
  let(:compose_configuration) { root.join("compose.yaml").read }
  let(:entrypoint) { root.join("bin/docker-entrypoint").read }

  it "loads the production secret key base from encrypted Rails credentials" do
    expected_configuration = [
      "config.secret_key_base = Rails.application.credentials.secret_key_base",
      'unless ENV["SECRET_KEY_BASE_DUMMY"] == "1"'
    ].join(" ")

    expect(production_configuration).to include(expected_configuration)
    expect(production_configuration).not_to include('ENV["SECRET_KEY_BASE"]')
  end

  it "fails closed without a runtime master key instead of accepting a plaintext fallback" do
    output, status = Open3.capture2e(
      {
        "RAILS_ENV" => "production",
        "RAILS_MASTER_KEY" => nil,
        "SECRET_KEY_BASE" => "plaintext-fallback-must-not-be-used",
        "DATABASE_URL" => "postgresql://umanni:umanni-local@127.0.0.1:1/umanni_production"
      },
      "bundle",
      "exec",
      "rails",
      "runner",
      "Rails.application.secret_key_base"
    )

    expect(status).not_to be_success
    expect(output).not_to include("plaintext-fallback-must-not-be-used")
    expect(output).to match(/credential|encryption key|secret_key_base/i)
    expect(entrypoint).to include("delivery.startup.credentials_missing: supply RAILS_MASTER_KEY")
  end

  it "versions ciphertext while keeping the master key private" do
    expect(root.join("config/credentials.yml.enc")).to exist
    expect(root.join(".gitignore").read).to include("/config/master.key")
  end

  it "passes only the runtime master key to both delivery Rails processes" do
    %w[web worker].each do |service|
      block = compose_configuration[/^  #{service}:\n(?:(?:    |      ).*\n)*/]

      expect(block).to include("RAILS_MASTER_KEY: ${RAILS_MASTER_KEY:-}")
      expect(block).not_to include("SECRET_KEY_BASE")
    end
  end

  it "preserves the operational and test database URL contracts" do
    expect(compose_configuration).to include(
      "TEST_DATABASE_URL: postgresql://${POSTGRES_USER:-umanni}:${POSTGRES_PASSWORD:-umanni-local}@db:5432/umanni_test"
    )
    expect(compose_configuration).to include(
      "DATABASE_URL: ${DATABASE_URL:-postgresql://umanni:umanni-local@db:5432/umanni_development}"
    )
    expect(compose_configuration).to include(
      "DATABASE_URL: ${DELIVERY_DATABASE_URL:-postgresql://umanni:umanni-local@db:5432/umanni_production}"
    )
  end

  it "keeps the build-only dummy secret out of the delivery runtime contract" do
    dockerfile = root.join("Dockerfile").read

    expect(dockerfile).to include("RUN SECRET_KEY_BASE_DUMMY=1 bundle exec vite build")
    expect(compose_configuration).not_to include("SECRET_KEY_BASE_DUMMY")
  end

  it "makes the Docker build context available to the focused audit without copying secrets" do
    dockerignore = root.join(".dockerignore").read

    expect(dockerignore).to include("!Dockerfile")
    expect(dockerignore).to include("!compose.yaml")
    expect(dockerignore).to include("config/master.key")
  end
end

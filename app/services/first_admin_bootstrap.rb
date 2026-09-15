class FirstAdminBootstrap
  FIRST_ADMIN_BOOTSTRAP_LOCK_KEY = 130_013
  ALLOWED_HOSTS = [nil, "", "localhost", "127.0.0.1", "::1", "db"].freeze

  class ConfigurationError < StandardError; end

  def self.call(env: ENV, environment: Rails.env)
    new(env:, environment:).call
  end

  def initialize(env:, environment:)
    @env = env
    @environment = environment
  end

  def call
    validate_connection!

    ActiveRecord::Base.connection_pool.with_connection do |connection|
      ActiveRecord::Base.transaction(requires_new: true) do
        connection.execute("SELECT pg_advisory_xact_lock(#{FIRST_ADMIN_BOOTSTRAP_LOCK_KEY})")
        next :already_exists if User.admin.exists?

        user = User.new(
          full_name: required!("UMANNI_BOOTSTRAP_FULL_NAME"),
          email: required!("UMANNI_BOOTSTRAP_EMAIL"),
          role: :admin,
          password: required!("UMANNI_BOOTSTRAP_PASSWORD"),
          password_confirmation: required!("UMANNI_BOOTSTRAP_PASSWORD")
        )
        user.password_required = true
        user.save!
        :created
      end
    end
  rescue ActiveRecord::RecordInvalid => error
    raise ConfigurationError, "Bootstrap credentials are invalid: #{error.record.errors.full_messages.join(', ')}"
  end

  private

  attr_reader :env, :environment

  def validate_connection!
    config = ActiveRecord::Base.connection_db_config
    raise ConfigurationError, "Bootstrap is available only in development" unless environment == "development"
    raise ConfigurationError, "Bootstrap requires PostgreSQL" unless config.adapter == "postgresql"
    raise ConfigurationError, "Bootstrap database host is not local" unless ALLOWED_HOSTS.include?(config.host)
    raise ConfigurationError, "Bootstrap confirmation is invalid" unless env["UMANNI_BOOTSTRAP_CONFIRM"] == "CREATE_FIRST_ADMIN"
    raise ConfigurationError, "Bootstrap database confirmation does not match" unless env["UMANNI_BOOTSTRAP_DATABASE"] == config.database
  end

  def required!(key)
    value = env[key].to_s
    raise ConfigurationError, "#{key} is required" if value.strip.empty?

    value
  end
end

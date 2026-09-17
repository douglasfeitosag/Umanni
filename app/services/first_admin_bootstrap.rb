class FirstAdminBootstrap
  FIRST_ADMIN_BOOTSTRAP_LOCK_KEY = 130_013
  ALLOWED_HOSTS = [nil, "", "localhost", "127.0.0.1", "::1", "db"].freeze
  LOCAL_DELIVERY_OPT_IN = "1".freeze

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
      create_admin_in_transaction(connection)
    end
  rescue ActiveRecord::RecordInvalid => e
    raise ConfigurationError, "Bootstrap credentials are invalid: #{e.record.errors.full_messages.join(', ')}"
  end

  private

  attr_reader :env, :environment

  def validate_connection!
    config = ActiveRecord::Base.connection_db_config
    unless environment == "development" || local_delivery_opt_in?
      raise ConfigurationError, "Bootstrap is available only in development or explicit local delivery"
    end
    raise ConfigurationError, "Bootstrap requires PostgreSQL" unless config.adapter == "postgresql"
    raise ConfigurationError, "Bootstrap database host is not local" unless ALLOWED_HOSTS.include?(config.host)

    validate_confirmation!(config.database)
  end

  def local_delivery_opt_in?
    environment == "production" && env["UMANNI_BOOTSTRAP_LOCAL_DELIVERY"] == LOCAL_DELIVERY_OPT_IN
  end

  def validate_confirmation!(database)
    unless env["UMANNI_BOOTSTRAP_CONFIRM"] == "CREATE_FIRST_ADMIN"
      raise ConfigurationError,
            "Bootstrap confirmation is invalid"
    end
    return if env["UMANNI_BOOTSTRAP_DATABASE"] == database

    raise ConfigurationError,
          "Bootstrap database confirmation does not match"
  end

  def create_admin_in_transaction(connection)
    ActiveRecord::Base.transaction(requires_new: true) do
      connection.execute("SELECT pg_advisory_xact_lock(#{FIRST_ADMIN_BOOTSTRAP_LOCK_KEY})")
      next :already_exists if User.admin.exists?

      build_admin.tap(&:save!)
      :created
    end
  end

  def build_admin
    password = required!("UMANNI_BOOTSTRAP_PASSWORD")
    User.new(full_name: required!("UMANNI_BOOTSTRAP_FULL_NAME"),
             email: required!("UMANNI_BOOTSTRAP_EMAIL"), role: :admin,
             password:, password_confirmation: password, password_required: true)
  end

  def required!(key)
    value = env[key].to_s
    raise ConfigurationError, "#{key} is required" if value.strip.empty?

    value
  end
end

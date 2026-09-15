require "uri"

namespace :verification do
  desc "Prepare only the three dedicated verification databases"
  task prepare: :environment do
    abort "Verification requires RAILS_ENV=test" unless Rails.env.test?
    abort "Do not supply DATABASE_URL to verification" if ENV.key?("DATABASE_URL")
    abort "Preparation must run outside an RSpec worker" unless ENV.fetch("TEST_ENV_NUMBER", "").empty?

    base_url = URI.parse(ENV.fetch("TEST_DATABASE_URL"))
    abort "Expected umanni_test database URL" unless base_url.path == "/umanni_test"
    abort "Expected PostgreSQL URL" unless %w[postgres postgresql].include?(base_url.scheme)

    %w[umanni_test umanni_test2 umanni_e2e].each do |database|
      url = base_url.dup
      url.path = "/#{database}"
      configuration = ActiveRecord::DatabaseConfigurations::UrlConfig.new("test", "primary", url.to_s, {})
      ActiveRecord::Tasks::DatabaseTasks.create(configuration)
      ActiveRecord::Base.establish_connection(configuration)
      load Rails.root.join("db/schema.rb")
      puts "Prepared #{ActiveRecord::Base.connection.select_value('SELECT current_database()')}"
    end
  ensure
    ActiveRecord::Base.connection_pool.disconnect!
  end
end

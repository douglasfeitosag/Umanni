ENV["RAILS_ENV"] ||= "test"
abort "RSpec requires RAILS_ENV=test" unless ENV["RAILS_ENV"] == "test"
require "spec_helper"
require_relative "../config/environment"
require "rspec/rails"
require_relative "support/worker_database_probe"

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end

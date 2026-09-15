require "securerandom"
ENV["VERIFICATION_RUN_ID"] ||= SecureRandom.uuid
ENV["VERIFICATION_SHA"] ||= `git rev-parse HEAD`.strip
abort "Verification SHA is required" unless ENV.fetch("VERIFICATION_SHA").match?(/\A[0-9a-f]{40}\z/)
require "simplecov"
SimpleCov.start

RSpec.configure do |config|
  config.expect_with(:rspec) { |expectations| expectations.include_chain_clauses_in_custom_matcher_descriptions = true }
  config.mock_with(:rspec) { |mocks| mocks.verify_partial_doubles = true }
  config.order = :random
  Kernel.srand config.seed
  worker = ENV.fetch("TEST_ENV_NUMBER", "").empty? ? "1" : ENV.fetch("TEST_ENV_NUMBER")
  config.add_formatter("json", "coverage/ruby/#{ENV.fetch('VERIFICATION_RUN_ID')}/#{worker}/rspec.json")
end

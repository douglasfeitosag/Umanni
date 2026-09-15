SimpleCov.configure do
  worker = ENV.fetch("TEST_ENV_NUMBER", "").empty? ? "1" : ENV.fetch("TEST_ENV_NUMBER")
  run = ENV.fetch("VERIFICATION_RUN_ID")
  sha = ENV.fetch("VERIFICATION_SHA")
  cover "app/**/*.rb", "lib/**/*.rb"
  coverage :line
  coverage :branch
  parallel_tests false
  finalize_merge false
  command_name "#{run}:#{sha}:#{worker}"
  coverage_dir "coverage/ruby/#{run}/#{worker}"
end

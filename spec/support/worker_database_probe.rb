require "json"
require "securerandom"
require "fileutils"

RSpec.configure do |config|
  config.before(:suite) do
    suffix = ENV.fetch("TEST_ENV_NUMBER", "")
    worker = suffix.empty? ? "1" : suffix
    expected_database = suffix.empty? ? "umanni_test" : "umanni_test2"
    marker = "#{ENV.fetch('VERIFICATION_RUN_ID')}:#{worker}:#{SecureRandom.hex(12)}"
    observation = {
      run_id: ENV.fetch("VERIFICATION_RUN_ID"), sha: ENV.fetch("VERIFICATION_SHA"),
      worker: worker, test_env_number: suffix, expected_marker: marker
    }
    ActiveRecord::Base.connection_pool.with_connection do |connection|
      connection.transaction(requires_new: true) do
        observation[:database] = connection.select_value("SELECT current_database()")
        raise "Unexpected worker database" unless observation[:database] == expected_database

        connection.execute("CREATE TEMPORARY TABLE worker_probe (marker text NOT NULL) ON COMMIT DROP")
        connection.execute("INSERT INTO worker_probe (marker) VALUES (#{connection.quote(marker)})")
        observation[:observed_marker] = connection.select_value("SELECT marker FROM worker_probe")
        observation[:success] = observation[:observed_marker] == marker
        raise "Worker marker mismatch" unless observation[:success]
      end
    end
    path = Rails.root.join("coverage", "ruby", ENV.fetch("VERIFICATION_RUN_ID"), worker)
    FileUtils.mkdir_p(path)
    File.write(path.join("isolation.json"), JSON.pretty_generate(observation))
    puts "Worker isolation: #{JSON.generate(observation)}"
  end
end

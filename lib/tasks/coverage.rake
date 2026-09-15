require "json"

namespace :coverage do
  desc "Require both successful RSpec workers and isolation probes before merging coverage"
  task :verify do
    abort "Coverage verification requires RAILS_ENV=test" unless ENV["RAILS_ENV"] == "test"
    run_id = ENV.fetch("VERIFICATION_RUN_ID")
    sha = ENV.fetch("VERIFICATION_SHA")
    abort "Invalid run ID" unless run_id.match?(/\A[0-9a-f-]{36}\z/)
    abort "Invalid SHA" unless sha.match?(/\A[0-9a-f]{40}\z/)
    root = File.expand_path("coverage/ruby/#{run_id}")
    abort "Expected exactly two workers" unless Dir.children(root).sort == %w[1 2]
    expected_files = Dir["app/**/*.rb", "lib/**/*.rb"].sort.map { |file| File.expand_path(file) }
    result_paths = %w[1 2].map do |worker|
      directory = File.join(root, worker)
      observation = JSON.parse(File.read(File.join(directory, "isolation.json")))
      expected_suffix = worker == "1" ? "" : "2"
      expected_database = "umanni_test#{expected_suffix}"
      expected = { "run_id" => run_id, "sha" => sha, "worker" => worker,
                   "test_env_number" => expected_suffix, "database" => expected_database, "success" => true }
      abort "Invalid worker isolation identity" unless observation.slice(*expected.keys) == expected
      marker = observation.fetch("expected_marker")
      unless marker.start_with?("#{run_id}:#{worker}:") && marker == observation.fetch("observed_marker")
        abort "Invalid marker"
      end
      summary = JSON.parse(File.read(File.join(directory, "rspec.json"))).fetch("summary")
      abort "Worker did not finish successfully" unless summary.fetch("example_count").positive? &&
                                                        summary.fetch("failure_count").zero? &&
                                                        summary.fetch("errors_outside_of_examples_count").zero?
      result_path = File.join(directory, ".resultset.json")
      results = JSON.parse(File.read(result_path))
      abort "Unexpected coverage identity" unless results.keys == ["#{run_id}:#{sha}:#{worker}"]
      result = results.values.fetch(0)
      tracked_files = (result.fetch("coverage").keys + result.fetch("tracked_files", [])).uniq.sort
      abort "Inconsistent covered file set" unless tracked_files == expected_files && !expected_files.empty?
      puts "Verified worker #{worker}: #{expected_database}, #{summary.fetch('example_count')} examples"
      result_path
    end
    require "simplecov"
    SimpleCov.collate(result_paths) do
      cover "app/**/*.rb", "lib/**/*.rb"
      coverage_dir "coverage/ruby/merged"
      finalize_merge true
      coverage :line, minimum: 90
      coverage :branch
    end
    abort "Empty Ruby line denominator" unless SimpleCov.result.total_lines.positive?
  end
end

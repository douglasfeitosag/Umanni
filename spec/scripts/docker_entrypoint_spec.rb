require "spec_helper"
require "fileutils"
require "open3"
require "tmpdir"

RSpec.describe "delivery entrypoint" do
  let(:entrypoint) { File.expand_path("../../bin/docker-entrypoint", __dir__) }

  it "prepares the delivery database before starting the server" do
    Dir.mktmpdir do |directory|
      trace = File.join(directory, "trace")
      FileUtils.mkdir_p(File.join(directory, "bin"))
      write_executable(File.join(directory, "bin", "rails"), <<~SH)
        #!/bin/bash
        printf 'rails %s\n' "$*" >> "$TRACE_FILE"
      SH
      write_executable(File.join(directory, "server"), <<~SH)
        #!/bin/bash
        printf 'server\n' >> "$TRACE_FILE"
      SH

      stdout, stderr, status = Open3.capture3(
        { "UMANNI_DELIVERY_PREPARE_DATABASE" => "1", "TRACE_FILE" => trace },
        entrypoint,
        "./server",
        chdir: directory
      )

      expect(status).to be_success
      expect(File.readlines(trace, chomp: true)).to eq(["rails db:prepare", "server"])
      expect(stdout.lines(chomp: true)).to eq(
        ["delivery.startup.database_prepare_started", "delivery.startup.database_prepare_succeeded"]
      )
      expect(stderr).to be_empty
    end
  end

  it "fails closed without exposing database command output" do
    Dir.mktmpdir do |directory|
      trace = File.join(directory, "trace")
      FileUtils.mkdir_p(File.join(directory, "bin"))
      write_executable(File.join(directory, "bin", "rails"), <<~SH)
        #!/bin/bash
        printf 'sensitive-database-sentinel\n' >&2
        exit 23
      SH
      write_executable(File.join(directory, "server"), <<~SH)
        #!/bin/bash
        printf 'server\n' >> "$TRACE_FILE"
      SH

      stdout, stderr, status = Open3.capture3(
        { "UMANNI_DELIVERY_PREPARE_DATABASE" => "1", "TRACE_FILE" => trace },
        entrypoint,
        "./server",
        chdir: directory
      )

      expect(status).not_to be_success
      expect(File).not_to exist(trace)
      expect(stdout.lines(chomp: true)).to eq(
        ["delivery.startup.database_prepare_started", "delivery.startup.database_prepare_failed"]
      )
      expect(stderr).to be_empty
      expect(stdout).not_to include("sensitive-database-sentinel")
    end
  end

  it "rejects an invalid delivery preparation flag" do
    Dir.mktmpdir do |directory|
      trace = File.join(directory, "trace")
      write_executable(File.join(directory, "server"), <<~SH)
        #!/bin/bash
        printf 'server\n' >> "$TRACE_FILE"
      SH

      stdout, stderr, status = Open3.capture3(
        { "UMANNI_DELIVERY_PREPARE_DATABASE" => "yes", "TRACE_FILE" => trace },
        entrypoint,
        "./server",
        chdir: directory
      )

      expect(status).not_to be_success
      expect(File).not_to exist(trace)
      expect(stdout.lines(chomp: true)).to eq(["delivery.startup.database_prepare_failed"])
      expect(stderr).to be_empty
    end
  end

  it "runs the original command unchanged when delivery preparation is not enabled" do
    Dir.mktmpdir do |directory|
      trace = File.join(directory, "trace")
      write_executable(File.join(directory, "server"), <<~SH)
        #!/bin/bash
        printf '%s\n' "$*" >> "$TRACE_FILE"
      SH

      stdout, stderr, status = Open3.capture3(
        { "TRACE_FILE" => trace },
        entrypoint,
        "./server",
        "--port",
        "3000",
        chdir: directory
      )

      expect(status).to be_success
      expect(File.readlines(trace, chomp: true)).to eq(["--port 3000"])
      expect(stdout).to be_empty
      expect(stderr).to be_empty
    end
  end

  def write_executable(path, content)
    File.write(path, content)
    FileUtils.chmod("u+x", path)
  end
end

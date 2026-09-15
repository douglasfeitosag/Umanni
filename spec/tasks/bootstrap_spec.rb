require "rails_helper"
require "rake"

RSpec.describe "umanni:bootstrap_admin" do
  before(:all) do
    Rails.application.load_tasks unless Rake::Task.task_defined?("umanni:bootstrap_admin")
  end

  before do
    Rake::Task["umanni:bootstrap_admin"].reenable
  end

  it "US6.1 reports creation without printing credentials" do
    allow(FirstAdminBootstrap).to receive(:call).and_return(:created)

    expect { task.invoke }.to output("First administrator created.\n").to_stdout
  end

  it "US6.2 reports the idempotent no-op" do
    allow(FirstAdminBootstrap).to receive(:call).and_return(:already_exists)

    expect { task.invoke }.to output("An administrator already exists; nothing changed.\n").to_stdout
  end

  it "US6.3 fails safely without exposing credentials" do
    allow(FirstAdminBootstrap).to receive(:call)
      .and_raise(FirstAdminBootstrap::ConfigurationError, "Bootstrap is unavailable")

    expect { task.invoke }.to raise_error(SystemExit)
      .and output("Bootstrap is unavailable\n").to_stderr
  end

  def task
    Rake::Task["umanni:bootstrap_admin"]
  end
end

require "rails_helper"

RSpec.describe ProcessUserImportJob do
  include ActionCable::TestHelper

  before do
    UserImportRow.delete_all
    UserImport.delete_all
    Session.delete_all
    User.delete_all
  end

  it "marks an import failed after the third connection retry and notifies its stream" do
    admin = User.create!(full_name: "Admin", email: "admin@example.com", role: :admin, password: "uma frase segura")
    user_import = UserImport.create!(imported_by: admin, total_count: 0)
    job = described_class.new(user_import.id)
    exception_key = [ActiveRecord::ConnectionFailed].to_s
    job.instance_variable_set(:@exception_executions, { exception_key => 2 })
    allow(UserImports::Processor).to receive(:call).and_raise(ActiveRecord::ConnectionFailed)

    expect do
      job.perform_now
    end.to have_broadcasted_to("user_import:#{user_import.id}").with(type: "user_import.changed", schemaVersion: 1,
                                                                     importId: user_import.id.to_s)

    expect(user_import.reload).to have_attributes(status: "failed", failure_code: "retry_exhausted")
  end
end

class Current < ActiveSupport::CurrentAttributes
  attribute :session, :suppress_dashboard_metrics
  delegate :user, to: :session, allow_nil: true
end

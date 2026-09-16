# This endpoint intentionally avoids sessions, browser checks, and Inertia shares.
# rubocop:disable-next Rails/ApplicationController
class DeliveryReadinessController < ActionController::Base
  def show
    ActiveRecord::Base.connection_pool.with_connection do |connection|
      connection.select_value("SELECT 1")
    end
    ActiveRecord::Migration.check_all_pending!

    response.headers["Cache-Control"] = "no-store"
    render plain: "ready\n", status: :ok
  rescue ActiveRecord::ActiveRecordError
    Rails.logger.warn("delivery.readiness.unavailable")
    response.headers["Cache-Control"] = "no-store"
    render plain: "unavailable\n", status: :service_unavailable
  end
end

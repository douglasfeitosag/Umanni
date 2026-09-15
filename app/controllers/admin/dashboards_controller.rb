class Admin::DashboardsController < Admin::BaseController
  def show
    render inertia: "Admin/Dashboard", props: { metrics: DashboardMetricsQuery.call }
  end
end

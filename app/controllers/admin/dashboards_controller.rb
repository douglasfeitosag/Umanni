module Admin
  class DashboardsController < BaseController
    def show
      render inertia: "Admin/Dashboard", props: { metrics: DashboardMetricsQuery.call }
    end
  end
end

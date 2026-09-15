class Admin::DashboardsController < Admin::BaseController
  def show
    render inertia: "Admin/Dashboard", props: { metrics: { total: User.count, byRole: { admin: User.admin.count, regular: User.regular.count } } }
  end
end

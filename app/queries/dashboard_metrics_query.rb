class DashboardMetricsQuery
  def self.call
    counts = User.group(:role).count
    by_role = { admin: counts.fetch("admin", 0), regular: counts.fetch("regular", 0) }
    { total: by_role.values.sum, byRole: by_role }
  end
end

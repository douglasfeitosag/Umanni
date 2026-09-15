export type Role = 'admin' | 'regular'

export type UserView = {
  id: string
  fullName: string
  email: string
  role: Role
  avatarUrl: string | null
}

export type UserPermissions = {
  edit: boolean
  destroy: boolean
  changeRole: boolean
}

export type DashboardMetrics = {
  total: number
  byRole: { admin: number; regular: number }
}

export type SharedProps = {
  auth: { user: UserView | null }
  flash: { notice?: string; alert?: string }
  errors: Record<string, string>
}

export type FoundationPageProps = { app: { name: string; version: string }; errors?: Record<string, string> }

import { execFileSync } from 'node:child_process'

export default function globalSetup() {
  const base = new URL(process.env.TEST_DATABASE_URL ?? 'postgresql://umanni:umanni-local@127.0.0.1:5432/umanni_test')
  base.pathname = '/umanni_e2e'
  const code = `
    user = User.find_or_initialize_by(email: "admin@umanni.local")
    user.assign_attributes(full_name: "Admin Umanni", role: :admin, password: "uma senha admin segura", password_confirmation: "uma senha admin segura") if user.new_record?
    user.save!
  `
  execFileSync('bundle', ['exec', 'rails', 'runner', code], {
    env: { ...process.env, RAILS_ENV: 'test', TEST_DATABASE_URL: base.toString(), TEST_ENV_NUMBER: '', CABLE_ADAPTER: 'solid_cable' },
    stdio: 'inherit',
  })
}

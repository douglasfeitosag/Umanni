import { defineConfig } from '@playwright/test'

const browsers = ['chromium', 'firefox', 'webkit'] as const
const viewports = [
  { name: 'desktop', width: 1440, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]
const testDatabaseUrl = process.env.TEST_DATABASE_URL ?? 'postgresql://umanni:umanni-local@127.0.0.1:5432/umanni_test'
const e2eDatabaseUrl = new URL(testDatabaseUrl)
if (e2eDatabaseUrl.pathname !== '/umanni_test') throw new Error('Expected dedicated test database URL')
e2eDatabaseUrl.pathname = '/umanni_e2e'

export default defineConfig({
  globalSetup: './spec/e2e/global-setup.ts',
  testDir: './spec/e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3101', trace: 'retain-on-failure' },
  projects: browsers.flatMap(browserName => viewports.map(({ name, width, height }) => ({
    name: `${browserName}-${name}`,
    use: { browserName, viewport: { width, height } },
  }))),
  webServer: [
    {
      command: 'bundle exec rails server -b 127.0.0.1 -p 3101',
      url: 'http://127.0.0.1:3101/up',
      reuseExistingServer: false,
      timeout: 30000,
      env: { RAILS_ENV: 'test', TEST_DATABASE_URL: e2eDatabaseUrl.toString(), TEST_ENV_NUMBER: '', VITE_RUBY_AUTO_BUILD: 'false', CABLE_ADAPTER: 'solid_cable' },
    },
    {
      command: 'bin/jobs',
      reuseExistingServer: false,
      timeout: 30000,
      env: { RAILS_ENV: 'test', TEST_DATABASE_URL: e2eDatabaseUrl.toString(), TEST_ENV_NUMBER: '', CABLE_ADAPTER: 'solid_cable' },
    },
  ],
})

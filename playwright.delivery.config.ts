import { defineConfig } from '@playwright/test'

const browsers = ['chromium', 'firefox', 'webkit'] as const
const viewports = [
  { name: 'desktop', width: 1440, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

export default defineConfig({
  testDir: './spec/delivery',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: process.env.DELIVERY_BASE_URL ?? 'http://host.docker.internal:3131',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  projects: browsers.flatMap(browserName => viewports.map(({ name, width, height }) => ({
    name: `${browserName}-${name}`,
    use: { browserName, viewport: { width, height } },
  }))),
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['app/frontend/**/*.test.{ts,tsx}'],
    setupFiles: ['app/frontend/test/setup.ts'],
    pool: 'forks',
    maxWorkers: 2,
    coverage: {
      provider: 'v8',
      include: ['app/frontend/**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**', 'app/frontend/test/**', 'app/frontend/entrypoints/**'],
      thresholds: { lines: 90 },
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: 'coverage/typescript',
    },
  },
})

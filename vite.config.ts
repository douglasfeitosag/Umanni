import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [RubyPlugin(), react(), tailwindcss()],
  server: { origin: 'http://localhost:3036', hmr: { host: 'localhost', clientPort: 3036 } },
})

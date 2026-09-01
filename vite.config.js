import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path:
// https://finrevsolutions.github.io/FinRev_Digital_Card/
export default defineConfig({
  base: '/FinRev_Digital_Card/',
  plugins: [react()],
  server: {
    allowedHosts: ['.monkeycode-ai.live'],
  },
})

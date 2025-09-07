import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // exposes server to LAN / external access
    port: 3000,  // sets port to 3000
  },
})

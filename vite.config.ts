import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://coinbase-clone-api-bevo.onrender.com',
        changeOrigin: true,
        secure: false,
        // Optionally rewrite the path if your backend doesn't use /api
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/auth/google': {
            target: 'https://astroyard-backend.onrender.com',
            changeOrigin: true,
            secure: false,
        },
    },
},
})

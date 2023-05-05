import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/fakebook",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['source-map-js', 'path', 'url'],
    },
  }
})


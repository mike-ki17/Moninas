import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/mike-ki17/Moninas',
  build: {
    sourcemap: true, 
  },
})

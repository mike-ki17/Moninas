import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://mike-ki17.github.io/Moninas/",
  // build: {
  //   sourcemap: true, 
  // },
})

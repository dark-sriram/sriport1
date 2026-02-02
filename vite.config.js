import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/sriram-portfolio/' if deploying to GitHub Pages
})
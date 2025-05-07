// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nick_tool/', // replace with your repo name
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev should run at /, production build can be deployed under /SkyPond-AI/
  base: command === 'serve' ? '/' : '/SkyPond-AI/',
}))

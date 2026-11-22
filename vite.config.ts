import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /api goes to the FastAPI service in server/ (uvicorn app:app --port 8200).
const api = { '/api': { target: 'http://127.0.0.1:8200', changeOrigin: false } }

export default defineConfig({
  plugins: [react()],
  server: { proxy: api },
  preview: { proxy: api },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __API_BASE_URL__: JSON.stringify(
      mode === 'production' ? '' : 'http://localhost:9000'
    )
  },
  server: {
    port: 3000,
  },
}));

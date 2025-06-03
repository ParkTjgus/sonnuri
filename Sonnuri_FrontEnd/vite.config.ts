import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8000', // ✅ 컨테이너 이름 사용
        // target: 'http://localhost:8000', // ✅ 컨테이너 이름 사용
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
});

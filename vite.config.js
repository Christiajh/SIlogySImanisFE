import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
  server: {
    port: 5173,

    // Hanya aktif saat development
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:3001', // Jika kamu masih testing lokal backend
        changeOrigin: true,
        secure: false,
      },
    } : undefined,
  },
  base: '/',
}));

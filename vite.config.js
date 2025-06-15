// vite.config.js
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
    proxy: mode === 'development'
      ? {
          '/api': {
            target: 'http://localhost:3001', // Hanya digunakan saat development
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));

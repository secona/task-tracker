import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: { 
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/global.scss";`
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        rewrite: path => path.replace(/^\/api/, ''),
      }
    },
  },
});

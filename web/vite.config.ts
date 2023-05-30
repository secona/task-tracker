import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      generateScopedName: isProduction ? '[hash:base64:5]' : '[name]__[local]',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import path from 'path';

export default defineConfig({
  plugins: [react(), alias()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: ['@mdi/react', '@mdi/js'],
  },
});

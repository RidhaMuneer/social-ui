import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES module context
const __dirname = dirname(fileURLToPath(import.meta.url));

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

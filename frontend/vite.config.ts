// vite.config.ts — Vite configuration kept intentionally small for dev UX
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, 'src/modules')
    }
  },
  server: { port: 5173 }
});

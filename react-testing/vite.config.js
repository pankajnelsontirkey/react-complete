import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0 // Disables base64 inlining for all assets
  },
  plugins: [react()],
  test: { globals: true, environment: 'jsdom', setupFiles: './src/setup.js' }
});

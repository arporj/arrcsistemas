import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [react(), sitemap({ hostname: 'https://arrcsistemas.com.br' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'React-vite-app',
        short_name: 'react-vite-app',
        description: 'I am a simple vite app',
        icons: [
          {
            src: '/manifest-icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/manifest-icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/manifest-icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/manifest-icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: 'standalone' as const,
        scope: '/',
        start_url: '/',
        screenshots: [
          {
            src: '/manifest-icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide' as const,
            label: 'Desktop wide view of the app',
          },
          {
            src: '/manifest-icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow' as const,
            label: 'Mobile view of the app',
          },
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true, // ← this is the fix
  },
});

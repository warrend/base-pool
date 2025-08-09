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
        name: 'base pool',
        short_name: 'base-pool',
        description: 'Track practice and matches.',
        icons: [
          {
            src: 'icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        theme_color: '#030712',
        background_color: '#030712',
        display: 'standalone' as const,
        scope: '/',
        start_url: '/',
        screenshots: [
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide' as const,
            label: 'Desktop wide view of the app',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow' as const,
            label: 'Mobile view of the app',
          },
        ],
      },
      workbox: {
        // Precache common static assets for offline use
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webmanifest,jpg,jpeg,webp,avif,woff,woff2,ttf,eot}',
        ],
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

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'React-vite-app',
        short_name: 'react-vite-app',
        description: 'I am a simple vite app',
        icons: [
          {
            src: '/src/assets/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/src/assets/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/src/assets/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/src/assets/icons/manifest-icon-512.maskable.png',
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
            src: '/android-chrome-512x512.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide' as const,
            label: 'Desktop wide view of the app',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '390x844',
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
});

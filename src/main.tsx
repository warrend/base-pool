import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Register the PWA service worker for offline support
import { registerSW } from 'virtual:pwa-register';

// Register the SW immediately so precached assets are available offline
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

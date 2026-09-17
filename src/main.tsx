import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  if (typeof resource === 'string' && resource.startsWith('/api/')) {
    // If running in Capacitor/native app or local file protocol
    const isNativeApp = !!(window as any).Capacitor || window.location.protocol !== 'https:';
    if (isNativeApp && window.location.hostname !== 'dappersfit.ai.studio') {
      resource = `https://dappersfit.ai.studio${resource}`;
    }
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

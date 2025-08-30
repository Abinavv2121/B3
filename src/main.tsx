import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance optimizations
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Use React.StrictMode for development optimizations
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(() => {});
  });
}

// Performance monitoring
if (import.meta.env.DEV) {
  // Monitor long tasks
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        // console.warn('Long task detected:', entry);
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task observer not supported
  }
}

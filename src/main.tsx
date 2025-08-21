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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Monitor long tasks
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn('Long task detected:', entry);
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task observer not supported
  }
}

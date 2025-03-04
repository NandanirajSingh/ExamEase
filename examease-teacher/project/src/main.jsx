import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Add this to improve initial load performance
const root = document.getElementById('root');
if (root) {
  // Preload critical resources
  const preloadLinks = [
    { rel: 'preload', href: '/src/App.jsx', as: 'script' },
    { rel: 'preload', href: '/src/components/Homepage.jsx', as: 'script' },
    { rel: 'preload', href: '/src/components/Dashboard.jsx', as: 'script' },
    { rel: 'preload', href: '/src/components/Notifications.jsx', as: 'script' }
  ];

  preloadLinks.forEach(({ rel, href, as }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
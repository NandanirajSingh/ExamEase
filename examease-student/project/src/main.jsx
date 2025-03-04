import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Add performance optimization for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use concurrent mode features
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
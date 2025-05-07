import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Make sure the DOM element exists before trying to render
const rootElement = document.getElementById('root');

// Check if the element exists before trying to create a root
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found! Make sure there's a div with id='root' in your HTML file.");
}

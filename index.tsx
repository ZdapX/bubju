

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("[Index] Starting application bootstrap...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  const msg = "Critical Error: Could not find root element '#root' in DOM.";
  console.error(msg);
  document.body.innerHTML = `<div style="color:red; padding: 20px;">${msg}</div>`;
  throw new Error(msg);
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("[Index] React render initiated.");
} catch (err) {
  console.error("[Index] Failed to render React app:", err);
}

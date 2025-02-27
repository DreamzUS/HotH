import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Disable console logging in production for privacy
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// Prevent browser from storing history for this site
if (window.history && window.history.replaceState) {
  const currentUrl = window.location.href;
  window.addEventListener('beforeunload', () => {
    window.history.replaceState(null, '', currentUrl);
  });
}

// Prevent browser from storing form data
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.setAttribute('autocomplete', 'off');
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
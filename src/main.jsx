import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Remove Initial Loader after React mount
const loader = document.getElementById('initial-loader');
if (loader) {
  // Small delay to ensure first paint happens
  requestAnimationFrame(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.remove();
    }, 500); // Matches CSS transition
  });
}

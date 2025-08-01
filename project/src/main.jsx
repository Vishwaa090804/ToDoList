// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './firebase'; // 🔥 This initializes Firebase

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

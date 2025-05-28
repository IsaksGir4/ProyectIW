// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa tu componente principal App
import './index.css'; // Importa tu CSS principal
import { BrowserRouter } from 'react-router-dom'; // <--- Importa BrowserRouter

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      {/* Envuelve tu componente App con BrowserRouter */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root' en el DOM.");
}
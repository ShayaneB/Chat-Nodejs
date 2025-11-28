// main.tsx — React entry point
// This file mounts the single-page application (SPA). Keep the entry point
// minimal; all application logic lives under `src/` components.

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@src/App';
// Our consolidated SCSS entry – imports variables, mixins and all UI styles
import '@src/styles/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

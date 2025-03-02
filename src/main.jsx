import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppWithRedirect from './AppWithRedirect';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/math-drill-frontend/">
      <AppWithRedirect />
    </BrowserRouter>
  </React.StrictMode>,
);
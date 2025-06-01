import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import './fonts/fonts.css';
import './main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// v.1.2.0
// TODO: Nicks Scroll
// TODO: mobile ver landscape
// TODO: Loading download btn
// TODO: fix black skinview (mobile)

// v.1.3.0
// TODO: skin changer

import './index.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux'
import store from './app/store'
const { worker } = require('./mocks/browser');

const root = ReactDOM.createRoot(document.getElementById('root'));
worker.start();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';

import configureStore from './store';

const { store } = configureStore();

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

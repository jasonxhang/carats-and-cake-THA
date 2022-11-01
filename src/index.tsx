import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

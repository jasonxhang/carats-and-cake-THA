import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import user from './user';
import address from './address';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as toastrReducer } from 'react-redux-toastr';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({ user, address, toastr: toastrReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export * from './user';
export * from './address';

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

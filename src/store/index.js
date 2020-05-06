import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import email from './email';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({user, email});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

export * from './user';
export * from './email';

export default () => {
    let store = createStore(persistedReducer, middleware);
    let persistor = persistStore(store);
    return {store, persistor};
};

import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { createPersistReducer } from 'app/helpers/reduxPersist';

import { rootReducer, ApplicationState, rootSaga } from '.';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

function bindMiddleware(middleware: Middleware[]) {
  if (__DEV__) {
    const composeEnhancers = (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return composeEnhancers(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middlewares);
}

const persistConfig = {
  key: 'root',
  blacklist: ['wallets', 'authenticators', 'authentication', 'electrumX', 'filters', 'toastMessages', 'notifications'],
};

const persistedReducer = createPersistReducer(rootReducer, persistConfig);

const configureStore = (): Store<ApplicationState> => createStore(persistedReducer, bindMiddleware(middlewares));

export const store = configureStore();
export const runSaga = () => sagaMiddleware.run(rootSaga);
runSaga();

export const persistor = persistStore(store);

import { getConfig } from '@edx/frontend-platform';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import history from './history';
import {routerMiddleware} from 'connected-react-router/immutable'
import createRootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function composeMiddleware() {
  if (getConfig().ENVIRONMENT === 'development') {
    const loggerMiddleware = createLogger({
      collapsed: true,
    });
    return composeWithDevTools(
      applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware(history), sagaMiddleware)
    );
  }

  return compose(applyMiddleware(thunkMiddleware), routerMiddleware(history), sagaMiddleware);
   
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeMiddleware()
  );

  sagaMiddleware.run(rootSaga)

  return store;
}

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import todoApp from '../reducers';

const configureStore = () => {
  const loggerMiddleware = createLogger();
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
  }
  const store = createStore(
    todoApp,
    applyMiddleware(...middlewares),
  );
  return store;
};

export default configureStore;

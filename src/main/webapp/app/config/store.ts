import reducer, { IRootState } from 'app/shared/reducers';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import DevTools from './devtools';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';
import notificationMiddleware from './notification-middleware';
const defaultMiddlewares = [
  thunkMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  loggerMiddleware,
  logger,
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), DevTools.instrument())
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));
export default initialize;

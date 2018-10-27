import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './reducers.js';
import { rootEpic } from './epics.js';

let store;

const epicMiddleware = createEpicMiddleware();

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'production')
  store = createStore(rootReducer, applyMiddleware(epicMiddleware));
else
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

epicMiddleware.run(rootEpic);

export default store;

import store from './store.js';
import { historyObservable } from '../modules/history.js';
import { ROUTE_UPDATE } from './actions.js';

const subscription = historyObservable.subscribe({
  next: payload => {
    store.dispatch({
      type: ROUTE_UPDATE,
      payload
    });
  }
});

export default subscription;

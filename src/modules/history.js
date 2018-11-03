import createBrowserHistory from 'history/createBrowserHistory';
import { Observable } from 'rxjs';
import isFunction from 'lodash/isFunction.js';

const history = createBrowserHistory();

export default history;

export const historyObservable = Observable.create(function(observer) {
  let unlisten;

  try {
    // Listen for changes to the current location.
    unlisten = history.listen((location, action) => {
      // location is an object like window.location
      observer.next({ location, action });
    });
  } catch (err) {
    observer.error(err);
  }

  return () => {
    if (isFunction(unlisten)) unlisten();
    observer.complete();
  };
});

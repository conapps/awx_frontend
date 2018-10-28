import { combineEpics } from 'redux-observable';
import { from as observableFrom } from 'rxjs';
import history from '../../modules/history.js';
import { map, switchMap } from 'rxjs/operators';
import { MULTI, GO, NOOP } from '../actions.js';

export default combineEpics(multi, go);

function multi($action) {
  return $action
    .ofType(MULTI)
    .pipe(switchMap(({ payload }) => observableFrom(payload)));
}

function go($action) {
  return $action.ofType(GO).pipe(
    map(({ payload }) => {
      history.push(payload);
      return {
        type: NOOP
      };
    })
  );
}

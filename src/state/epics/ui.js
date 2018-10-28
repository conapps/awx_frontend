import { combineEpics } from 'redux-observable';
import { from as observableFrom } from 'rxjs';
import { toaster } from 'evergreen-ui';
import history from '../../modules/history.js';
import { map, switchMap } from 'rxjs/operators';
import { MULTI, GO, NOOP, ERROR } from '../actions.js';

export default combineEpics(multi, go, error);

function error($action) {
  return $action.ofType(ERROR).pipe(
    map(({ payload }) => {
      const message = payload.message || 'Error insesperado';
      toaster.danger(message);
      return { type: NOOP };
    })
  );
}

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

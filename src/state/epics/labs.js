import { combineEpics } from 'redux-observable';
import { mapTo, map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  LABS_CREATE_SUCCESS,
  LABS_DELETE_SUCCESS,
  UI,
  NOOP
} from '../actions.js';

export default combineEpics(create, destroy);

function destroy($action) {
  return $action.ofType(LABS_DELETE_SUCCESS).pipe(
    map(() => {
      toaster.success('Laboratorio eliminado');
      return {
        type: NOOP
      };
    })
  );
}

function create($action) {
  return $action.ofType(LABS_CREATE_SUCCESS).pipe(
    mapTo({
      type: UI,
      payload: {
        labs: {
          isSideSheetOpen: false
        }
      }
    })
  );
}

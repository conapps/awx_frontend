import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  LABS_CREATE_SUCCESS,
  LABS_DELETE_SUCCESS,
  LABS_UPDATE_SUCCESS,
  UI,
  NOOP
} from '../actions.js';

export default combineEpics(create, destroy, update);

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

function update($action) {
  return $action.ofType(LABS_UPDATE_SUCCESS).pipe(
    map(() => {
      toaster.success('Laboratorio actualizado');
      return {
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: false
          }
        }
      };
    })
  );
}

function create($action) {
  return $action.ofType(LABS_CREATE_SUCCESS).pipe(
    map(() => {
      toaster.success('Laboratorio creado');
      return {
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: false
          }
        }
      };
    })
  );
}

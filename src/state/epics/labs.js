import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  LABS_CREATE_SUCCESS,
  LABS_DELETE_SUCCESS,
  LABS_UPDATE_SUCCESS,
  LABS_SHOW_SUCCESS,
  UI
} from '../actions.js';

export default combineEpics(create, destroy, update, show);

function show($action) {
  return $action.ofType(LABS_SHOW_SUCCESS).pipe(
    map(({ payload }) => {
      const id = payload.result[0];
      const lab = payload.entities.labs[id];
      return {
        type: UI,
        payload: {
          title: `Laboratorios / ${lab.data.name}`
        }
      };
    })
  );
}

function destroy($action) {
  return $action.ofType(LABS_DELETE_SUCCESS).pipe(
    map(() => {
      toaster.success('Laboratorio eliminado');
      return {
        type: UI,
        payload: {
          labs: {
            isLabDeleteDialogOpen: false
          }
        }
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

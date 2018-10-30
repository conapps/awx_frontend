import { combineEpics } from 'redux-observable';
import get from 'lodash/get.js';
import { map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  LABS_CREATE_SUCCESS,
  LABS_DELETE_SUCCESS,
  LABS_UPDATE_SUCCESS,
  LABS_SHOW_SUCCESS,
  UI,
  NOOP
} from '../actions.js';

export default combineEpics(create, destroy, update, show);

function show($action) {
  return $action.ofType(LABS_SHOW_SUCCESS).pipe(
    map(({ payload }) => {
      const id = get(payload, 'result[0]');
      const lab = get(payload, `entities.labs.${id}`);
      const editUI = get(payload, 'meta.editUI', true);

      if (editUI === false) return { type: NOOP };

      return {
        type: UI,
        payload: {
          title: `Laboratorios / ${lab.data.name}`,
          labs: {
            editiing: lab.id
          }
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

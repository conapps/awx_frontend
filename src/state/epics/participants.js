import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_DELETE_SUCCESS,
  PARTICIPANTS_UPDATE_SUCCESS,
  PARTICIPANTS_SHOW_SUCCESS,
  UI,
  NOOP
} from '../actions.js';

export default combineEpics(create, destroy, update, show);

function show($action) {
  return $action.ofType(PARTICIPANTS_SHOW_SUCCESS).pipe(
    map(({ payload }) => {
      const id = payload.result[0];
      const participant = payload.entities.participants[id];
      return {
        type: UI,
        payload: {
          title: `Participantes / ${participant.data.name}`
        }
      };
    })
  );
}

function destroy($action) {
  return $action.ofType(PARTICIPANTS_DELETE_SUCCESS).pipe(
    map(() => {
      toaster.success('Participante eliminado');
      return {
        type: NOOP
      };
    })
  );
}

function update($action) {
  return $action.ofType(PARTICIPANTS_UPDATE_SUCCESS).pipe(
    map(() => {
      toaster.success('Participante actualizado');
      return {
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: false
          }
        }
      };
    })
  );
}

function create($action) {
  return $action.ofType(PARTICIPANTS_CREATE_SUCCESS).pipe(
    map(() => {
      toaster.success('Participante creado');
      return {
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: false
          }
        }
      };
    })
  );
}

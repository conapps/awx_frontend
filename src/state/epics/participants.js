import { combineEpics } from 'redux-observable';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import { map } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  PARTICIPANTS_UPDATE_REQUEST,
  PARTICIPANTS_UPDATE_SUCCESS,
  PARTICIPANTS_UPDATE_FAILURE,
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_DELETE_SUCCESS,
  PARTICIPANTS_SHOW_SUCCESS,
  JOBS_RUN_SUCCESS,
  PUT_REQUEST,
  UI,
  NOOP,
  ENTITY
} from '../actions.js';
import { participants as participantsSchema } from '../schemas.js';

export default combineEpics(create, destroy, update, show, jobSuccess);

function jobSuccess($action) {
  return $action.ofType(JOBS_RUN_SUCCESS).pipe(
    map(({ payload }) => {
      const id = get(payload, 'meta.id', undefined);
      const jobId = get(payload, 'result[0]');
      const status = get(payload, `entities.jobs.${jobId}.data.status`);
      return {
        type: PUT_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          body: {
            jobId,
            status
          },
          uiKey: 'participantsUpdate',
          schema: participantsSchema,
          actionTypes: [
            PARTICIPANTS_UPDATE_REQUEST,
            PARTICIPANTS_UPDATE_SUCCESS,
            PARTICIPANTS_UPDATE_FAILURE
          ],
          meta: {
            ...normalize([{ id, data: { status, jobId } }], participantsSchema)
          }
        }
      };
    })
  );
}

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
    map(({ payload }) => {
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

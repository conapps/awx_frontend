import { combineEpics } from 'redux-observable';
import { from as observableFrom } from 'rxjs';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import { map, switchMap } from 'rxjs/operators';
import { toaster } from 'evergreen-ui';
import {
  PARTICIPANTS_UPDATE_REQUEST,
  PARTICIPANTS_UPDATE_SUCCESS,
  PARTICIPANTS_UPDATE_FAILURE,
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_DELETE_SUCCESS,
  PARTICIPANTS_SHOW_SUCCESS,
  JOBS_SHOW_REQUEST,
  JOBS_SHOW_SUCCESS,
  JOBS_SHOW_FAILURE,
  LABS_SHOW_REQUEST,
  LABS_SHOW_SUCCESS,
  LABS_SHOW_FAILURE,
  JOBS_LAUNCH_SUCCESS,
  PUT_REQUEST,
  GET_REQUEST,
  UI,
  NOOP
} from '../actions.js';
import {
  participants as participantsSchema,
  jobs as jobsSchema,
  labs as labsSchema
} from '../schemas.js';

export default combineEpics(create, destroy, update, show, jobSuccess);

function jobSuccess($action) {
  return $action.ofType(JOBS_LAUNCH_SUCCESS).pipe(
    map(({ payload }) => {
      const id = get(payload, 'meta.id', undefined);
      const jobId = get(payload, 'result[0]');
      const status = get(payload, `entities.jobs.${jobId}.data.status`);
      const lastPlaybook = get(payload, `entities.jobs.${jobId}.data.name`);
      return {
        type: PUT_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          body: {
            jobId,
            status,
            lastPlaybook
          },
          uiKey: 'participantsUpdate',
          schema: participantsSchema,
          actionTypes: [
            PARTICIPANTS_UPDATE_REQUEST,
            PARTICIPANTS_UPDATE_SUCCESS,
            PARTICIPANTS_UPDATE_FAILURE
          ],
          meta: {
            ...normalize(
              [{ id, data: { status, jobId, lastPlaybook } }],
              participantsSchema
            )
          }
        }
      };
    })
  );
}

function show($action) {
  return $action.ofType(PARTICIPANTS_SHOW_SUCCESS).pipe(
    switchMap(({ payload }) => {
      const id = get(payload, 'result[0]');
      const participant = get(payload, `entities.participants.${id}`);
      const deep = get(payload, 'meta.deep', false);
      const actions = [
        {
          type: UI,
          payload: {
            title: `Participantes / ${participant.data.name}`,
            participants: {
              editing: id
            }
          }
        }
      ];

      if (deep === true) {
        const labId = get(participant, 'data.labId');
        const jobId = get(participant, 'data.jobId');

        if (labId !== undefined) {
          actions.push({
            type: UI,
            payload: {
              labs: {
                editing: labId
              }
            }
          });
          actions.push({
            type: GET_REQUEST,
            payload: {
              endpoint: `/labs/${labId}/`,
              uiKey: 'labsShow',
              schema: labsSchema,
              actionTypes: [
                LABS_SHOW_REQUEST,
                LABS_SHOW_SUCCESS,
                LABS_SHOW_FAILURE
              ],
              meta: {
                editUI: false
              }
            }
          });
        }

        if (jobId !== undefined) {
          actions.push({
            type: UI,
            payload: {
              jobs: {
                editing: jobId
              }
            }
          });
          actions.push({
            type: GET_REQUEST,
            payload: {
              endpoint: `/jobs/${jobId}/`,
              uiKey: 'jobsShow',
              schema: jobsSchema,
              actionTypes: [
                JOBS_SHOW_REQUEST,
                JOBS_SHOW_SUCCESS,
                JOBS_SHOW_FAILURE
              ]
            }
          });
        }
      }

      return observableFrom(actions);
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

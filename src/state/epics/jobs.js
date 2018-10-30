import { combineEpics } from 'redux-observable';
import { from as observableFrom } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import { map } from 'rxjs/operators';
import {
  JOBS_LAUNCH_FAILURE,
  JOBS_SHOW_REQUEST,
  JOBS_SHOW_SUCCESS,
  JOBS_STDOUT_SUCCESS,
  JOBS_SHOW_FAILURE,
  ENTITY,
  PARTICIPANTS_INDEX_SUCCESS,
  GET_REQUEST,
  NOOP,
  UI
} from '../actions.js';
import {
  participants as participantsSchema,
  jobs as jobsSchema
} from '../schemas.js';

export default combineEpics(failure, jobStatus, success, stdoutSuccess);

function stdoutSuccess($action) {
  return $action.ofType(JOBS_STDOUT_SUCCESS).pipe(
    map(({ payload }) => {
      const result = get(payload, 'result', undefined);

      return {
        type: UI,
        payload: {
          jobs: {
            stdout: result
          }
        }
      };
    })
  );
}

function success($action) {
  return $action.ofType(JOBS_SHOW_SUCCESS).pipe(
    map(({ payload }) => {
      const id = get(payload, 'result[0]', undefined);
      const status = get(payload, `entities.jobs.${id}.data.status`, {});
      const lastPlaybook = get(payload, `entities.jobs.${id}.data.name`, {});
      const participantId = get(payload, 'meta.participantId', undefined);

      if (participantId === undefined) return { type: NOOP };

      return {
        type: ENTITY,
        payload: {
          ...normalize(
            [{ id: participantId, data: { status, lastPlaybook } }],
            participantsSchema
          )
        }
      };
    })
  );
}

function jobStatus($action) {
  return $action.ofType(PARTICIPANTS_INDEX_SUCCESS).pipe(
    mergeMap(({ payload }) => {
      const participants = payload.result.map(
        id => payload.entities.participants[id]
      );

      return observableFrom(
        participants
          .filter(participant => participant.data.jobId !== undefined)
          .map(participant => ({
            type: GET_REQUEST,
            payload: {
              endpoint: `/jobs/${participant.data.jobId}/`,
              uiKey: `jobsShow__${participant.data.jobId}`,
              schema: jobsSchema,
              meta: {
                participantId: participant.id
              },
              actionTypes: [
                JOBS_SHOW_REQUEST,
                JOBS_SHOW_SUCCESS,
                JOBS_SHOW_FAILURE
              ]
            }
          }))
      );
    })
  );
}

function failure($action) {
  return $action.ofType(JOBS_LAUNCH_FAILURE).pipe(
    map(({ payload }) => {
      const id = get(payload, 'meta.id', undefined);
      const statusCode = get(payload, 'response.status', 400);
      const status = statusCode === 404 ? 'NOT FOUND' : 'FAILURE';
      console.log(id);
      return {
        type: ENTITY,
        payload: {
          ...normalize([{ id, data: { status } }], participantsSchema)
        }
      };
    })
  );
}

import { combineEpics, ofType } from 'redux-observable';
import { from as observableFrom, interval as observableInterval } from 'rxjs';
import {
  map,
  mapTo,
  mergeMap,
  switchMap,
  takeUntil,
  startWith
} from 'rxjs/operators';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import {
  ROUTE_UPDATE,
  JOBS_LAUNCH_FAILURE,
  JOBS_SHOW_REQUEST,
  JOBS_SHOW_SUCCESS,
  JOBS_STDOUT_SUCCESS,
  JOBS_SHOW_FAILURE,
  JOBS_STDOUT_TRACK,
  JOBS_STDOUT_SUBSCRIBE,
  JOBS_STDOUT_UNSUBSCRIBE,
  JOBS_STDOUT_REQUEST,
  JOBS_STDOUT_FAILURE,
  ENTITY,
  PARTICIPANTS_INDEX_SUCCESS,
  GET_REQUEST,
  NOOP,
  MULTI,
  UI
} from '../actions.js';
import {
  participants as participantsSchema,
  jobs as jobsSchema
} from '../schemas.js';
import { getActiveJob } from '../reducers/jobs.js';

/** Constants */
const INTERVAL = 1000 * 30; /* 1 minutes */

export default combineEpics(
  failure,
  jobStatus,
  success,
  stdoutSuccess,
  stdoutTrack,
  stdoutSubscription,
  stdoutUnsubscribeOnRouteUpdate
);

function stdoutUnsubscribeOnRouteUpdate($action) {
  return $action.ofType(ROUTE_UPDATE).pipe(
    mapTo({
      type: MULTI,
      payload: [
        { type: JOBS_STDOUT_UNSUBSCRIBE },
        {
          type: UI,
          payload: { jobs: { stdoutTrack: false } }
        }
      ]
    })
  );
}

function stdoutSubscription($action, $state) {
  return $action.ofType(JOBS_STDOUT_SUBSCRIBE).pipe(
    switchMap(() => {
      const id = get($state.value, 'ui.jobs.editing', undefined);

      if (id === undefined) return { type: NOOP };

      return observableInterval(INTERVAL).pipe(
        startWith(0),
        mapTo({
          type: GET_REQUEST,
          payload: {
            endpoint: `/jobs/stdout/${id}/`,
            uiKey: 'jobsStdout',
            actionTypes: [
              JOBS_STDOUT_REQUEST,
              JOBS_STDOUT_SUCCESS,
              JOBS_STDOUT_FAILURE
            ]
          }
        }),
        takeUntil($action.pipe(ofType(JOBS_STDOUT_UNSUBSCRIBE)))
      );
    })
  );
}

function stdoutTrack($action, $state) {
  return $action.ofType(JOBS_STDOUT_TRACK).pipe(
    map(({ payload }) => {
      const job = getActiveJob($state.value);
      const actions = [
        {
          type: UI,
          payload: {
            jobs: {
              stdoutTrack: payload
            }
          }
        }
      ];

      if (job.data.status === 'running') {
        actions.push({
          type: JOBS_STDOUT_SUBSCRIBE
        });
      }

      return {
        type: MULTI,
        payload: actions
      };
    })
  );
}

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

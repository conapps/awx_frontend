import { combineEpics } from 'redux-observable';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import { map } from 'rxjs/operators';
import { JOBS_RUN_FAILURE, ENTITY } from '../actions.js';
import { participants as participantsSchema } from '../schemas.js';

export default combineEpics(failure);

function failure($action) {
  return $action.ofType(JOBS_RUN_FAILURE).pipe(
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

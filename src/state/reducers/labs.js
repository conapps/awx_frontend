import union from 'lodash/union.js';
import get from 'lodash/get.js';
import {
  LABS_CREATE_FAILURE,
  LABS_CREATE_SUCCESS,
  LABS_CREATE_REQUEST,
  LABS_INDEX_FAILURE,
  LABS_INDEX_SUCCESS,
  LABS_INDEX_REQUEST
} from '../actions.js';

export default labs;

function labs(
  state = { ids: [], error: undefined, loading: false },
  { type, payload }
) {
  switch (type) {
    case LABS_CREATE_REQUEST:
    case LABS_INDEX_REQUEST:
      return {
        ...state,
        error: undefined,
        loading: true
      };
    case LABS_CREATE_SUCCESS:
    case LABS_INDEX_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, payload.result),
        loading: false
      };
    case LABS_CREATE_FAILURE:
    case LABS_INDEX_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false
      };
    default:
      return state;
  }
}
/** Functions */
export function getLabs(state) {
  const ids = get(state, 'labs.ids', []);
  const labs = get(state, 'entities.labs', {});

  return ids.map(id => labs[id]);
}

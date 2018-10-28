import union from 'lodash/union.js';
import get from 'lodash/get.js';
import { LABS_CREATE_SUCCESS, LABS_INDEX_SUCCESS } from '../actions.js';

export default labs;

function labs(
  state = { ids: [], error: undefined, loading: false },
  { type, payload }
) {
  switch (type) {
    case LABS_CREATE_SUCCESS:
    case LABS_INDEX_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, payload.result)
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

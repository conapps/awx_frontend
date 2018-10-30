import union from 'lodash/union.js';
import get from 'lodash/get.js';
import {
  LABS_CREATE_SUCCESS,
  LABS_INDEX_SUCCESS,
  LABS_DELETE_REQUEST,
  LABS_SHOW_SUCCESS
} from '../actions.js';

export default labs;

function labs(state = { ids: [], error: undefined }, { type, payload }) {
  switch (type) {
    case LABS_CREATE_SUCCESS:
    case LABS_INDEX_SUCCESS:
    case LABS_SHOW_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, payload.result)
      };
    case LABS_DELETE_REQUEST:
      return {
        ...state,
        ids: state.ids.filter(id => id !== payload.id)
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

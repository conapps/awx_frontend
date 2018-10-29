import union from 'lodash/union.js';
import get from 'lodash/get.js';
import {
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_INDEX_SUCCESS,
  PARTICIPANTS_DELETE_REQUEST
} from '../actions.js';

export default participants;

function participants(
  state = { ids: [], error: undefined },
  { type, payload }
) {
  switch (type) {
    case PARTICIPANTS_CREATE_SUCCESS:
    case PARTICIPANTS_INDEX_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, payload.result)
      };
    case PARTICIPANTS_DELETE_REQUEST:
      return {
        ...state,
        ids: state.ids.filter(id => id !== payload.id)
      };
    default:
      return state;
  }
}
/** Functions */
export function getParticipants(state) {
  const labId = get(state, 'ui.labs.editing', undefined);
  const participants = get(state, 'entities.participants', {});
  const lab = get(state, `entities.labs.${labId}`, {});
  const ids = get(lab, 'data.participants', []);

  return ids.map(id => participants[id]).filter(item => item !== undefined);
}

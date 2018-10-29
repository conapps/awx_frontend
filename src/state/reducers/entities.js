import deepmerge from 'deepmerge';
import union from 'lodash/union.js';

export default entities;

function entities(state = {}, { payload } = {}) {
  if (payload && payload.entities !== undefined)
    state = deepmerge(state, payload.entities, {
      arrayMerge: union
    });

  return state;
}

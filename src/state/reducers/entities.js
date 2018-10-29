import deepmerge from 'deepmerge';
import union from 'lodash/union.js';
import difference from 'lodash/difference.js';

export default entities;

function entities(state = {}, { payload } = {}) {
  if (payload && payload.entities !== undefined) {
    const arrayMerge = payload.arrayMerge === 'difference' ? difference : union;

    state = deepmerge(state, payload.entities, {
      arrayMerge
    });
  }

  return state;
}

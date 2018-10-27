import deepmerge from 'deepmerge';

export default entities;

function entities(state = {}, { payload } = {}) {
  if (payload && payload.entities !== undefined)
    state = deepmerge(state, payload.entities);

  return state;
}

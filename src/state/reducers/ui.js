import deepmerge from 'deepmerge';
import { UI, LOADING, ERROR } from '../actions.js';

export default ui;

function ui(state = {}, { type, payload }) {
  if (type === LOADING) {
    const { key, value } = payload;
    return deepmerge(state, {
      loading: {
        [key]: value
      }
    });
  }

  if (type === ERROR) {
    const { key, value } = payload;
    return deepmerge(state, {
      errors: {
        [key]: value
      }
    });
  }

  if (type === UI) return deepmerge(state, payload);

  return state;
}

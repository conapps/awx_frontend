import deepmerge from 'deepmerge';
import { UI } from '../actions.js';

export default ui;

function ui(state = {}, { type, payload }) {
  if (type === UI) return deepmerge(state, payload);
  return state;
}

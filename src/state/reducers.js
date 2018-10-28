import { combineReducers } from 'redux';
import ui from './reducers/ui.js';
import entities from './reducers/entities.js';
import labs from './reducers/labs.js';
import participants from './reducers/participants.js';

export var rootReducer = combineReducers({
  ui,
  entities,
  labs,
  participants
});

import { combineEpics } from 'redux-observable';

import crud from './epics/crud.js';
import auth from './epics/auth.js';

export var rootEpic = combineEpics(crud, auth);

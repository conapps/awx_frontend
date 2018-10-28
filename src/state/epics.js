import { combineEpics } from 'redux-observable';

import crud from './epics/crud.js';
import auth from './epics/auth.js';
import labs from './epics/labs.js';

export var rootEpic = combineEpics(crud, auth, labs);

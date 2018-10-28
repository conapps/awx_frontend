import { combineEpics } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { LABS_CREATE_SUCCESS, UI } from '../actions.js';

export default combineEpics(create);

function create($action) {
  return $action.ofType(LABS_CREATE_SUCCESS).pipe(
    mapTo({
      type: UI,
      payload: {
        labs: {
          isSideSheetOpen: false
        }
      }
    })
  );
}

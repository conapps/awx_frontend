import { ajax } from 'rxjs/ajax';
import { of as observableOf } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { REFRESH_TOKENS } from '../actions.js';
import { AUTH_URL } from '../../constants.js';
import auth from '../../modules/auth.js';

export default combineEpics(refreshTokens);

function refreshTokens($action) {
  return $action.ofType(REFRESH_TOKENS).pipe(
    switchMap(({ payload: { type, payload } }) =>
      ajax
        .post(
          `${AUTH_URL}/refresh/`,
          { token: auth.refreshToken },
          {
            'Content-Type': 'application/json'
          }
        )
        .pipe(
          switchMap(({ response }) => {
            console.log('Tokens refreshed');
            auth.accessToken = response.accessToken;
            auth.idToken = response.idToken;
            auth.refreshToken = response.refreshToken;
            return observableOf({
              type,
              payload
            });
          }),
          catchError(() => {
            console.log('Tokens refresh error');
            //auth.logout();
          })
        )
    )
  );
}

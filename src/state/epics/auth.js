import { ajax } from 'rxjs/ajax';
import { of as observableOf, concat } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { toaster } from 'evergreen-ui';
import {
  REFRESH_TOKENS,
  UI,
  LOGIN,
  LOGOUT,
  LOADING,
  ERROR,
  RUN
} from '../actions.js';
import { AUTH_URL } from '../../constants.js';
import auth from '../../modules/auth.js';

export default combineEpics(refreshTokens, login, logout, run);

function run($action) {
  return $action.ofType(RUN).pipe(
    switchMap(() => {
      return observableOf({
        type: REFRESH_TOKENS,
        payload: {
          success: {
            type: UI,
            payload: {
              isReady: true,
              isAuthenticated: true
            }
          },
          failure: {
            type: UI,
            payload: {
              isReady: true,
              isAuthenticated: false
            }
          }
        }
      });
    })
  );
}

function logout($action) {
  return $action.ofType(LOGOUT).pipe(
    map(() => {
      auth.logout();
      return {
        type: UI,
        payload: {
          isReady: false
        }
      };
    })
  );
}

function login($action) {
  return $action.ofType(LOGIN).pipe(
    switchMap(({ payload }) =>
      concat(
        observableOf({
          type: LOADING,
          payload: {
            key: 'login',
            value: true
          }
        }),
        observableOf({
          type: ERROR,
          payload: {
            key: 'login',
            value: undefined
          }
        }),
        ajax
          .post(`${AUTH_URL}/login/`, payload, {
            'Content-Type': 'application/json'
          })
          .pipe(
            switchMap(({ response }) => {
              console.log('Welcome!');
              auth.user = response.user;
              auth.accessToken = response.accessToken;
              auth.idToken = response.idToken;
              auth.refreshToken = response.refreshToken;

              let message = 'Bienvenido';
              if (response.user.name !== undefined)
                message += ` ${response.user.name}`;

              toaster.success(message);
              return concat(
                observableOf({
                  type: LOADING,
                  payload: {
                    key: 'login',
                    value: false
                  }
                }),
                observableOf({
                  type: UI,
                  payload: {
                    isAuthenticated: true
                  }
                })
              );
            }),
            catchError(response => {
              const message = 'Credenciales invalidas';
              toaster.danger(message);
              console.log(response);
              return concat(
                observableOf({
                  type: LOADING,
                  payload: {
                    key: 'login',
                    value: false
                  }
                }),
                observableOf({
                  type: ERROR,
                  payload: {
                    key: 'login',
                    value: message
                  }
                })
              );
            })
          )
      )
    )
  );
}

function refreshTokens($action) {
  return $action.ofType(REFRESH_TOKENS).pipe(
    switchMap(({ payload: { success, failure } }) =>
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
            return observableOf(success);
          }),
          catchError(() => {
            console.log('Tokens refresh error');
            return observableOf(failure);
          })
        )
    )
  );
}

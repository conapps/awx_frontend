import { ajax } from 'rxjs/ajax';
import { of as observableOf, concat } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { normalize } from 'normalizr';
import {
  GET_REQUEST,
  POST_REQUEST,
  //  PUT_REQUEST,
  //  DELETE_REQUEST,
  REFRESH_TOKENS,
  LOGOUT,
  LOADING,
  ERROR
} from '../actions.js';
import { API_URL } from '../../constants.js';
import auth from '../../modules/auth.js';

export default combineEpics(getRequest, postRequest);

function postRequest($action) {
  return $action.ofType(POST_REQUEST).pipe(
    switchMap(({ payload }) => {
      const {
        actionTypes: [request, success, failure] = [],
        endpoint,
        refresh,
        uiKey,
        body,
        schema,
        meta
      } = payload;
      return concat(
        observableOf({
          type: request,
          payload: meta
        }),
        observableOf({
          type: LOADING,
          payload: {
            key: uiKey,
            value: true
          }
        }),
        ajax.post(`${API_URL}${endpoint}`, body, headers()).pipe(
          switchMap(({ response }) => {
            return concat(
              observableOf({
                type: success,
                payload: normalize([response], schema)
              }),
              observableOf({
                type: LOADING,
                payload: {
                  key: uiKey,
                  value: false
                }
              })
            );
          }),
          catchError(response => {
            if (response.status === 401 && refresh === undefined) {
              console.log('Unauthorized');
              return tryRefreshingTokens$(payload);
            }

            return concat(
              observableOf({
                type: ERROR,
                payload: {
                  key: uiKey,
                  value: response
                }
              }),
              observableOf({
                type: failure,
                payload: response
              }),
              observableOf({
                type: LOADING,
                payload: {
                  key: uiKey,
                  value: false
                }
              })
            );
          })
        )
      );
    })
  );
}

function getRequest($action) {
  return $action.ofType(GET_REQUEST).pipe(
    switchMap(({ payload }) => {
      const {
        actionTypes: [request, success, failure] = [],
        endpoint,
        refresh,
        uiKey,
        schema,
        meta
      } = payload;
      return concat(
        observableOf({
          type: request,
          payload: meta
        }),
        observableOf({
          type: LOADING,
          payload: {
            key: uiKey,
            value: true
          }
        }),
        ajax.getJSON(`${API_URL}${endpoint}`, headers()).pipe(
          switchMap(({ items = [] }) => {
            return concat(
              observableOf({
                type: success,
                payload: normalize(items, schema)
              }),
              observableOf({
                type: LOADING,
                payload: {
                  key: uiKey,
                  value: false
                }
              })
            );
          }),
          catchError(response => {
            if (response.status === 401 && refresh === undefined) {
              console.log('Unauthorized');
              return tryRefreshingTokens$(payload);
            }

            return concat(
              observableOf({
                type: ERROR,
                payload: {
                  key: uiKey,
                  value: response
                }
              }),
              observableOf({
                type: failure,
                payload: response
              }),
              observableOf({
                type: LOADING,
                payload: {
                  key: uiKey,
                  value: false
                }
              })
            );
          })
        )
      );
    })
  );
}
/** Observables */
function tryRefreshingTokens$(payload) {
  return observableOf({
    type: REFRESH_TOKENS,
    payload: {
      success: {
        ...payload,
        refresh: true
      },
      failure: {
        type: LOGOUT
      }
    }
  });
}

/** Functions */
function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.accessToken}`
  };
}

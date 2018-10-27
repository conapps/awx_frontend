import { ajax } from 'rxjs/ajax';
import { of as observableOf, concat } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { normalize } from 'normalizr';
import {
  GET_REQUEST,
  //  POST_REQUEST,
  //  PUT_REQUEST,
  //  DELETE_REQUEST,
  REFRESH_TOKENS,
  LOGOUT
} from '../actions.js';
import { API_URL } from '../../constants.js';
import auth from '../../modules/auth.js';

export default combineEpics(getRequest);

function getRequest($action) {
  return $action.ofType(GET_REQUEST).pipe(
    switchMap(({ payload }) => {
      const {
        actionTypes: [request, success, failure] = [],
        endpoint,
        refresh,
        schema,
        meta
      } = payload;
      return concat(
        observableOf({
          type: request,
          payload: meta
        }),
        ajax.getJSON(`${API_URL}${endpoint}`, headers()).pipe(
          switchMap(({ items = [] }) => {
            return observableOf({
              type: success,
              payload: normalize(items, schema)
            });
          }),
          catchError(response => {
            if (response.status === 401 && refresh === undefined) {
              console.log('Unauthorized');
              return tryRefreshingTokens$(payload);
            }

            return observableOf({
              type: failure,
              payload: response
            });
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

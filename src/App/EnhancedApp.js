import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { LOGIN, LOGOUT } from '../state/actions.js';
import App from './App.js';

const EnhancedApp = compose(
  connect(
    state => ({
      loading: get(state, 'ui.loading.login', false),
      error: get(state, 'ui.errors.login', undefined),
      isAuthenticated: get(state, 'ui.isAuthenticated', false)
    }),
    {
      onLogin: payload => ({
        type: LOGIN,
        payload
      }),
      onLogout: payload => ({
        type: LOGOUT
      })
    }
  )
)(App);

export default EnhancedApp;

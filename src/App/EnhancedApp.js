import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { LOGIN, LOGOUT, RUN } from '../state/actions.js';
import App from './App.js';

const EnhancedApp = compose(
  withRouter,
  connect(
    state => ({
      loading: get(state, 'ui.loading.login', false),
      error: get(state, 'ui.errors.login', undefined),
      isAuthenticated: get(state, 'ui.isAuthenticated', false),
      isReady: get(state, 'ui.isReady', false)
    }),
    {
      onRun: () => ({
        type: RUN
      }),
      onLogin: payload => ({
        type: LOGIN,
        payload
      }),
      onLogout: payload => ({
        type: LOGOUT
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.onRun();
    }
  })
)(App);

export default EnhancedApp;

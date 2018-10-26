import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import withProps from 'recompose/withProps.js';
import App from './App.js';
import auth from '../modules/auth.js';

const EnhancedApp = compose(
  withHandlers({
    onLogin: () => async credentials => {
      auth.login(credentials);
    }
  }),
  withProps(() => ({
    isAuthenticated: auth.isAuthenticated,
    loginLoading: auth.loading
  }))
)(App);

export default EnhancedApp;

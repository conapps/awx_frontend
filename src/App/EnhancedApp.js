import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import withHandlers from 'recompose/withHandlers.js';
import App from './App.js';
import auth from '../modules/auth.js';

const EnhancedApp = compose(
  withStateHandlers(
    () => ({
      loading: false,
      error: auth.error,
      isAuthenticated: auth.isAuthenticated
    }),
    {
      setState: prevState => nextState => ({
        ...prevState,
        ...nextState
      })
    }
  ),
  withHandlers({
    onLogin: ({ setState }) => async credentials => {
      setState({ loading: true });
      await auth.login(credentials);
      setState({
        loading: false,
        error: auth.error,
        isAuthenticated: auth.isAuthenticated
      });
    }
  })
)(App);

export default EnhancedApp;

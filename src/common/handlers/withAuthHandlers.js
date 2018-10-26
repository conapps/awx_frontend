import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import withAuthState from './withAuthState.js';
import auth from '../../modules/auth.js';

export default withAuthHandlers;

function withAuthHandlers() {
  return compose(
    withAuthState(),
    withHandlers({
      onLogin: ({ setAuthState }) => async credentials => {
        auth.loading = true;
        setAuthState();
        await auth.login(credentials);
        setAuthState();
      },
      onLogout: () => () => {
        auth.logout();
      }
    })
  );
}

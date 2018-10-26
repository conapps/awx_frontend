import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import auth from '../../modules/auth.js';

export default withAuthHandlers;

function withAuthHandlers() {
  return compose(
    withStateHandlers(
      () => ({
        loading: auth.loading,
        error: auth.error,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        idToken: auth.idToken,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken
      }),
      {
        setAuthState: () => () => ({
          loading: auth.loading,
          error: auth.error,
          isAuthenticated: auth.isAuthenticated,
          user: auth.user,
          idToken: auth.idToken,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken
        })
      }
    )
  );
}

import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';

export default withLoadingHandlers;

function withLoadingHandlers() {
  return compose(
    withStateHandlers(
      () => ({
        loading: false
      }),
      {
        setLoadingState: ({ loading }) => () => {
          console.log('loading', !loading);
          return {
            loading: !loading
          };
        }
      }
    )
  );
}

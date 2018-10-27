import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import labs from '../../modules/labs.js';

export default withLabsState;

function withLabsState() {
  return compose(
    withStateHandlers(
      () => ({
        labs: labs.items
      }),
      {
        setLabsState: () => () => {
          console.log(labs.items);
          return {
            labs: labs.items
          };
        }
      }
    )
  );
}

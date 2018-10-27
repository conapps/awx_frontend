import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import labs from '../../modules/labs.js';

window.labs = labs;

export default withLabState;

function withLabState() {
  return compose(
    withStateHandlers(
      () => ({
        lab: labs.current,
        something: '1'
      }),
      {
        setLabState: () => () => {
          console.log({
            lab: labs.current,
            something: 2
          });

          return {
            lab: labs.current,
            something: 2
          };
        }
      }
    )
  );
}

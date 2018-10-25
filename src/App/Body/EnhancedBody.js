import compose from 'recompose/compose.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import Body from './Body.js';

const EnhancedBody = compose(
  withStateHandlers(
    () => ({
      isSideSheetShow: true
    }),
    {
      openSideSheet: () => () => ({
        isSideSheetShow: true
      }),
      closeSideSheet: () => () => ({
        isSideSheetShow: false
      })
    }
  )
)(Body);

EnhancedBody.displayName = 'enhance(Body)';

export default EnhancedBody;

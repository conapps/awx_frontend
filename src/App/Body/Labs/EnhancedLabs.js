import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import lifecycle from 'recompose/lifecycle.js';
import withLoadingHandlers from '../../../common/handlers/withLoadingHandlers.js';
import labs from '../../../modules/labs.js';
import Labs from './Labs.js';

const EnhancedLabs = compose(
  withLoadingHandlers(),
  withStateHandlers(
    () => ({
      labs: labs.items,
      isSideSheetShow: false
    }),
    {
      openSideSheet: () => () => ({
        isSideSheetShow: true
      }),
      closeSideSheet: () => () => ({
        isSideSheetShow: false
      }),
      setLabsState: () => () => ({
        labs: labs.items
      })
    }
  ),
  lifecycle({
    async componentWillMount() {
      this.props.setLoadingState(true);
      await labs.index();
      this.props.setLoadingState(false);
      this.props.setLabsState();
    }
  }),
  withHandlers({
    onSubmit: ({
      closeSideSheet,
      setLoadingState,
      setLabsState
    }) => async lab => {
      setLoadingState(true);
      await labs.create(lab);
      closeSideSheet();
      setLabsState();
      setLoadingState(false);
    }
  })
)(Labs);

EnhancedLabs.displayName = 'enhance(Labs)';

export default EnhancedLabs;

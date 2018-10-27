import compose from 'recompose/compose.js';
import { toaster } from 'evergreen-ui';
import withHandlers from 'recompose/withHandlers.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import lifecycle from 'recompose/lifecycle.js';
import withLoadingHandlers from '../../../common/handlers/withLoadingHandlers.js';
import withLabsState from '../../../common/handlers/withLabsState.js';
import labs from '../../../modules/labs.js';
import emitter from '../../../modules/emitter.js';
import Labs from './Labs.js';

const EnhancedLabs = compose(
  withLoadingHandlers(),
  withLabsState(),
  withStateHandlers(
    () => ({
      isSideSheetShow: false
    }),
    {
      openSideSheet: () => () => ({
        isSideSheetShow: true
      }),
      closeSideSheet: () => () => ({
        isSideSheetShow: false
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      labs.index();
      /** Subscribe to events */
      emitter.on('labs:update', this.props.setLabsState);
      emitter.on(
        'labs:update:start',
        this.props.setLoadingState.bind(this, true)
      );
      emitter.on(
        'labs:update:end',
        this.props.setLoadingState.bind(this, false)
      );
    },

    componentWillUnmount() {
      emitter.off('labs:update:start');
      emitter.off('labs:update');
      emitter.off('labs:update:end');
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
      toaster.success('Laboratorio creado');
    }
  })
)(Labs);

EnhancedLabs.displayName = 'enhance(Labs)';

export default EnhancedLabs;

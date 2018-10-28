import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { toaster } from 'evergreen-ui';
import withHandlers from 'recompose/withHandlers.js';
import lifecycle from 'recompose/lifecycle.js';
import {
  UI,
  GET_REQUEST,
  POST_REQUEST,
  LABS_INDEX_SUCCESS,
  LABS_INDEX_REQUEST,
  LABS_INDEX_FAILURE,
  LABS_CREATE_SUCCESS,
  LABS_CREATE_REQUEST,
  LABS_CREATE_FAILURE
} from '../../../state/actions.js';
import { labs as schema } from '../../../state/schemas.js';
import { getLabs } from '../../../state/reducers/labs.js';
import Labs from './Labs.js';

const EnhancedLabs = compose(
  connect(
    state => ({
      labs: getLabs(state),
      loading: get(state, 'ui.loading.labsIndex', false),
      isSideSheetOpen: get(state, 'ui.labs.isSideSheetOpen', false)
    }),
    {
      index: () => ({
        type: GET_REQUEST,
        payload: {
          endpoint: '/labs/',
          uiKey: 'labsIndex',
          schema,
          actionTypes: [
            LABS_INDEX_REQUEST,
            LABS_INDEX_SUCCESS,
            LABS_INDEX_FAILURE
          ]
        }
      }),
      create: lab => ({
        type: POST_REQUEST,
        payload: {
          endpoint: '/labs/',
          body: lab,
          uiKey: 'labsCreate',
          schema,
          actionTypes: [
            LABS_CREATE_REQUEST,
            LABS_CREATE_SUCCESS,
            LABS_CREATE_FAILURE
          ]
        }
      }),
      openSideSheet: () => ({
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: true
          }
        }
      }),
      clodeSideSheet: () => ({
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: false
          }
        }
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.index();
    }
  }),
  withHandlers({
    onSubmit: ({ create }) => async lab => {
      // TODO
      create(lab);
      toaster.success('Laboratorio creado');
    }
  })
)(Labs);

EnhancedLabs.displayName = 'enhance(Labs)';

export default EnhancedLabs;

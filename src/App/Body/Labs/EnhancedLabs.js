import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { normalize } from 'normalizr';
import withHandlers from 'recompose/withHandlers.js';
import lifecycle from 'recompose/lifecycle.js';
import {
  UI,
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  LABS_INDEX_SUCCESS,
  LABS_INDEX_REQUEST,
  LABS_INDEX_FAILURE,
  LABS_CREATE_SUCCESS,
  LABS_CREATE_REQUEST,
  LABS_CREATE_FAILURE,
  LABS_UPDATE_SUCCESS,
  LABS_UPDATE_REQUEST,
  LABS_UPDATE_FAILURE
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
      updateHeading: () => ({
        type: UI,
        payload: {
          title: 'Laboratorios'
        }
      }),
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
      update: (lab, id) => ({
        type: PUT_REQUEST,
        payload: {
          endpoint: `/labs/${id}/`,
          body: lab,
          uiKey: 'labsUpdate',
          schema,
          actionTypes: [
            LABS_UPDATE_REQUEST,
            LABS_UPDATE_SUCCESS,
            LABS_UPDATE_FAILURE
          ],
          meta: {
            ...normalize([{ id, data: lab }], schema)
          }
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
      closeSideSheet: () => ({
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: false,
            editing: undefined
          }
        }
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.index();
      this.props.updateHeading();
    }
  }),
  withHandlers({
    onSubmit: ({ create, update }) => (lab, id) => {
      if (id === undefined) create(lab);
      else update(lab, id);
    }
  })
)(Labs);

EnhancedLabs.displayName = 'enhance(Labs)';

export default EnhancedLabs;

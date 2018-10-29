import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import { normalize } from 'normalizr';
import get from 'lodash/get.js';
import lifecycle from 'recompose/lifecycle.js';
import withProps from 'recompose/withProps.js';
import {
  UI,
  MULTI,
  GO,
  GET_REQUEST,
  PUT_REQUEST,
  DELETE_REQUEST,
  LABS_SHOW_FAILURE,
  LABS_SHOW_REQUEST,
  LABS_SHOW_SUCCESS,
  LABS_UPDATE_FAILURE,
  LABS_UPDATE_REQUEST,
  LABS_UPDATE_SUCCESS,
  LABS_DELETE_FAILURE,
  LABS_DELETE_REQUEST,
  LABS_DELETE_SUCCESS,
  PARTICIPANTS_INDEX_FAILURE,
  PARTICIPANTS_INDEX_REQUEST,
  PARTICIPANTS_INDEX_SUCCESS
} from '../../../state/actions.js';
import { labs as schema } from '../../../state/schemas.js';
import { participants as participantsSchema } from '../../../state/schemas.js';
import Lab from './Lab.js';

const EnhancedLab = compose(
  withProps(({ match }) => ({
    id: match.params.id
  })),
  connect(
    (state, { id }) => ({
      lab: get(state, `entities.labs.${id}`, undefined),
      labLoading: get(state, 'ui.loading.labsUpdate', false),
      participantsLoading: get(state, 'ui.loading.participantsIndex', false),
      isSideSheetOpen: get(state, 'ui.labs.isSideSheetOpen', false),
      participantId: get(state, `ui.participants.editing`, undefined)
    }),
    {
      editUI: id => ({
        type: UI,
        payload: {
          labs: {
            editing: id
          },
          title: `Laboratorios / ${id}`
        }
      }),
      show: id => ({
        type: GET_REQUEST,
        payload: {
          endpoint: `/labs/${id}/`,
          uiKey: 'labsShow',
          schema,
          actionTypes: [LABS_SHOW_REQUEST, LABS_SHOW_SUCCESS, LABS_SHOW_FAILURE]
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
      indexParticipants: labId => ({
        type: GET_REQUEST,
        payload: {
          endpoint: `/participants/?filterBy=labId&filterValue=${labId}&limit=100`,
          uiKey: 'participantsIndex',
          schema: participantsSchema,
          actionTypes: [
            PARTICIPANTS_INDEX_REQUEST,
            PARTICIPANTS_INDEX_SUCCESS,
            PARTICIPANTS_INDEX_FAILURE
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
      closeSideSheet: () => ({
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: false
          }
        }
      }),
      openParticipantSideSheet: () => ({
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: true
          }
        }
      }),
      showLabDeleteDialog: () => ({
        type: UI,
        payload: {
          labs: {
            isLabDeleteDialogOpen: true
          }
        }
      }),
      closeLabDeleteDialog: () => ({
        type: UI,
        payload: {
          labs: {
            isLabDeleteDialogOpen: false
          }
        }
      }),
      onDelete: id => ({
        type: MULTI,
        payload: [
          {
            type: GO,
            payload: '/'
          },
          {
            type: DELETE_REQUEST,
            payload: {
              endpoint: `/labs/${id}/`,
              uiKey: 'labsDelete',
              meta: {
                id
              },
              actionTypes: [
                LABS_DELETE_REQUEST,
                LABS_DELETE_SUCCESS,
                LABS_DELETE_FAILURE
              ]
            }
          }
        ]
      })
    }
  ),
  withHandlers({
    onSubmit: ({ update, id }) => lab => {
      update(lab, id);
    },
    onDelete: ({ onDelete, id }) => () => onDelete(id),
    onParticipantsIndex: ({ indexParticipants, id }) => () =>
      indexParticipants(id)
  }),
  lifecycle({
    componentDidMount() {
      this.props.show(this.props.id);
      this.props.editUI(this.props.id);
      this.props.indexParticipants(this.props.id);
    }
  })
)(Lab);

EnhancedLab.displayName = 'enhance(Lab)';

export default EnhancedLab;

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
  POST_REQUEST,
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
  PARTICIPANTS_CREATE_FAILURE,
  PARTICIPANTS_CREATE_REQUEST,
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_UPDATE_FAILURE,
  PARTICIPANTS_UPDATE_REQUEST,
  PARTICIPANTS_UPDATE_SUCCESS,
  PARTICIPANTS_DELETE_FAILURE,
  PARTICIPANTS_DELETE_REQUEST,
  PARTICIPANTS_DELETE_SUCCESS
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
      isSideSheetOpen: get(state, 'ui.labs.isSideSheetOpen', false),
      isParticipantSideSheetOpen: get(
        state,
        'ui.participants.isSideSheetOpen',
        false
      )
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
      createParticipant: participants => ({
        type: POST_REQUEST,
        payload: {
          endpoint: '/participants/',
          body: participants,
          uiKey: 'participantsCreate',
          schema,
          actionTypes: [
            PARTICIPANTS_CREATE_REQUEST,
            PARTICIPANTS_CREATE_SUCCESS,
            PARTICIPANTS_CREATE_FAILURE
          ]
        }
      }),
      updateParticipant: (lab, id) => ({
        type: PUT_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          body: lab,
          uiKey: 'participantsUpdate',
          schema,
          actionTypes: [
            PARTICIPANTS_UPDATE_REQUEST,
            PARTICIPANTS_UPDATE_SUCCESS,
            PARTICIPANTS_UPDATE_FAILURE
          ],
          meta: {
            ...normalize([{ id, data: lab }], participantsSchema)
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
      openParticipantSideSheet: () => ({
        type: UI,
        payload: {
          participants: {
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
      closeParticipantSideSheet: () => ({
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: false
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
      showParticipantLabDeleteDialog: () => ({
        type: UI,
        payload: {
          participants: {
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
      closeParticipantsLabDeleteDialog: () => ({
        type: UI,
        payload: {
          participants: {
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
      }),
      onParticipantDelete: id => ({
        type: DELETE_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          uiKey: 'participantsDelete',
          meta: {
            id
          },
          actionTypes: [
            PARTICIPANTS_DELETE_REQUEST,
            PARTICIPANTS_DELETE_SUCCESS,
            PARTICIPANTS_DELETE_FAILURE
          ]
        }
      })
    }
  ),
  withHandlers({
    onSubmit: ({ update, id }) => lab => {
      update(lab, id);
    },
    onParticipantSubmit: ({ createParticipant, updateParticipant }) => (
      participant,
      id
    ) => {
      if (id === undefined) createParticipant(participant);
      else updateParticipant(participant, id);
    },
    onDelete: ({ onDelete, id }) => () => onDelete(id),
    onParticipantDelete: ({ onParticipantDelete }) => id =>
      onParticipantDelete(id)
  }),
  lifecycle({
    componentDidMount() {
      this.props.show(this.props.id);
      this.props.editUI(this.props.id);
    }
  })
)(Lab);

EnhancedLab.displayName = 'enhance(Lab)';

export default EnhancedLab;

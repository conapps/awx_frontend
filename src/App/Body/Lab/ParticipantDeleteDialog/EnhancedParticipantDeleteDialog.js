import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import {
  UI,
  MULTI,
  DELETE_REQUEST,
  PARTICIPANTS_DELETE_REQUEST,
  PARTICIPANTS_DELETE_SUCCESS,
  PARTICIPANTS_DELETE_FAILURE
} from '../../../../state/actions.js';
import ParticipantDeleteDialog from './ParticipantDeleteDialog.js';

const EnhancedParticipantDeleteDialog = compose(
  connect(
    state => ({
      id: get(state, 'ui.participants.deleting', undefined),
      isShown: get(state, 'ui.participants.isDeleteDialogOpen', false)
    }),
    {
      close: () => ({
        type: UI,
        payload: {
          participants: {
            isDeleteDialogOpen: false,
            deleting: undefined
          }
        }
      }),
      onDelete: id => ({
        type: MULTI,
        payload: [
          {
            type: UI,
            payload: {
              participants: {
                isDeleteDialogOpen: false,
                deleting: undefined
              }
            }
          },
          {
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
          }
        ]
      })
    }
  ),
  withHandlers({
    onDelete: ({ onDelete, id }) => () => onDelete(id)
  })
)(ParticipantDeleteDialog);

EnhancedParticipantDeleteDialog.displayName =
  'enhance(ParticipantDeleteDialog)';
export default EnhancedParticipantDeleteDialog;

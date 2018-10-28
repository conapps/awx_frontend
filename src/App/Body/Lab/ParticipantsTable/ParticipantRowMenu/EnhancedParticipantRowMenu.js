import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import {
  DELETE_REQUEST,
  PARTICIPANTS_DELETE_FAILURE,
  PARTICIPANTS_DELETE_REQUEST,
  PARTICIPANTS_DELETE_SUCCESS,
  UI
} from '../../../../../state/actions.js';
import ParticipantRowMenu from './ParticipantRowMenu.js';

const EnhancedParticipantRowMenu = compose(
  connect(
    () => ({}),
    {
      showParticipantDeleteDialog: () => ({
        type: UI,
        payload: {
          participants: {
            isParticipantDeleteDialogOpen: true
          }
        }
      }),
      closeParticipantDeleteDialog: () => ({
        type: UI,
        payload: {
          participants: {
            isParticipantDeleteDialogOpen: false
          }
        }
      }),
      onEdit: id => ({
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: true,
            editing: id
          }
        }
      }),
      onDelete: id => ({
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
    onEdit: ({ onEdit, id }) => () => onEdit(id),
    onDelete: ({ onDelete, id }) => () => onDelete(id)
  })
)(ParticipantRowMenu);

EnhancedParticipantRowMenu.displayName = 'enhance(ParticipantRowMenu)';

export default EnhancedParticipantRowMenu;

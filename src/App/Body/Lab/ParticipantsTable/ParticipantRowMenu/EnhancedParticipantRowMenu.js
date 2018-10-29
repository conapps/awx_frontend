import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import {
  DELETE_REQUEST,
  PARTICIPANTS_DELETE_FAILURE,
  PARTICIPANTS_DELETE_REQUEST,
  PARTICIPANTS_DELETE_SUCCESS,
  UI,
  MULTI
} from '../../../../../state/actions.js';
import ParticipantRowMenu from './ParticipantRowMenu.js';

const EnhancedParticipantRowMenu = compose(
  connect(
    () => ({}),
    {
      openDeleteDialog: id => ({
        type: UI,
        payload: {
          participants: {
            isDeleteDialogOpen: true,
            deleting: id
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
      })
    }
  ),
  withHandlers({
    onEdit: ({ onEdit, id }) => () => onEdit(id),
    openDeleteDialog: ({ openDeleteDialog, id }) => () => openDeleteDialog(id)
  })
)(ParticipantRowMenu);

EnhancedParticipantRowMenu.displayName = 'enhance(ParticipantRowMenu)';

export default EnhancedParticipantRowMenu;

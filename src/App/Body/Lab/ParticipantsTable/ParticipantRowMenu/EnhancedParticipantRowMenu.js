import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import { UI } from '../../../../../state/actions.js';
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

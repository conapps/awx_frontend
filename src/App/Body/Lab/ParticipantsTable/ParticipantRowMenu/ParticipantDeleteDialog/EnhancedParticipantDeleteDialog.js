import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import ParticipantDeleteDialog from './ParticipantDeleteDialog.js';

const EnhancedParticipantDeleteDialog = compose(
  connect(
    state => ({
      isShown: get(
        state,
        'ui.participants.isParticipantDeleteDialogOpen',
        false
      )
    }),
    {}
  )
)(ParticipantDeleteDialog);

EnhancedParticipantDeleteDialog.displayName =
  'enhance(ParticipantDeleteDialog)';
export default EnhancedParticipantDeleteDialog;

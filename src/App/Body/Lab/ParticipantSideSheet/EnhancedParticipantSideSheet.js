import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { UI } from '../../../../state/actions.js';
import ParticipantSideSheet from './ParticipantSideSheet.js';

const EnhancedParticipantSideSheet = compose(
  connect(
    state => ({
      isShown: get(state, 'ui.participants.isSideSheetOpen', false)
    }),
    {
      close: () => ({
        type: UI,
        payload: {
          participants: {
            isSideSheetOpen: false,
            editing: undefined
          }
        }
      })
    }
  )
)(ParticipantSideSheet);

EnhancedParticipantSideSheet.displayName = 'enhance(ParticipantSideSheet)';
export default EnhancedParticipantSideSheet;

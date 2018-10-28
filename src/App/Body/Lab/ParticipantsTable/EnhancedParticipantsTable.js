import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import ParticipantsTable from './ParticipantsTable.js';
import { getParticipants } from '../../../../state/reducers/participants.js';

const EnhancedParticipantsTable = compose(
  connect(
    () => ({
      participants: getParticipants()
    }),
    {}
  )
)(ParticipantsTable);

EnhancedParticipantsTable.displayName = 'enhance(ParticipantsTable)';
export default EnhancedParticipantsTable;

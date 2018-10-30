import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import ParticipantInformation from './ParticipantInformation.js';

const EnhancedParticipantInformation = compose(
  connect(
    state => {
      const id = get(state, 'ui.participants.editing');
      return {
        participant: get(state, `entities.participants.${id}`)
      };
    },
    {}
  )
)(ParticipantInformation);

EnhancedParticipantInformation.displayName = 'enhance(ParticipantInformation)';
export default EnhancedParticipantInformation;

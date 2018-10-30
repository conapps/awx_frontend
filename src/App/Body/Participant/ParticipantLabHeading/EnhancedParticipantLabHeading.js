import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import ParticipantLabHeading from './ParticipantLabHeading.js';

const EnhancedParticipantLabHeading = compose(
  connect(
    state => {
      const id = get(state, 'ui.labs.editing');
      return {
        lab: get(state, `entities.labs.${id}`, {})
      };
    },
    {}
  )
)(ParticipantLabHeading);

EnhancedParticipantLabHeading.displayName = 'enhance(ParticipantLabHeading)';
export default EnhancedParticipantLabHeading;

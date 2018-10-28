import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import withFormHandlers from '../../../../../common/handlers/withFormHandlers.js';
import ParticipantForm from './ParticipantForm.js';

const EnhancedParticipantForm = compose(
  connect(
    state => {
      const id = get(state, 'ui.participants.editing', undefined);
      const form = get(state, `entities.participants.${id}.data`, undefined);
      const loadingParticipantsCreate = get(
        state,
        'ui.loading.participantsCreate',
        false
      );
      const loadingParticipantsUpdate = get(
        state,
        'ui.loading.participantsUpdate',
        false
      );
      return {
        id,
        form,
        loading: loadingParticipantsCreate || loadingParticipantsUpdate
      };
    },
    {}
  ),
  withHandlers({
    onSubmit: ({ onSubmit, id }) => participant => onSubmit(participant, id)
  }),
  withFormHandlers({
    name: '',
    email: '',
    company: '',
    awsRegion: '',
    pod: '',
    status: ''
  })
)(ParticipantForm);

EnhancedParticipantForm.displayName = 'enhanced(ParticipantForm)';
export default EnhancedParticipantForm;

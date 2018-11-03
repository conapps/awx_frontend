import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers.js';
import ParticipantInformation from './ParticipantInformation.js';
import { getActiveLab } from '../../../../state/reducers/labs.js';
import { getActiveParticipant } from '../../../../state/reducers/participants.js';
import { getActiveJob } from '../../../../state/reducers/jobs.js';
import { UI } from '../../../../state/actions.js';

const EnhancedParticipantInformation = compose(
  connect(
    state => {
      const participant = getActiveParticipant(state);
      const lab = getActiveLab(state);
      const job = getActiveJob(state);
      let buttonLabel = 'Iniciar';
      let buttonIntent = 'success';

      if (lab.data.runPlaybook === job.data.name) {
        buttonLabel = 'Detener';
        buttonIntent = 'danger';
      }

      return {
        participant,
        buttonLabel,
        buttonIntent,
        loading:
          participant.data.status === 'pending' ||
          participant.data.status === 'running'
      };
    },
    {
      openPodUpDialog: () => ({
        type: UI,
        payload: {
          participants: {
            isPodUpDialogOpen: true
          }
        }
      }),
      openPodDownDialog: () => ({
        type: UI,
        payload: {
          participants: {
            isPodDownDialogOpen: true
          }
        }
      })
    }
  ),
  withHandlers({
    onAction: ({ buttonIntent, openPodDownDialog, openPodUpDialog }) => () =>
      buttonIntent === 'danger' ? openPodDownDialog() : openPodUpDialog()
  })
)(ParticipantInformation);

EnhancedParticipantInformation.displayName = 'enhance(ParticipantInformation)';
export default EnhancedParticipantInformation;

import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
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
      const loading =
        participant.data.status === 'pending' ||
        participant.data.status === 'running';
      let buttonLabel = 'Iniciar';
      let buttonIntent = 'success';

      if (lab.data.runPlaybook === participant.data.lastPlaybook) {
        buttonLabel = 'Destruir';
        buttonIntent = 'danger';
      }

      if (job.data.status === 'failed') {
        buttonLabel = 'Destruir';
        buttonIntent = 'danger';
      }

      if (loading === true) buttonLabel = '...';

      return {
        lastPlaybook: get(participant, 'data.lastPlaybook', ''),
        participant,
        buttonLabel,
        buttonIntent,
        loading,
        job
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

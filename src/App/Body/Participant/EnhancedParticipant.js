import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import Participant from './Participant.js';
import {
  UI,
  GET_REQUEST,
  PARTICIPANTS_SHOW_REQUEST,
  PARTICIPANTS_SHOW_FAILURE,
  PARTICIPANTS_SHOW_SUCCESS
} from '../../../state/actions.js';
import { participants as schema } from '../../../state/schemas.js';

const EnhancedParticipant = compose(
  connect(
    (state, props) => {
      const id = get(props, 'match.params.id');
      const participant = get(state, `entities.participants.${id}`);
      const labId = get(participant, 'data.labId');
      const jobId = get(participant, 'data.jobId');
      const lab = get(state, `entities.labs.${labId}`);
      let job;

      let isReady = participant !== undefined && lab !== undefined;

      if (jobId !== undefined) {
        job = get(state, `entities.jobs.${jobId}`);
        isReady = isReady && job !== undefined;
      }

      return {
        id,
        isReady,
        labId,
        jobId,
        activeTab: get(state, 'ui.participants.activeTab', 'Stdout')
      };
    },
    {
      onSelectTab: tab => ({
        type: UI,
        payload: {
          participants: {
            activeTab: tab
          }
        }
      }),
      editUi: ({ id, jobId, labId }) => ({
        type: UI,
        payload: {
          jobs: {
            stdout: '',
            editing: jobId
          },
          labs: {
            editing: labId
          },
          participants: {
            editing: id
          },
          title: `Participantes / ${id}`
        }
      }),
      getParticipant: ({ id }) => ({
        type: GET_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          uiKey: 'participantsShow',
          schema,
          actionTypes: [
            PARTICIPANTS_SHOW_REQUEST,
            PARTICIPANTS_SHOW_SUCCESS,
            PARTICIPANTS_SHOW_FAILURE
          ],
          meta: {
            deep: true
          }
        }
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.editUi(this.props);
      this.props.getParticipant(this.props);
    }
  })
)(Participant);

EnhancedParticipant.displayName = 'enhance(Participant)';
export default EnhancedParticipant;

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
      const lab = get(state, `entities.labs.${labId}`);

      return {
        id,
        isReady: !!participant && !!lab
      };
    },
    {
      editUi: id => ({
        type: UI,
        payload: {
          jobs: {
            stdout: ''
          },
          participants: {
            editing: id
          },
          title: `Participantes / ${id}`
        }
      }),
      getParticipant: id => ({
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
      this.props.editUi(this.props.id);
      this.props.getParticipant(this.props.id);
    }
  })
)(Participant);

EnhancedParticipant.displayName = 'enhance(Participant)';
export default EnhancedParticipant;

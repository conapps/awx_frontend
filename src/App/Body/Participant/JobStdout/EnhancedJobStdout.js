import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import JobStdout from './JobStdout.js';
import {
  GET_REQUEST,
  JOBS_STDOUT_REQUEST,
  JOBS_STDOUT_SUCCESS,
  JOBS_STDOUT_FAILURE,
  JOBS_STDOUT_TRACK
} from '../../../../state/actions.js';

const EnhancedJobStdout = compose(
  connect(
    state => ({
      id: get(state, 'ui.jobs.editing'),
      body: get(state, 'ui.jobs.stdout', ''),
      followStdout: get(state, 'ui.jobs.stdoutTrack', false)
    }),
    {
      onStdoutTrack: e => ({
        type: JOBS_STDOUT_TRACK,
        payload: e.target.checked
      }),
      getStdout: id => ({
        type: GET_REQUEST,
        payload: {
          endpoint: `/jobs/stdout/${id}/`,
          uiKey: 'jobsStdout',
          actionTypes: [
            JOBS_STDOUT_REQUEST,
            JOBS_STDOUT_SUCCESS,
            JOBS_STDOUT_FAILURE
          ]
        }
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.getStdout(this.props.id);
    }
  })
)(JobStdout);

EnhancedJobStdout.displayName = 'enhance(JobStdout)';
export default EnhancedJobStdout;

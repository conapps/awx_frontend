import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import {
  UI,
  MULTI,
  POST_REQUEST,
  JOBS_LAUNCH_REQUEST,
  JOBS_LAUNCH_SUCCESS,
  JOBS_LAUNCH_FAILURE
} from '../../../state/actions.js';
import { jobs as schema } from '../../../state/schemas.js';
import PodUpDialog from './PodUpDialog.js';

const EnhancedPodUpDialog = compose(
  connect(
    state => {
      const labId = get(state, 'ui.labs.editing', undefined);
      const runPlaybook = get(
        state,
        `entities.labs.${labId}.data.runPlaybook`,
        undefined
      );
      const id = get(state, 'ui.participants.editing', undefined);
      const isShown = get(state, 'ui.participants.isPodUpDialogOpen', false);
      const participant = get(state, `entities.participants.${id}`, undefined);

      return {
        id,
        runPlaybook,
        isShown,
        participant
      };
    },
    {
      close: () => ({
        type: UI,
        payload: {
          participants: {
            isPodUpDialogOpen: false
          }
        }
      }),
      onPodUp: (runPlaybook, { id, data: { email, awsRegion, pod } }) => ({
        type: MULTI,
        payload: [
          {
            type: UI,
            payload: {
              participants: {
                isPodUpDialogOpen: false
              }
            }
          },
          {
            type: POST_REQUEST,
            payload: {
              endpoint: `/jobs/launch/${runPlaybook}/`,
              uiKey: `podUpFor__${id}`,
              body: {
                to_email: email,
                aws_region: awsRegion,
                lab_pod: +pod
              },
              meta: {
                id: id,
                status: 'UP'
              },
              schema,
              actionTypes: [
                JOBS_LAUNCH_REQUEST,
                JOBS_LAUNCH_SUCCESS,
                JOBS_LAUNCH_FAILURE
              ]
            }
          }
        ]
      })
    }
  ),
  withHandlers({
    onPodUp: ({ onPodUp, runPlaybook, participant }) => () =>
      onPodUp(runPlaybook, participant)
  })
)(PodUpDialog);

EnhancedPodUpDialog.displayName = 'enhance(PodUpDialog)';
export default EnhancedPodUpDialog;

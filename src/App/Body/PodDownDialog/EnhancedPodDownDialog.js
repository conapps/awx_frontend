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
import PodDownDialog from './PodDownDialog.js';

const EnhancedPodDownDialog = compose(
  connect(
    state => {
      const labId = get(state, 'ui.labs.editing', undefined);
      const endPlaybook = get(
        state,
        `entities.labs.${labId}.data.endPlaybook`,
        undefined
      );
      const id = get(state, 'ui.participants.editing', undefined);
      const isShown = get(state, 'ui.participants.isPodDownDialogOpen', false);
      const participant = get(state, `entities.participants.${id}`, undefined);

      return {
        id,
        endPlaybook,
        isShown,
        participant
      };
    },
    {
      close: () => ({
        type: UI,
        payload: {
          participants: {
            isPodDownDialogOpen: false
          }
        }
      }),
      onPodDown: (endPlaybook, { id, data: { email, awsRegion, pod } }) => ({
        type: MULTI,
        payload: [
          {
            type: UI,
            payload: {
              participants: {
                isPodDownDialogOpen: false
              }
            }
          },
          {
            type: POST_REQUEST,
            payload: {
              endpoint: `/jobs/launch/${endPlaybook}/`,
              uiKey: `podUpFor__${id}`,
              body: {
                to_email: email,
                aws_region: awsRegion,
                lab_pod: +pod
              },
              meta: {
                id: id,
                status: 'DOWN'
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
    onPodDown: ({ onPodDown, endPlaybook, participant }) => () =>
      onPodDown(endPlaybook, participant)
  })
)(PodDownDialog);

EnhancedPodDownDialog.displayName = 'enhance(PodDownDialog)';
export default EnhancedPodDownDialog;

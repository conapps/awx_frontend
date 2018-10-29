import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import { normalize } from 'normalizr';
import get from 'lodash/get.js';
import withFormHandlers from '../../../../../common/handlers/withFormHandlers.js';
import {
  PUT_REQUEST,
  POST_REQUEST,
  PARTICIPANTS_CREATE_FAILURE,
  PARTICIPANTS_CREATE_REQUEST,
  PARTICIPANTS_CREATE_SUCCESS,
  PARTICIPANTS_UPDATE_FAILURE,
  PARTICIPANTS_UPDATE_REQUEST,
  PARTICIPANTS_UPDATE_SUCCESS
} from '../../../../../state/actions.js';
import { participants as schema } from '../../../../../state/schemas.js';

import ParticipantForm from './ParticipantForm.js';

const EnhancedParticipantForm = compose(
  connect(
    state => {
      const id = get(state, 'ui.participants.editing', undefined);
      const labId = get(state, 'ui.labs.editing', undefined);
      const form = get(state, `entities.participants.${id}.data`, undefined);
      const onCreateLoading = get(
        state,
        'ui.loading.participantsCreate',
        false
      );
      const onUpdateLoading = get(
        state,
        'ui.loading.participantsUpdate',
        false
      );
      return {
        id,
        labId,
        form,
        loading: onCreateLoading || onUpdateLoading
      };
    },
    {
      onCreate: participants => ({
        type: POST_REQUEST,
        payload: {
          endpoint: '/participants/',
          body: participants,
          uiKey: 'participantsCreate',
          schema,
          actionTypes: [
            PARTICIPANTS_CREATE_REQUEST,
            PARTICIPANTS_CREATE_SUCCESS,
            PARTICIPANTS_CREATE_FAILURE
          ]
        }
      }),
      onUpdate: (lab, id) => ({
        type: PUT_REQUEST,
        payload: {
          endpoint: `/participants/${id}/`,
          body: lab,
          uiKey: 'participantsUpdate',
          schema,
          actionTypes: [
            PARTICIPANTS_UPDATE_REQUEST,
            PARTICIPANTS_UPDATE_SUCCESS,
            PARTICIPANTS_UPDATE_FAILURE
          ],
          meta: {
            ...normalize([{ id, data: lab }], schema)
          }
        }
      })
    }
  ),
  withHandlers({
    onSubmit: ({ onUpdate, onCreate, id, labId }) => participant => {
      if (id === undefined) onCreate({ ...participant, labId: labId });
      else onUpdate(participant, id);
    }
  }),
  withFormHandlers({
    name: '',
    email: '',
    company: '',
    awsRegion: 'us-east-1',
    pod: '',
    status: ''
  })
)(ParticipantForm);

EnhancedParticipantForm.displayName = 'enhanced(ParticipantForm)';
export default EnhancedParticipantForm;

import React, { Fragment } from 'react';
import { Pane, Spinner } from 'evergreen-ui';
import ParticipantLabHeading from './ParticipantLabHeading/EnhancedParticipantLabHeading.js';
import ParticipantInformation from './ParticipantInformation/EnhancedParticipantInformation.js';
import JobStdout from './JobStdout/EnhancedJobStdout.js';

export default Participant;

function Participant({ isReady }) {
  if (isReady === false)
    return (
      <Pane width="100%" display="flex" justifyContent="center">
        <Spinner />
      </Pane>
    );

  return (
    <Fragment>
      <ParticipantLabHeading />
      <Pane width="100%" display="flex">
        <ParticipantInformation />
        <JobStdout />
      </Pane>
    </Fragment>
  );
}

import React from 'react';
import { Pane, TextInputField, FormField } from 'evergreen-ui';
import StatusBadge from '../../StatusBadge/StatusBadge.js';

export default ParticipantInformation;

function ParticipantInformation({ participant }) {
  return (
    <Pane flex={1} minWidth={300} paddingRight={8}>
      <FormField
        marginBottom={24}
        label="Estado"
        isRequired={true}
        hint="Estado del último comando del Pod"
      >
        <StatusBadge value={participant.data.status} />
      </FormField>
      <TextInputField
        label="AWS Region"
        type="text"
        value={participant.data.awsRegion}
        readOnly={true}
      />
      <TextInputField
        label="Pod"
        type="number"
        min={1}
        max={99}
        readOnly={true}
        value={participant.data.pod}
      />
      <TextInputField
        label="Último Playbook"
        type="text"
        value={participant.data.awsRegion}
        readOnly={true}
      />
      <TextInputField
        label="Última Actualización"
        type="text"
        value={participant.updated}
        readOnly={true}
      />
    </Pane>
  );
}

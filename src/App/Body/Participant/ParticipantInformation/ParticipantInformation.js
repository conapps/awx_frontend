import React from 'react';
import get from 'lodash/get.js';
import { Pane, TextInputField, FormField, Button } from 'evergreen-ui';
import StatusBadge from '../../StatusBadge/EnhancedStatusBadge.js';

export default ParticipantInformation;

function ParticipantInformation({
  participant,
  buttonLabel,
  buttonIntent,
  onAction,
  lastPlaybook,
  loading,
  job
}) {
  return (
    <Pane flex={1} minWidth={300} paddingRight={8}>
      <Pane display="flex" justifyContent="space-between" alignItems="center">
        <FormField
          marginBottom={24}
          label="Estado"
          isRequired={true}
          hint="Estado del último comando del Pod"
        >
          <StatusBadge
            playbook={get(job, 'data.name', '')}
            value={participant.data.status}
          />
        </FormField>
        <Button
          appearance="primary"
          intent={buttonIntent}
          onClick={onAction}
          disabled={loading}
          isLoading={loading}
        >
          {buttonLabel}
        </Button>
      </Pane>
      <TextInputField
        label="Participante"
        type="text"
        value={participant.data.name}
        readOnly={true}
      />
      <TextInputField
        label="Último Playbook"
        type="text"
        value={lastPlaybook}
        readOnly={true}
      />
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

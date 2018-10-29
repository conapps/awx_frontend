import React from 'react';
import { SideSheet, Pane, Heading } from 'evergreen-ui';
import ParticipantForm from './ParticipantForm/EnhancedParticipantForm.js';

export default ParticipantSideSheet;

function ParticipantSideSheet({ isShown, close }) {
  return (
    <SideSheet isShown={isShown} onCloseComplete={close}>
      <Pane padding={16}>
        <Heading size={600} marginBottom={16}>
          Participante
        </Heading>
        <ParticipantForm />
      </Pane>
    </SideSheet>
  );
}

import React from 'react';
import { SideSheet, Pane, Heading } from 'evergreen-ui';
import LabForm from './LabForm/EnhancedLabForm.js';

export default LabSidebar;

function LabSidebar({ isShown, close, onSubmit }) {
  return (
    <SideSheet isShown={isShown} onCloseComplete={close}>
      <Pane padding={16}>
        <Heading size={600} marginBottom={16}>
          Nuevo Laboratorio
        </Heading>
        <LabForm onSubmit={onSubmit} />
      </Pane>
    </SideSheet>
  );
}

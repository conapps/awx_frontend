import React from 'react';
import { SideSheet, Pane, Heading } from 'evergreen-ui';
import LabForm from './LabForm/EnhancedLabForm.js';

export default LabSidebar;

function LabSidebar({ isShown, close }) {
  return (
    <SideSheet isShown={isShown} onCloseComplete={close}>
      <Pane padding={16}>
        <Heading size={600} marginBottom={16}>
          Nuevo Laboratorio
        </Heading>
        <LabForm
          onSubmit={form => {
            console.log(form);
          }}
        />
      </Pane>
    </SideSheet>
  );
}

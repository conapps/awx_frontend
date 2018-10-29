import React from 'react';
import { Dialog, Heading } from 'evergreen-ui';

export default LabDeleteDialog;

function LabDeleteDialog({ isShown, close, onDelete }) {
  return (
    <Dialog
      isShown={isShown}
      title="Atención"
      intent="danger"
      onCloseComplete={close}
      onConfirm={onDelete}
      onCancel={close}
      confirmLabel="Si, quiero eliminar el Laboratorio"
    >
      <Heading>¿Esta seguro que desea eliminar este laboratorio?</Heading>
    </Dialog>
  );
}

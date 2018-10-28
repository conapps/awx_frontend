import React from 'react';
import { Dialog, Heading } from 'evergreen-ui';

export default ParticipantDeleteDialog;

function ParticipantDeleteDialog({ isShown, close, onDelete }) {
  return (
    <Dialog
      isShown={isShown}
      title="Atención"
      intent="danger"
      onCloseComplete={close}
      onConfirm={onDelete}
      confirmParticipantel="Si, quiero eliminar al Participante"
    >
      <Heading>¿Esta seguro que desea eliminar a este Participante?</Heading>
    </Dialog>
  );
}

import React from 'react';
import { Dialog, Heading } from 'evergreen-ui';

export default PodDownDialog;

function PodDownDialog({ isShown, close, onPodDown }) {
  return (
    <Dialog
      isShown={isShown}
      title="Destruir Pod"
      intent="danger"
      onConfirm={onPodDown}
      onCancel={close}
      confirmLabel="Si, quiero destruir este pod"
    >
      <Heading>¿Esta seguro que desea destruir este Pod?</Heading>
    </Dialog>
  );
}

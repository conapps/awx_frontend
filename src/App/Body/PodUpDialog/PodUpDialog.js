import React from 'react';
import { Dialog, Heading } from 'evergreen-ui';

export default PodUpDialog;

function PodUpDialog({ isShown, close, onPodUp }) {
  return (
    <Dialog
      isShown={isShown}
      title="Levantar Pod"
      intent="none"
      onConfirm={onPodUp}
      onCancel={close}
      confirmLabel="Si, quiero levantar este pod"
    >
      <Heading>¿Esta seguro que desea levantar este Pod?</Heading>
    </Dialog>
  );
}

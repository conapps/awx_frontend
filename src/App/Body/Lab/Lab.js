import React, { Fragment } from 'react';
import { Heading, Pane, Menu, Spinner, Button } from 'evergreen-ui';
import HorizontalTextInputField from './HorizontalTextInputField/HorizontalTextInputField.js';
import LabSideSheet from '../LabSideSheet/LabSideSheet.js';
import LabDeleteDialog from '../LabDeleteDialog/EnhancedLabDeleteDialog.js';
import ParticipantsTable from './ParticipantsTable/EnhancedParticipantsTable.js';
import ParticipantSideSheet from './ParticipantSideSheet/EnhancedParticipantSideSheet.js';
import ParticipantDeleteDialog from './ParticipantDeleteDialog/EnhancedParticipantDeleteDialog.js';
import PodUpDialog from '../PodUpDialog/EnhancedPodUpDialog.js';
import PodDownDialog from '../PodDownDialog/EnhancedPodDownDialog.js';

export default Lab;

function Lab({
  closeLabDeleteDialog,
  closeSideSheet,
  isSideSheetOpen,
  onParticipantsIndex,
  participantsLoading,
  lab,
  onDelete,
  onSubmit,
  openSideSheet,
  openParticipantSideSheet,
  showLabDeleteDialog
}) {
  if (lab === undefined)
    return (
      <Pane width="100%" display="flex" justifyContent="center">
        <Spinner />
      </Pane>
    );

  return (
    <Fragment>
      <LabSideSheet
        isShown={isSideSheetOpen}
        close={closeSideSheet}
        onSubmit={onSubmit}
      />
      <ParticipantSideSheet />
      <LabDeleteDialog onDelete={onDelete} close={closeLabDeleteDialog} />
      <ParticipantDeleteDialog />
      <PodUpDialog />
      <PodDownDialog />
      <Pane elevation={1} width="100%" display="flex">
        <Pane width="100%" padding={16} flex={4} alignItems="center">
          <HorizontalTextInputField
            label="Nombre"
            readOnly
            value={lab.data.name}
            marginBottom={8}
          />
          <HorizontalTextInputField
            label="Fecha de Inicio"
            type="date"
            readOnly
            marginBottom={8}
            value={lab.data.startDate}
          />
          <HorizontalTextInputField
            label="Run Playbook"
            type="text"
            readOnly
            value={lab.data.runPlaybook}
          />
        </Pane>
        <Pane width="100%" padding={16} flex={4}>
          <HorizontalTextInputField
            label="URL de Diagrama"
            readOnly
            value={lab.data.diagramURL}
            marginBottom={8}
          />
          <HorizontalTextInputField
            label="Fecha de Finalización"
            type="date"
            readOnly
            marginBottom={8}
            value={lab.data.endDate}
          />
          <HorizontalTextInputField
            label="End Playbook"
            type="text"
            readOnly
            value={lab.data.endPlaybook}
          />
        </Pane>
        <Pane padding={16} flex={1}>
          <Menu>
            <Menu.Group>
              <Menu.Item icon="edit" onClick={openSideSheet}>
                Editar
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item
                icon="ban-circle"
                color="danger"
                intent="danger"
                onClick={showLabDeleteDialog}
              >
                Eliminar
              </Menu.Item>
            </Menu.Group>
          </Menu>
        </Pane>
      </Pane>
      <Pane display="flex" marginTop={16} marginBottom={16}>
        <Pane flex={3} alignItems="center" display="flex">
          <Heading>Participantes</Heading>
        </Pane>
        <Pane
          flex={2}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            onClick={onParticipantsIndex}
            isLoading={participantsLoading}
            marginRight={16}
          >
            Actualizar
          </Button>
          <Button
            intent="success"
            iconBefore="plus"
            onClick={openParticipantSideSheet}
          >
            Nuevo Participante
          </Button>
        </Pane>
      </Pane>
      <Pane display="flex" justifyContent="space-between" width="100%">
        <ParticipantsTable />
      </Pane>
    </Fragment>
  );
}

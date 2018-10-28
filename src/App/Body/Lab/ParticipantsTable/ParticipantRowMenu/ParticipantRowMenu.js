import React from 'react';
import { Popover, Position, Menu, Button } from 'evergreen-ui';
import ParticipantDeleteDialog from './ParticipantDeleteDialog/EnhancedParticipantDeleteDialog.js';

export default ParticipantRowMenu;

function ParticipantRowMenu({
  onDelete,
  onEdit,
  showParticipantDeleteDialog,
  closeParticipantDeleteDialog
}) {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={onEdit}>Editar</Menu.Item>
            <Menu.Divider />
            <Menu.Item onSelect={showParticipantDeleteDialog} intent="danger">
              Eliminar
              <ParticipantDeleteDialog
                onDelete={onDelete}
                close={closeParticipantDeleteDialog}
              />
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Button height={20}>...</Button>
    </Popover>
  );
}

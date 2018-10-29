import React from 'react';
import { Popover, Position, Menu, Button } from 'evergreen-ui';

export default ParticipantRowMenu;

function ParticipantRowMenu({
  onEdit,
  openDeleteDialog,
  openPodUpDialog,
  openPodDownDialog
}) {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={openPodUpDialog}>Levantar Pod</Menu.Item>
            <Menu.Item onSelect={openPodDownDialog}>Destruir Pod</Menu.Item>
            <Menu.Divider />
            <Menu.Item onSelect={onEdit}>Editar</Menu.Item>
            <Menu.Item onSelect={openDeleteDialog} intent="danger">
              Eliminar
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Button height={20}>...</Button>
    </Popover>
  );
}

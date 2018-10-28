import React from 'react';
import { Popover, Position, Menu, Button } from 'evergreen-ui';
import LabDeleteDialog from './LabDeleteDialog/EnhancedLabDeleteDialog.js';

export default LabRowMenu;

function LabRowMenu({
  onDelete,
  onEdit,
  showLabDeleteDialog,
  closeLabDeleteDialog
}) {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={onEdit}>Editar</Menu.Item>
            <Menu.Divider />
            <Menu.Item onSelect={showLabDeleteDialog} intent="danger">
              Eliminar
              <LabDeleteDialog
                onDelete={onDelete}
                close={closeLabDeleteDialog}
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

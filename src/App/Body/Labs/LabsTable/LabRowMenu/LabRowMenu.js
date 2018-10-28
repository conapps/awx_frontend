import React from 'react';
import { Popover, Position, Menu, Button } from 'evergreen-ui';

export default LabRowMenu;

function LabRowMenu({ onDelete, onEdit }) {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={onEdit}>Editar</Menu.Item>
            <Menu.Item onSelect={onDelete} intent="danger">
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

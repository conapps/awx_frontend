import React from 'react';
import { Table } from 'evergreen-ui';
import LabsTableMenu from './LabsTableMenu/EnhancedLabsTableMenu.js';

export default LabsTable;

function LabsTable({ labs, onDelete }) {
  return (
    <Table width="100%">
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Inicio</Table.TextHeaderCell>
        <Table.TextHeaderCell>Fin</Table.TextHeaderCell>
        <Table.TextHeaderCell>Run Playbook</Table.TextHeaderCell>
        <Table.TextHeaderCell>End Playbook</Table.TextHeaderCell>
        <Table.TextHeaderCell>Diagrama</Table.TextHeaderCell>
        <Table.TextHeaderCell textAlign="center" />
      </Table.Head>
      <Table.VirtualBody height="calc(100vh - 64px - 52px - 48px - 64px)">
        {labs.map(lab => (
          <Table.Row key={lab.id}>
            <Table.TextCell>{lab.data.name}</Table.TextCell>
            <Table.TextCell>{lab.data.startDate}</Table.TextCell>
            <Table.TextCell>{lab.data.endDate}</Table.TextCell>
            <Table.TextCell>{lab.data.runPlaybook}</Table.TextCell>
            <Table.TextCell>{lab.data.endPlaybook}</Table.TextCell>
            <Table.Cell
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LabsTableMenu id={lab.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  );
}

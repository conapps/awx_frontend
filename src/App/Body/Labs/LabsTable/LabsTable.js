import React from 'react';
import { Table } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import LabRowMenu from './LabRowMenu/EnhancedLabRowMenu.js';

export default LabsTable;

function LabsTable({ labs }) {
  return (
    <Table width="100%">
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
          Inicio
        </Table.TextHeaderCell>
        <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
          Fin
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>Run Playbook</Table.TextHeaderCell>
        <Table.TextHeaderCell>End Playbook</Table.TextHeaderCell>
        <Table.TextHeaderCell>Diagrama</Table.TextHeaderCell>
        <Table.TextHeaderCell
          flexBasis={80}
          flexShrink={0}
          flexGrow={0}
          textAlign="center"
        >
          ...
        </Table.TextHeaderCell>
      </Table.Head>
      <Table.VirtualBody height="calc(100vh - 64px - 52px - 48px - 64px)">
        {labs.map(lab => (
          <Table.Row key={lab.id} paddingRight={15}>
            <Table.TextCell>
              <Link to={`/labs/${lab.id}/`}>{lab.data.name}</Link>
            </Table.TextCell>
            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
              {lab.data.startDate}
            </Table.TextCell>
            <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
              {lab.data.endDate}
            </Table.TextCell>
            <Table.TextCell>{lab.data.runPlaybook}</Table.TextCell>
            <Table.TextCell>{lab.data.endPlaybook}</Table.TextCell>
            <Table.TextCell>{lab.data.diagramURL}</Table.TextCell>
            <Table.Cell
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexBasis={80}
              flexShrink={0}
              flexGrow={0}
            >
              <LabRowMenu id={lab.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  );
}

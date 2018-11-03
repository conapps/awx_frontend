import React from 'react';
import { Table } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import ParticipantRowMenu from './ParticipantRowMenu/EnhancedParticipantRowMenu.js';
import StatusBadge from '../../StatusBadge/StatusBadge.js';
import LastPlaybookBadge from '../../LastPlaybookBadge/EnhancedLastPlaybookBadge.js';

export default ParticipantsTable;

function ParticipantsTable({ participants }) {
  return (
    <Table width="100%">
      <Table.Head paddingRight={15}>
        <Table.TextHeaderCell>Nombre</Table.TextHeaderCell>
        <Table.TextHeaderCell>Email</Table.TextHeaderCell>
        <Table.TextHeaderCell>Empresa</Table.TextHeaderCell>
        <Table.TextHeaderCell>AWS Region</Table.TextHeaderCell>
        <Table.TextHeaderCell>Pod</Table.TextHeaderCell>
        <Table.TextHeaderCell>Último Playbook</Table.TextHeaderCell>
        <Table.TextHeaderCell>Status</Table.TextHeaderCell>
        <Table.TextHeaderCell
          flexBasis={80}
          flexShrink={0}
          flexGrow={0}
          textAlign="center"
        >
          ...
        </Table.TextHeaderCell>
      </Table.Head>
      <Table.VirtualBody height="calc(100vh - 324px - 32px)">
        {participants.map(participant => (
          <Table.Row key={participant.id} paddingRight={15}>
            <Table.TextCell>
              <Link to={`/participants/${participant.id}/`}>
                {participant.data.name}
              </Link>
            </Table.TextCell>
            <Table.TextCell>{participant.data.email}</Table.TextCell>
            <Table.TextCell>{participant.data.company}</Table.TextCell>
            <Table.TextCell>{participant.data.awsRegion}</Table.TextCell>
            <Table.TextCell isNumber>{participant.data.pod}</Table.TextCell>
            <Table.TextCell>
              <LastPlaybookBadge value={participant.data.lastPlaybook} />
            </Table.TextCell>
            <Table.TextCell>
              {participant.data.status && (
                <StatusBadge value={participant.data.status} />
              )}
            </Table.TextCell>
            <Table.Cell
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexBasis={80}
              flexShrink={0}
              flexGrow={0}
            >
              <ParticipantRowMenu id={participant.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  );
}

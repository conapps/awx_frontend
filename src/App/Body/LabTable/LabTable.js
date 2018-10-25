import React from 'react';
import { Table } from 'evergreen-ui';

export default LabTable;

function LabTable() {
  const profiles = [
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Cheryl Carter',
      lastActivity: 'a few seconds ago',
      ltv: 365
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Heather Morales',
      lastActivity: 'a minute ago',
      ltv: 427
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Sean Jackson',
      lastActivity: '3 minutes ago',
      ltv: 538
    },
    {
      id: new Date().getTime() + Math.random(),
      name: 'Catherine Anderson',
      lastActivity: '4 minutes ago',
      ltv: 171
    }
  ];

  return (
    <Table width="100%">
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Last Activity</Table.TextHeaderCell>
        <Table.TextHeaderCell>ltv</Table.TextHeaderCell>
      </Table.Head>
      <Table.VirtualBody height="calc(100vh - 64px - 52px - 48px - 64px)">
        {profiles.map(profile => (
          <Table.Row key={profile.id}>
            <Table.TextCell>{profile.name}</Table.TextCell>
            <Table.TextCell>{profile.lastActivity}</Table.TextCell>
            <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  );
}

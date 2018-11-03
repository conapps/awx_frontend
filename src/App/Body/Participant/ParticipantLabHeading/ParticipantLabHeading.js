import React from 'react';
import { Pane, Heading, Paragraph } from 'evergreen-ui';

export default ParticipantLabHeading;

function ParticipantLabHeading({ lab }) {
  return (
    <Pane display="flex" width="100%" flex={2} marginBottom={16}>
      <Pane flex="2">
        <Heading>{lab.data.name}</Heading>
      </Pane>
      <Pane flex="1" display="flex" justifyContent="flex-end">
        <Paragraph fontStyle="italic" marginRight={8}>
          {`Inicio: ${lab.data.startDate}`}
        </Paragraph>
        <Paragraph fontStyle="italic">{'|'}</Paragraph>
        <Paragraph fontStyle="italic" marginLeft={8}>
          {`Fin: ${lab.data.endDate}`}
        </Paragraph>
      </Pane>
    </Pane>
  );
}

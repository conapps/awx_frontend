import React from 'react';
import { Pane } from 'evergreen-ui';

export default LabDiagram;

function LabDiagram({ diagramURL }) {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      flex={3}
      maxWidth={700}
      minWidth={700}
      padding={0}
    >
      <Pane
        display="flex"
        paddingTop={16}
        paddingBottom={16}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="calc(100vh - 170px)"
      >
        <img src={diagramURL} alt="diagram" />
      </Pane>
    </Pane>
  );
}

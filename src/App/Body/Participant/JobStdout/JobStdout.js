import './JobStdout.css';
import React, { Fragment } from 'react';
import { Pane, Heading } from 'evergreen-ui';

export default JobStdout;

function JobStdout({ body }) {
  return (
    <Fragment>
      <Pane
        display="flex"
        flexDirection="column"
        flex={3}
        padding={16}
        maxWidth={700}
      >
        <Heading marginBottom={8}>Salida del la última ejecución</Heading>
        <Pane
          className="JobStdout"
          height="calc(100vh - 190px)"
          overflowY="scroll"
          border="default"
          padding={8}
        >
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Pane>
      </Pane>
    </Fragment>
  );
}

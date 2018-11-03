import './JobStdout.css';
import React, { Fragment } from 'react';
import { Pane, Switch } from 'evergreen-ui';

export default JobStdout;

function JobStdout({ body, followStdout, onStdoutTrack }) {
  return (
    <Fragment>
      <Pane
        display="flex"
        flexDirection="column"
        flex={3}
        maxWidth={700}
        minWidth={700}
        padding={0}
        marginTop={-40}
      >
        <Pane
          display="flex"
          alignItems="center"
          paddingTop={16}
          paddingBottom={16}
          justifyContent="flex-end"
        >
          <Pane marginRight={16} fontSize={12}>
            Seguir <code>stdout</code>
          </Pane>
          <Pane>
            <Switch
              label="Seguir salida"
              checked={followStdout}
              onChange={onStdoutTrack}
            />
          </Pane>
        </Pane>
        <Pane
          className="JobStdout"
          height="calc(100vh - 170px)"
          overflowY="scroll"
          border="default"
          paddingTop={0}
          paddingBottom={0}
          paddingRight={8}
          paddingLeft={8}
        >
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Pane>
      </Pane>
    </Fragment>
  );
}

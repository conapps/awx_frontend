import React from 'react';
import { Pane } from 'evergreen-ui';
import { Route, Switch } from 'react-router-dom';
import Labs from './Labs/EnhancedLabs.js';
import Lab from './Lab/EnhancedLab.js';
import Participant from './Participant/EnhancedParticipant.js';
export default Body;

function Body() {
  return (
    <Pane display="flex" padding={16} width="100%" flexDirection="column">
      <Switch>
        <Route path="/labs/:id/" component={Lab} />
        <Route path="/participants/:id/" component={Participant} />
        <Route exact path="/" component={Labs} />
      </Switch>
    </Pane>
  );
}

import React from 'react';
import { Pane } from 'evergreen-ui';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Labs from './Labs/EnhancedLabs.js';
export default Body;

function Body() {
  return (
    <Pane display="flex" padding={16} width="100%" flexDirection="column">
      <Router>
        <Route path="/" exact component={Labs} />
      </Router>
    </Pane>
  );
}

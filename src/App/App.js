import './App.css';
import React from 'react';
import { Pane /*, Spinner */ } from 'evergreen-ui';
import Header from './Header/EnhancedHeader.js';
import EnhancedBody from './Body/Body.js';
/*import Login from './Auth/EnhancedLogin.js';*/

class App extends React.Component {
  render() {
    /*
    const { isAuthenticated, isReady, onLogin, loading, error } = this.props;
    
    if (isAuthenticated === false)
      return (
        <Pane
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          background="tint2"
        >
          {isReady === false ? (
            <Spinner />
          ) : (
            <Login onSubmit={onLogin} loading={loading} error={error} />
          )}
        </Pane>
      );
    */
    return (
      <Pane>
        <Header />
        <EnhancedBody />
      </Pane>
    );
  }
}

export default App;

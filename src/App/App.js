import './App.css';
import React from 'react';
import Header from './Header/Header.js';
import EnhancedBody from './Body/EnhancedBody.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <EnhancedBody />
      </div>
    );
  }
}

export default App;

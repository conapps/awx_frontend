import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App/EnhancedApp.js';
import * as serviceWorker from './serviceWorker';

const $rootEl = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  $rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Hot module replacement
if (module.hot) {
  module.hot.accept('./App/EnhancedApp.js', () => {
    const NextApp = require('./App/EnhancedApp.js').default;

    ReactDOM.render(
      <Router>
        <NextApp />
      </Router>,
      $rootEl
    );
  });
}

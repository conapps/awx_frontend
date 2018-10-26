import compose from 'recompose/compose.js';
import withAuthHandlers from '../common/handlers/withAuthHandlers.js';
import App from './App.js';

const EnhancedApp = compose(withAuthHandlers())(App);

export default EnhancedApp;

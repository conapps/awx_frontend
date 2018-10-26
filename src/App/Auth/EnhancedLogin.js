import compose from 'recompose/compose.js';
import withFormHandlers from '../../common/handlers/withFormHandlers.js';
import Login from './Login.js';

const EnhancedLogin = compose(
  withFormHandlers({
    email: '',
    password: ''
  })
)(Login);

EnhancedLogin.displayName = 'enhanced(Login)';
export default EnhancedLogin;

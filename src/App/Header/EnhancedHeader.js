import compose from 'recompose/compose.js';
import withAuthHandlers from '../../common/handlers/withAuthHandlers.js';
import Header from './Header.js';

const EnhancedHeader = compose(withAuthHandlers())(Header);

export default EnhancedHeader;

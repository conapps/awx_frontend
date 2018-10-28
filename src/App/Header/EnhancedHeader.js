import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import { LOGOUT } from '../../state/actions.js';
import Header from './Header.js';

const EnhancedHeader = compose(
  connect(
    state => ({
      title: get(state, 'ui.title')
    }),
    {
      onLogout: () => ({
        type: LOGOUT
      })
    }
  )
)(Header);

export default EnhancedHeader;

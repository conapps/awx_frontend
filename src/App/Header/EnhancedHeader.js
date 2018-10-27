import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import withAuthHandlers from '../../common/handlers/withAuthHandlers.js';
import emitter from '../../modules/emitter.js';
import Header from './Header.js';

const EnhancedHeader = compose(
  withAuthHandlers(),
  withStateHandlers(
    () => ({
      title: ''
    }),
    {
      setTitle: () => title => {
        return { title };
      }
    }
  ),
  lifecycle({
    componentWillMount() {
      emitter.on('header:update', this.props.setTitle);
    }
  })
)(Header);

export default EnhancedHeader;

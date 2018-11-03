import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import LastPlaybookBadge from './LastPlaybookBadge.js';

const EnhancedLastPlaybookBadge = compose(
  connect(
    state => ({}),
    {}
  )
)(LastPlaybookBadge);

EnhancedLastPlaybookBadge.displayName = 'enhance(LastPlaybookBadge)';
export default EnhancedLastPlaybookBadge;

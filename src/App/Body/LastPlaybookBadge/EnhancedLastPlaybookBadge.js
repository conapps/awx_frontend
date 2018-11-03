import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import LastPlaybookBadge from './LastPlaybookBadge.js';
import { getActiveLab } from '../../../state/reducers/labs.js';

const EnhancedLastPlaybookBadge = compose(
  connect(
    (state, { value }) => {
      const lab = getActiveLab(state);

      return {
        color: value === lab.data.endPlaybook ? 'neutral' : 'blue'
      };
    },
    {}
  )
)(LastPlaybookBadge);

EnhancedLastPlaybookBadge.displayName = 'enhance(LastPlaybookBadge)';
export default EnhancedLastPlaybookBadge;

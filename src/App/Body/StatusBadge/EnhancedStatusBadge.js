import compose from 'recompose/compose.js';
import withProps from 'recompose/withProps.js';
import { connect } from 'react-redux';
import StatusBadge from './StatusBadge.js';
import { getActiveLab } from '../../../state/reducers/labs.js';

const EnhancedStatusBadge = compose(
  connect(
    state => {
      const lab = getActiveLab(state);
      return {
        lab
      };
    },
    {}
  ),
  withProps(({ value, lab, playbook }) => {
    if (playbook === undefined) return {};

    if (playbook === lab.data.runPlaybook && value === 'successful')
      return { value: 'up' };

    if (playbook === lab.data.endPlaybook && value === 'successful')
      return { value: 'down' };
  })
)(StatusBadge);

EnhancedStatusBadge.displayName = 'enhance(StatusBadge)';
export default EnhancedStatusBadge;

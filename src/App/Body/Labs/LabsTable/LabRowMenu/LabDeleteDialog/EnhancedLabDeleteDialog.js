import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import LabDeleteDialog from './LabDeleteDialog.js';

const EnhancedLabDeleteDialog = compose(
  connect(
    state => ({
      isShown: get(state, 'ui.labs.isLabDeleteDialogOpen', false)
    }),
    {}
  )
)(LabDeleteDialog);

EnhancedLabDeleteDialog.displayName = 'enhance(LabDeleteDialog)';
export default EnhancedLabDeleteDialog;

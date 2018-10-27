import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { toaster } from 'evergreen-ui';
import labs from '../../../../../modules/labs.js';
import LabsTableMenu from './LabsTableMenu.js';

const EnhancedLabsTableMenu = compose(
  withHandlers({
    onDelete: ({ id }) => async () => {
      try {
        await labs.delete(id);
        toaster.success('Laboratorio eliminado');
      } catch (err) {
        toaster.danger(err.message);
      }
    }
  })
)(LabsTableMenu);

EnhancedLabsTableMenu.displayName = 'enhance(LabsTableMenu)';

export default EnhancedLabsTableMenu;

import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import {
  DELETE_REQUEST,
  LABS_DELETE_FAILURE,
  LABS_DELETE_REQUEST,
  LABS_DELETE_SUCCESS
} from '../../../../../state/actions.js';
import LabsTableMenu from './LabsTableMenu.js';

const EnhancedLabsTableMenu = compose(
  connect(
    () => ({}),
    {
      onDelete: id => ({
        type: DELETE_REQUEST,
        payload: {
          endpoint: `/labs/${id}/`,
          uiKey: 'labsDelete',
          meta: {
            id
          },
          actionTypes: [
            LABS_DELETE_REQUEST,
            LABS_DELETE_SUCCESS,
            LABS_DELETE_FAILURE
          ]
        }
      })
    }
  ),
  withHandlers({
    onDelete: ({ onDelete, id }) => () => onDelete(id)
  })
)(LabsTableMenu);

EnhancedLabsTableMenu.displayName = 'enhance(LabsTableMenu)';

export default EnhancedLabsTableMenu;

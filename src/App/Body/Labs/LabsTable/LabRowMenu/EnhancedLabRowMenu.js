import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import {
  DELETE_REQUEST,
  LABS_DELETE_FAILURE,
  LABS_DELETE_REQUEST,
  LABS_DELETE_SUCCESS,
  UI
} from '../../../../../state/actions.js';
import LabRowMenu from './LabRowMenu.js';

const EnhancedLabRowMenu = compose(
  connect(
    () => ({}),
    {
      onEdit: id => ({
        type: UI,
        payload: {
          labs: {
            isSideSheetOpen: true,
            editing: id
          }
        }
      }),
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
    onEdit: ({ onEdit, id }) => () => onEdit(id),
    onDelete: ({ onDelete, id }) => () => onDelete(id)
  })
)(LabRowMenu);

EnhancedLabRowMenu.displayName = 'enhance(LabRowMenu)';

export default EnhancedLabRowMenu;

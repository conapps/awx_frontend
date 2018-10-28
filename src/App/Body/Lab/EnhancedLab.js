import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import lifecycle from 'recompose/lifecycle.js';
import withProps from 'recompose/withProps.js';
import {
  UI,
  GET_REQUEST,
  LABS_SHOW_FAILURE,
  LABS_SHOW_REQUEST,
  LABS_SHOW_SUCCESS
} from '../../../state/actions.js';
import { labs as schema } from '../../../state/schemas.js';
import Lab from './Lab.js';

const EnhancedLab = compose(
  withProps(({ match }) => ({
    id: match.params.id
  })),
  connect(
    (state, { id }) => ({
      lab: get(state, `entities.labs.${id}`, undefined)
    }),
    {
      updateHeading: id => ({
        type: UI,
        payload: {
          title: `Laboratorios / ${id}`
        }
      }),
      show: id => ({
        type: GET_REQUEST,
        payload: {
          endpoint: `/labs/${id}/`,
          uiKey: 'labsShow',
          schema,
          actionTypes: [LABS_SHOW_REQUEST, LABS_SHOW_SUCCESS, LABS_SHOW_FAILURE]
        }
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.show(this.props.id);
      this.props.updateHeading(this.props.id);
    }
  })
)(Lab);

EnhancedLab.displayName = 'enhance(Lab)';

export default EnhancedLab;

import compose from 'recompose/compose.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import LabDiagram from './LabDiagram.js';
import { getActiveLab } from '../../../../state/reducers/labs.js';

/** Constants */
const NOT_FOUND_IMAGE_URL =
  'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png';

const EnhancedLabDiagram = compose(
  connect(
    state => {
      const lab = getActiveLab(state);

      let diagramURL = get(lab, 'data.diagramURL', NOT_FOUND_IMAGE_URL);

      if (diagramURL === '') diagramURL = NOT_FOUND_IMAGE_URL;

      return {
        diagramURL
      };
    },
    {}
  )
)(LabDiagram);

EnhancedLabDiagram.displayName = 'enhance(LabDiagram)';
export default EnhancedLabDiagram;

import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import { connect } from 'react-redux';
import get from 'lodash/get.js';
import withFormHandlers from '../../../../common/handlers/withFormHandlers.js';
import LabForm from './LabForm.js';

const EnhancedLabForm = compose(
  connect(
    state => {
      const id = get(state, 'ui.labs.editing', undefined);
      const form = get(state, `entities.labs.${id}.data`, undefined);
      const loadingLabsCreate = get(state, 'ui.loading.labsCreate', false);
      const loadingLabsUpdate = get(state, 'ui.loading.labsUpdate', false);
      return {
        id,
        form,
        loading: loadingLabsCreate || loadingLabsUpdate
      };
    },
    {}
  ),
  withHandlers({
    validate: () => ({ name, runPlaybook, endPlaybook }) => {
      const errors = {};
      if (name === '' || name === undefined) errors.name = 'Campo requerido.';
      if (runPlaybook === '' || runPlaybook === undefined)
        errors.runPlaybook = 'Campo requerido.';
      if (endPlaybook === '' || endPlaybook === undefined)
        errors.endPlaybook = 'Campo requerido';
      return errors;
    },
    onSubmit: ({ onSubmit, id }) => lab => onSubmit(lab, id)
  }),
  withFormHandlers({
    name: '',
    startDate: '',
    endDate: '',
    runPlaybook: '',
    endPlaybook: '',
    diagramURL: ''
  })
)(LabForm);

EnhancedLabForm.displayName = 'enhanced(LabForm)';
export default EnhancedLabForm;

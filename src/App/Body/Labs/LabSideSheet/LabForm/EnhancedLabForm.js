import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import withFormHandlers from '../../../../../common/handlers/withFormHandlers.js';
import LabForm from './LabForm.js';

const EnhancedLabForm = compose(
  withHandlers({
    validate: () => ({ name, runPlaybook, endPlaybook }) => {
      const errors = {};
      if (name === '' || name === undefined) errors.name = 'Campo requerido.';
      if (runPlaybook === '' || runPlaybook === undefined)
        errors.runPlaybook = 'Campo requerido.';
      if (endPlaybook === '' || endPlaybook === undefined)
        errors.endPlaybook = 'Campo requerido';
      return errors;
    }
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

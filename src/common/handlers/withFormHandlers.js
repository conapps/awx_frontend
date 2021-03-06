import compose from 'recompose/compose.js';
import withHandlers from 'recompose/withHandlers.js';
import withStateHandlers from 'recompose/withStateHandlers.js';
import isFunction from 'lodash/isFunction.js';

export default withFormHandlers;

function withFormHandlers(initialForm) {
  return compose(
    withStateHandlers(
      ({ form }) => {
        return { form: { ...initialForm, ...form }, formErrors: {} };
      },
      {
        setForm: ({ form, formErrors }) => newForm => ({
          form: {
            ...form,
            ...newForm
          }
        }),
        setFormErrors: () => formErrors => ({ formErrors })
      }
    ),
    withHandlers({
      formIsValid: ({ validate, setFormErrors, form }) => () => {
        if (!isFunction(validate)) return {};
        const formErrors = validate(form);
        setFormErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      }
    }),
    withHandlers({
      handleTextChange: ({ setForm }) => key => e => {
        setForm({
          [key]: e.target.value
        });
      },
      handleSubmit: ({ form, formIsValid, onSubmit }) => e => {
        e.preventDefault();
        if (formIsValid()) onSubmit(form);
      }
    })
  );
}

import React from 'react';
import { TextInputField, Button, Spinner } from 'evergreen-ui';

export default LabForm;

function LabForm({ handleTextChange, handleSubmit, form, loading, id }) {
  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        label="Nombre"
        required
        type="text"
        value={form.name}
        onChange={handleTextChange('name')}
      />
      <TextInputField
        label="Fecha de Inicio"
        type="date"
        value={form.startDate}
        onChange={handleTextChange('startDate')}
      />
      <TextInputField
        label="Fecha de Finalización"
        type="date"
        value={form.endDate}
        onChange={handleTextChange('endDate')}
      />
      <TextInputField
        label="Nombre del Job para levantar el lab"
        type="text"
        required
        hint="Verifique que el nombre ingresado en este campo corresponda con un job creado en el servidor de AWS o Ansible Tower."
        value={form.runPlaybook}
        onChange={handleTextChange('runPlaybook')}
      />
      <TextInputField
        label="Nombre del Job para eliminar el lab"
        type="text"
        required
        hint="Verifique que el nombre ingresado en este campo corresponda con un job creado en el servidor de AWS o Ansible Tower."
        onChange={handleTextChange('endPlaybook')}
        value={form.endPlaybook}
      />
      <TextInputField
        label="Diagrama del laboratorio"
        type="url"
        description="URL de una imagen del diagrama del laboratorio."
        onChange={handleTextChange('diagramURL')}
        value={form.diagramURL}
      />
      <Button
        type="submit"
        textAlign="center"
        width="100%"
        appearance="primary"
        display="flex"
        alignItems="center"
        justifyContent="center"
        disabled={loading}
        intent={id === undefined ? 'success' : 'warning'}
      >
        {loading === true ? (
          <Spinner size={16} />
        ) : id === undefined ? (
          'Crear'
        ) : (
          'Actualizar'
        )}
      </Button>
    </form>
  );
}

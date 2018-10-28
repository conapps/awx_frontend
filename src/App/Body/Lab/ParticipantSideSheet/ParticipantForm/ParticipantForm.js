import React from 'react';
import { TextInputField, Button, Spinner } from 'evergreen-ui';

export default ParticipantForm;

function ParticipantForm({
  handleTextChange,
  handleSubmit,
  form,
  loading,
  id
}) {
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
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={handleTextChange('email')}
      />
      <TextInputField
        label="Empresa"
        type="text"
        value={form.company}
        onChange={handleTextChange('company')}
      />
      <TextInputField
        label="AWS Region"
        type="text"
        required
        description="Región de AWS donde se ejecutara el Pod."
        hint="Ej: us-east-1, us-east-2, us-west-1, etc."
        value={form.awsRegion}
        onChange={handleTextChange('awsRegion')}
      />
      <TextInputField
        label="Pod"
        type="number"
        required
        min={1}
        max={99}
        onChange={handleTextChange('pod')}
        value={form.pod}
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

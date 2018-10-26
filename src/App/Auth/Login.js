import React from 'react';
import { Heading, Pane, TextInputField, Button, Spinner } from 'evergreen-ui';

export default Login;

function Login({ handleTextChange, handleSubmit, form, error, loading }) {
  return (
    <Pane padding={16} border width="25%" minWidth="300px" background="tint1">
      <Heading size={600}>Bienvenido a Lab Helpers</Heading>
      <Heading size={300}>Iniciar sesión</Heading>
      <hr />
      <form onSubmit={handleSubmit}>
        <TextInputField
          label="Email"
          required
          isInvalid={error !== undefined}
          type="text"
          value={form.email}
          onChange={handleTextChange('email')}
        />
        <TextInputField
          label="Password"
          type="password"
          required
          isInvalid={error !== undefined}
          hint={error !== undefined && 'Credenciales invalidas'}
          value={form.password}
          onChange={handleTextChange('password')}
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
        >
          {loading === true ? <Spinner size={16} /> : 'Aceptar'}
        </Button>
      </form>
    </Pane>
  );
}

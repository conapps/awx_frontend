import React from 'react';
import { Heading, Pane, TextInputField, Button, Spinner } from 'evergreen-ui';

export default Login;

function Login({ handleTextChange, handleSubmit, form, loading }) {
  return (
    <Pane padding={16} border width="25%" minWidth="300px" background="tint1">
      <Heading size={600}>Bienvenido a Lab Helpers</Heading>
      <Heading size={300}>Iniciar sesión</Heading>
      <hr />
      <form onSubmit={handleSubmit}>
        <TextInputField
          label="Email"
          required
          type="text"
          value={form.email}
          onChange={handleTextChange('email')}
        />
        <TextInputField
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={handleTextChange('password')}
        />
        <Button type="submit" appearance="primary">
          {loading === true ? <Spinner size={16} /> : 'Aceptar'}
        </Button>
      </form>
    </Pane>
  );
}

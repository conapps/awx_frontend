import React from 'react';
import { Pane, Heading, Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';

export default Header;

function Header({ onLogout, title }) {
  return (
    <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
      <Pane flex={3} alignItems="center" display="flex">
        <Heading size={600}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Conalabs
          </Link>
        </Heading>
        &nbsp;
        <Heading size={600}>{'/'}</Heading>
        &nbsp;
        <Heading size={600}>{title}</Heading>
      </Pane>
      <Pane
        flex={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button onClick={onLogout} appearance="primary">
          Cerrar sesión
        </Button>
      </Pane>
    </Pane>
  );
}

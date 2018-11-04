import React from 'react';
import { Pane, Heading } from 'evergreen-ui';

export default Header;

function Header({ onLogout, title }) {
  return (
    <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
      <Pane flex={3} alignItems="center" display="flex">
        <Heading size={600}>Conalabs</Heading>
        &nbsp;
        <Heading size={600}>{'/'}</Heading>
        &nbsp;
        <Heading
          size={600}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {title}
        </Heading>
      </Pane>
      <Pane
        flex={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      />
    </Pane>
  );
}

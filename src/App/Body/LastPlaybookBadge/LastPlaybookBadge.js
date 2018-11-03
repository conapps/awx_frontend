import React from 'react';
import { Badge } from 'evergreen-ui';

export default LastPlaybookBadge;

function LastPlaybookBadge(props) {
  const { color, value } = props;

  return (
    <Badge color={color} isSolid>
      {value}
    </Badge>
  );
}

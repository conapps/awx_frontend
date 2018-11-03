import React from 'react';
import { Badge } from 'evergreen-ui';

export default LastPlaybookBadge;

function LastPlaybookBadge({ color, label, ...props }) {
  return (
    <Badge color={color} isSolid {...props}>
      {label}
    </Badge>
  );
}

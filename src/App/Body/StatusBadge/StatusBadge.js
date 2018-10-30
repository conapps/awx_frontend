import React from 'react';
import { Badge } from 'evergreen-ui';

export default StatusBadge;

/** Constants */
const COLORS = {
  pending: 'blue',
  successful: 'green',
  failed: 'red'
};

function StatusBadge({ value }) {
  const color = COLORS[value] || 'neutral';

  return (
    <Badge color={color} isSolid>
      {value}
    </Badge>
  );
}

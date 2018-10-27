import React from 'react';

export default Lab;

function Lab({ id, lab }) {
  return (
    <div>
      <pre>{JSON.stringify(lab)}</pre>
    </div>
  );
}

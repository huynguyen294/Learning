import React, { memo } from 'react';
import { Container } from 'react-bootstrap';

function Empty({ children }) {
  return (
    <React.Fragment>
      <div className="main">{children}</div>
    </React.Fragment>
  );
}

export default memo(Empty);

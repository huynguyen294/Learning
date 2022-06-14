import React, { memo } from 'react';
import { Header } from '../../components';
import { Container } from 'react-bootstrap';

function HeaderOnly({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className="main">{children}</div>
      </Container>
    </React.Fragment>
  );
}

export default memo(HeaderOnly);

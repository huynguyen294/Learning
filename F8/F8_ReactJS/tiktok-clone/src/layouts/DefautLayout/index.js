import React, { memo } from 'react';
import { Header, Sidebar } from '../../components';
import { Container } from 'react-bootstrap';

function DefautLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Sidebar />
        <div className="main">{children}</div>
      </Container>
    </React.Fragment>
  );
}

export default memo(DefautLayout);

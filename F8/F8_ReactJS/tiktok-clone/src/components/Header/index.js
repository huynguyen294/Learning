import { memo } from 'react';
import { Container } from 'react-bootstrap';

import { images } from '../../assets';
import './header.scss';

function Header() {
  return (
    <div className="header">
      <Container>
        <div className="logo">
          <img src={images.logo} alt="Tiktok" />
        </div>
        <div className="search">
          <input type="text" placeholder="search..." />
        </div>
      </Container>
    </div>
  );
}

export default memo(Header);

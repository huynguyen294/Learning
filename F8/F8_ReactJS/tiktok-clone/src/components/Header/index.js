import { memo } from 'react';
import './header.scss';

function Header() {
  return (
    <div className="header">
      <h1>Header</h1>
    </div>
  );
}

export default memo(Header);

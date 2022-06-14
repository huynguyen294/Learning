import { memo } from 'react';
import clsx from 'clsx';
import './home.scss';

function Home() {
  return (
    <div className={clsx('home', { ['active']: false })}>
      <h1>Home Page</h1>
    </div>
  );
}

export default memo(Home);

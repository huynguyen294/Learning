import { memo } from 'react';
import clsx from 'clsx';
import './following.scss';

function Following() {
  return (
    <div className={clsx('following')}>
      <h1>Following Page</h1>
    </div>
  );
}

export default memo(Following);

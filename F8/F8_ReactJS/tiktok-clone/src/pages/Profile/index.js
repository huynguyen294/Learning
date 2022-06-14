import { memo } from 'react';
import clsx from 'clsx';
import './profile.scss';

function Profile() {
  return (
    <div className={clsx('profile')}>
      <h1>Profile Page</h1>
    </div>
  );
}

export default memo(Profile);

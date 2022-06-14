import { memo } from 'react';
import clsx from 'clsx';
import './upload.scss';

function Upload() {
  return (
    <div className={clsx('upload')}>
      <h1>Upload Page</h1>
    </div>
  );
}

export default memo(Upload);

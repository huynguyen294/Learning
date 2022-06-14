import { memo } from 'react';
import clsx from 'clsx';
import './search.scss';

function Search() {
  return (
    <div className={clsx('search')}>
      <h1>Search Page</h1>
    </div>
  );
}

export default memo(Search);

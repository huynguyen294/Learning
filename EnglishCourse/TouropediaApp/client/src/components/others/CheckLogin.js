import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckLogin() {
  const user = localStorage.getItem('profile');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user]);
  return null;
}
export default memo(CheckLogin);

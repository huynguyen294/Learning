import { Link } from 'react-router-dom';
import { CheckLogin } from '../components';

function Home() {
  const user = localStorage.getItem('profile');

  return (
    <div className="home">
      <CheckLogin user={user} />
      <h1>Home Page</h1>
      <Link
        to={'/login'}
        onClick={() => {
          localStorage.clear();
        }}
      >
        Đăng xuất
      </Link>
    </div>
  );
}

export default Home;

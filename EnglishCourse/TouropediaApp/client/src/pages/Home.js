import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
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

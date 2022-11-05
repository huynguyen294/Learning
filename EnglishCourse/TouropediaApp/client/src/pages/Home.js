import { Link } from "react-router-dom";

function Home() {
  const user = localStorage.getItem("profile");
  console.log(user);

  return (
    <div className="home">
      <h1>Home Page</h1>
      <Link
        to={"/login"}
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

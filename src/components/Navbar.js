import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/Signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

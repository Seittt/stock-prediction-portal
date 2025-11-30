import { useContext } from "react";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("RefreshToken");
    setIsLoggedIn(false);
    console.log("Logged out");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className="navbar-brand text-light" to="/">
          Stock Prediction Portal
        </Link>

        <div>
          {isLoggedIn ? (
            <button
              text="logout"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Button text="Login" class="btn-outline-info" url="/login" />
              &nbsp;
              <Button text="Register" class="btn-info" url="/register" />
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

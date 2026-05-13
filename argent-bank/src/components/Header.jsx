import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
      </Link>
      <div>
        {isAuthenticated && user ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa-solid fa-circle-user"></i> {user.firstName}
            </Link>

            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
          </>
        ) : (
        <Link className="main-nav-item" to="/login">
            <i className="fa-solid fa-circle-user"></i> Sign In
        </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
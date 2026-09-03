import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ variant = "guest", showAuthLinks = false, points }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isGuest = variant === "guest";
  const isApp = variant === "app";

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="navbar">
      <button
        className="navbar__brand"
        type="button"
        onClick={() => navigate("/")}
      >
        TRAVELY
      </button>

      <div className="navbar__links">
        {isGuest && (
          <>
            <button className="navbar__link" type="button">
              About
            </button>

            <button className="navbar__link" type="button">
              Contact
            </button>
          </>
        )}

        {isApp && (
          <>
            <button
              className="navbar__link"
              type="button"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <span className="navbar__points">{points} p</span>

            <button
              className="navbar__link"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        )}

        {isGuest && showAuthLinks && (
          <>
            <button
              className="navbar__link"
              type="button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>

            <button
              className="navbar__link navbar__link--primary"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

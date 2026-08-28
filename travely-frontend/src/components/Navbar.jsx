import "./Navbar.css";

function Navbar({
  variant = "guest",
  showAuthLinks = false,
  points,
  onHome,
  onLogin,
  onRegister,
  onLogout,
}) {
  const isGuest = variant === "guest";
  const isApp = variant === "app";

  return (
    <nav className="navbar">
      <button className="navbar__brand" type="button" onClick={onHome}>
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
            <button className="navbar__link" type="button">
              Profile
            </button>

            <span className="navbar__points">{points} p</span>

            <button className="navbar__link" type="button" onClick={onLogout}>
              Log out
            </button>
          </>
        )}

        {isGuest && showAuthLinks && (
          <>
            <button className="navbar__link" type="button" onClick={onLogin}>
              Log in
            </button>

            <button
              className="navbar__link navbar__link--primary"
              type="button"
              onClick={onRegister}
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

import "./Navbar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserPointsSummary } from "../api/quizApi";
import PointsChart from "./PointsChart";

const continentLabels = {
  0: "Europe",
  1: "Asia",
  2: "Africa",
  3: "North America",
  4: "South America",
  5: "Oceania",
  Europe: "Europe",
  Asia: "Asia",
  Africa: "Africa",
  NorthAmerica: "North America",
  SouthAmerica: "South America",
  Oceania: "Oceania",
};

function Navbar({ variant = "guest", showAuthLinks = false, points }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isPointsOpen, setIsPointsOpen] = useState(false);
  const [isPointsChartOpen, setIsPointsChartOpen] = useState(false);
  const [pointsSummary, setPointsSummary] = useState(null);
  const [pointsError, setPointsError] = useState("");

  const isGuest = variant === "guest";
  const isApp = variant === "app";
  const displayPoints = points ?? "...";

  async function loadPointsSummary() {
    try {
      const summary = await getUserPointsSummary();
      setPointsSummary(summary);
      setPointsError("");
    } catch (error) {
      setPointsError(error.message);
    }
  }

  useEffect(() => {
    if (!isPointsOpen && !isPointsChartOpen) {
      return;
    }

    loadPointsSummary();
  }, [isPointsChartOpen, isPointsOpen, points]);

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function openPointsSummary() {
    setIsPointsOpen(true);
  }

  async function togglePointsChart() {
    setIsPointsChartOpen((currentValue) => !currentValue);
    setIsPointsOpen(false);
    await loadPointsSummary();
  }

  return (
    <nav className="navbar">
      <button
        className="navbar__brand"
        type="button"
        onClick={() => navigate(isApp ? "/continents" : "/")}
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

            <div
              className="navbar__points-menu"
              onMouseEnter={() => {
                if (!isPointsChartOpen) {
                  openPointsSummary();
                }
              }}
              onMouseLeave={() => setIsPointsOpen(false)}
            >
              <button
                className="navbar__points"
                type="button"
                onClick={togglePointsChart}
                aria-expanded={isPointsOpen || isPointsChartOpen}
                aria-label="Show points by continent"
              >
                {displayPoints} p
              </button>

              {isPointsOpen || isPointsChartOpen ? (
                <div className="navbar__points-dropdown">
                  <p className="navbar__points-total">
                    Total: {pointsSummary?.totalPoints ?? displayPoints} p
                  </p>

                  {pointsError ? (
                    <p className="navbar__points-error">{pointsError}</p>
                  ) : isPointsChartOpen ? (
                    <PointsChart pointsSummary={pointsSummary} />
                  ) : (
                    <ul className="navbar__points-list">
                      {(pointsSummary?.continents || []).map((continent) => (
                        <li key={continent.continent}>
                          <span>
                            {continentLabels[continent.continent] ||
                              continent.continent}
                          </span>
                          <strong>{continent.points} p</strong>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>

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

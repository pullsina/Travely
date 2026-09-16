import "./Navbar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
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

const continentLinks = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
].map((label) => ({
  label,
  path: `/mode/${encodeURIComponent(label)}`,
}));

const modeRoutes = [
  { label: "Learning", pathPrefix: "/learning" },
  { label: "Practice", pathPrefix: "/practice" },
  { label: "Challenge", pathPrefix: "/game" },
];

const LEAVE_CHALLENGE_WARNING =
  "Are you sure you want to leave? Your current challenge progress and unsaved points will be lost.";

function getContinentApiValue(continentLabel) {
  return continentLabel.replace(/\s/g, "");
}

function Navbar({ variant = "guest", showAuthLinks = false, points }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isPointsOpen, setIsPointsOpen] = useState(false);
  const [isPointsChartOpen, setIsPointsChartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContinentsOpen, setIsContinentsOpen] = useState(false);
  const [pointsSummary, setPointsSummary] = useState(null);
  const [pointsError, setPointsError] = useState("");

  const isGuest = variant === "guest";
  const isApp = variant === "app";
  const displayPoints = points ?? "...";
  const profileLabel = user?.name || user?.username || "Profile";
  const currentPathParts = location.pathname.split("/").filter(Boolean);
  const currentSection = currentPathParts[0] || "";
  const currentContinent = currentPathParts[1]
    ? decodeURIComponent(currentPathParts[1])
    : "";
  const shouldShowModeLinks =
    isApp &&
    currentContinent &&
    ["mode", "learning", "practice", "game"].includes(currentSection);
  const encodedCurrentContinent = encodeURIComponent(currentContinent);
  const isAboutPage = currentSection === "about";
  const isContinentsPage =
    currentSection === "continents" ||
    ["mode", "learning", "practice", "game"].includes(currentSection);
  const isProfilePage = currentSection === "profile";

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
      setIsMobileMenuOpen(false);
      setIsContinentsOpen(false);
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
    setIsMobileMenuOpen(false);
    setIsContinentsOpen(false);
    await loadPointsSummary();
  }

  function clearChallengeSession(continentLabel) {
    const continentApiValue = getContinentApiValue(continentLabel);

    window.sessionStorage.removeItem(
      `travely-current-question-${continentApiValue}`,
    );
    window.sessionStorage.removeItem(
      `travely-challenge-attempt-${continentApiValue}`,
    );
  }

  function navigateFromMenu(path) {
    if (path === location.pathname) {
      setIsMobileMenuOpen(false);
      setIsPointsOpen(false);
      setIsPointsChartOpen(false);
      setIsContinentsOpen(false);
      return;
    }

    if (
      currentSection === "game" &&
      currentContinent &&
      !window.confirm(LEAVE_CHALLENGE_WARNING)
    ) {
      return;
    }

    if (currentSection === "game" && currentContinent) {
      clearChallengeSession(currentContinent);
    }

    setIsMobileMenuOpen(false);
    setIsPointsOpen(false);
    setIsPointsChartOpen(false);
    setIsContinentsOpen(false);
    navigate(path);
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
            <button
              className={`navbar__link${
                isAboutPage ? " navbar__link--active" : ""
              }`}
              type="button"
              onClick={() => navigate("/about")}
              aria-current={isAboutPage ? "page" : undefined}
            >
              About
            </button>

            <button className="navbar__link" type="button">
              Contact
            </button>
          </>
        )}

        {isApp && (
          <>
            {shouldShowModeLinks ? (
              <div className="navbar__modes" aria-label="Game modes">
                {modeRoutes.map((mode) => {
                  const modePath = `${mode.pathPrefix}/${encodedCurrentContinent}`;
                  const isActiveMode =
                    currentSection === mode.pathPrefix.replace("/", "");

                  return (
                    <button
                      className={`navbar__mode-link${
                        isActiveMode ? " navbar__mode-link--active" : ""
                      }`}
                      key={mode.label}
                      type="button"
                      onClick={() => navigateFromMenu(modePath)}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <button
              className={`navbar__link${
                isAboutPage ? " navbar__link--active" : ""
              }`}
              type="button"
              onClick={() => navigateFromMenu("/about")}
              aria-current={isAboutPage ? "page" : undefined}
            >
              About
            </button>

            <div
              className="navbar__continents-menu"
              onMouseEnter={() => setIsContinentsOpen(true)}
              onMouseLeave={() => setIsContinentsOpen(false)}
            >
              <button
                className={`navbar__link${
                  isContinentsPage ? " navbar__link--active" : ""
                }`}
                type="button"
                onClick={() => {
                  setIsContinentsOpen((currentValue) => !currentValue);
                  setIsPointsOpen(false);
                  setIsPointsChartOpen(false);
                }}
                aria-expanded={isContinentsOpen}
                aria-current={isContinentsPage ? "page" : undefined}
              >
                Continents
              </button>

              {isContinentsOpen ? (
                <div className="navbar__continents-dropdown">
                  {continentLinks.map((continent) => (
                    <button
                      className="navbar__dropdown-link"
                      key={continent.label}
                      type="button"
                      onClick={() => navigateFromMenu(continent.path)}
                    >
                      {continent.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              className={`navbar__link${
                isProfilePage ? " navbar__link--active" : ""
              }`}
              type="button"
              onClick={() => navigateFromMenu("/profile")}
              aria-current={isProfilePage ? "page" : undefined}
              aria-label="Profile"
              title="Profile"
            >
              {profileLabel}
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

            <button
              className="navbar__menu-button"
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((currentValue) => !currentValue);
                setIsPointsOpen(false);
                setIsPointsChartOpen(false);
              }}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>

            {isMobileMenuOpen ? (
              <div className="navbar__mobile-menu">
                <button
                  className={`navbar__mobile-link${
                    isContinentsPage ? " navbar__mobile-link--active" : ""
                  }`}
                  type="button"
                  onClick={() => navigateFromMenu("/continents")}
                  aria-current={isContinentsPage ? "page" : undefined}
                >
                  Continents
                </button>

                <div className="navbar__mobile-continent-list">
                  {continentLinks.map((continent) => (
                    <button
                      className="navbar__mobile-continent-link"
                      key={continent.label}
                      type="button"
                      onClick={() => navigateFromMenu(continent.path)}
                    >
                      {continent.label}
                    </button>
                  ))}
                </div>

                {shouldShowModeLinks ? (
                  <div className="navbar__mobile-mode-list">
                    {modeRoutes.map((mode) => {
                      const modePath = `${mode.pathPrefix}/${encodedCurrentContinent}`;
                      const isActiveMode =
                        currentSection === mode.pathPrefix.replace("/", "");

                      return (
                        <button
                          className={`navbar__mobile-mode-link${
                            isActiveMode
                              ? " navbar__mobile-mode-link--active"
                              : ""
                          }`}
                          key={mode.label}
                          type="button"
                          onClick={() => navigateFromMenu(modePath)}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <button
                  className={`navbar__mobile-link${
                    isAboutPage ? " navbar__mobile-link--active" : ""
                  }`}
                  type="button"
                  onClick={() => navigateFromMenu("/about")}
                  aria-current={isAboutPage ? "page" : undefined}
                >
                  About
                </button>

                <button
                  className={`navbar__mobile-link${
                    isProfilePage ? " navbar__mobile-link--active" : ""
                  }`}
                  type="button"
                  onClick={() => navigateFromMenu("/profile")}
                  aria-current={isProfilePage ? "page" : undefined}
                  aria-label="Profile"
                  title="Profile"
                >
                  Profile
                </button>

                <button
                  className="navbar__mobile-link"
                  type="button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : null}
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

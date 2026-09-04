import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserPoints, getResults } from "../api/quizApi";
import UserInfoCard from "../components/UserInfoCard";
import UserResultsCard from "../components/UserResultsCard";
import "./ProfilePage.css";

// how many questions exist for a continent: getQuestionCount
// user's total points and points per continent: getUserPointsSummary
// user's total points across all continents: getUserPoints

function ProfilePage() {
  const [showUserInfoCard, setShowUserInfoCard] = useState(false);
  const [showUserResultsCard, setShowUserResultsCard] = useState(false);
  const [results, setResults] = useState([]);
  const [points, setPoints] = useState(100);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showUserResultsCard) {
      return undefined;
    }

    let ignore = false;

    async function loadResults() {
      try {
        const response = await getResults();

        if (!ignore) {
          setResults(response);
        }
      } catch (error) {
        console.error("Could not load results:", error);
      }
    }

    loadResults();

    return () => {
      ignore = true;
    };
  }, [showUserResultsCard]);

  useEffect(() => {
    if (!showUserResultsCard) {
      return undefined;
    }

    let ignore = false;

    async function loadPoints() {
      try {
        const response = await getUserPoints();

        if (!ignore) {
          setPoints(response);
        }
      } catch (error) {
        console.error("Could not load points:", error);
      }
    }

    loadPoints();

    return () => {
      ignore = true;
    };
  }, [showUserResultsCard]);

  return (
    <main className="profile-page">
      {/* Visa meny för inloggat läge */}
      <Navbar variant="app" showAuthLinks points={points} />
      {/* BACK BUTTON */}
      <button
        className="profile-page__back"
        type="button"
        onClick={() => navigate("/continents")}
        aria-label="Go back to continents"
      >
        ←
      </button>

      {/* SECTION with Title, subtext and buttons to show cards */}
      <section className="profile-page__content">
        <h1 className="profile-page__logo">TRAVELY</h1>
        <p className="profile-page__tagline">
          Hi {user.name}! Welcome to your profile page.
        </p>
        <p className="profile-page__text">
          Make your choice below to see your user details or your game summary.
        </p>
        {/*  DIV for action buttons */}
        <div className="profile-page__actions">
          <button
            className="primary-button profile-page__show-info-button"
            onClick={() => setShowUserInfoCard(true)}
          >
            User details
          </button>
          <button
            className="primary-button profile-page__show-results-button"
            onClick={() => setShowUserResultsCard(true)}
          >
            Results
          </button>
        </div>
        {/* CARDS */}
        {showUserInfoCard ? (
          <UserInfoCard onClose={() => setShowUserInfoCard(false)} />
        ) : null}
        {showUserResultsCard ? (
          <UserResultsCard
            results={results}
            onClose={() => setShowUserResultsCard(false)}
          />
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;

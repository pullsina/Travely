import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import UserResultsCard from "../components/UserResultsCard";
import { getResults } from "../api/quizApi";
import "./ProfilePage.css";

function ProfilePage() {
  const { user } = useAuth();
  const [showUserInfoCard, setShowUserInfoCard] = useState(false);
  const [showUserResultsCard, setShowUserResultsCard] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showUserResultsCard) {
      return undefined;
    }

    let ignore = false;

    async function loadResults() {
      try {
        const response = await getResults();
        const loadedResults = Array.isArray(response)
          ? response
          : response?.results || [];

        if (!ignore) {
          setResults(loadedResults);
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

  return (
    <main className="profile-page">
      {/* Visa meny för inloggat läge */}
      <Navbar variant="app" showAuthLinks />
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
          <UserInfoCard
            user={user}
            onClose={() => setShowUserInfoCard(false)}
          />
        ) : null}
        {showUserResultsCard ? (
          <UserResultsCard
            results={results}
            user={user}
            onClose={() => setShowUserResultsCard(false)}
          />
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;

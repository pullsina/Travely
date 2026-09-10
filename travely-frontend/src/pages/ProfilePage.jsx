import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getProgress, getQuestionCount, getUserPoints } from "../api/quizApi";
import { getCurrentUser } from "../api/authApi";
import UserInfoCard from "../components/UserInfoCard";
import UserResultsCard from "../components/UserResultsCard";
import "./ProfilePage.css";

const continents = [
  { name: "Europe", apiValue: "Europe" },
  { name: "Africa", apiValue: "Africa" },
  { name: "North America", apiValue: "NorthAmerica" },
  { name: "South America", apiValue: "SouthAmerica" },
  { name: "Asia", apiValue: "Asia" },
  { name: "Oceania", apiValue: "Oceania" },
];

function ProfilePage() {
  const [showUserInfoCard, setShowUserInfoCard] = useState(false);
  const [showUserResultsCard, setShowUserResultsCard] = useState(false);
  const [results, setResults] = useState([]);
  const [points, setPoints] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function for loading user points
  useEffect(() => {
    let ignore = false;

    async function loadPoints() {
      try {
        const response = await getUserPoints();

        if (!ignore) {
          setPoints(response?.points ?? null);
        }
      } catch (error) {
        console.error("Could not load points:", error);
      }
    }

    loadPoints();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!showUserInfoCard) {
      return undefined;
    }

    let ignore = false;

    async function loadUserInfo() {
      try {
        const currentUser = await getCurrentUser();

        if (!ignore) {
          setUserInfo(currentUser);
        }
      } catch (error) {
        console.error("Could not load user info:", error);
      }
    }

    loadUserInfo();

    return () => {
      ignore = true;
    };
  }, [showUserInfoCard]);

  // Function for loading user results
  useEffect(() => {
    if (!showUserResultsCard) {
      return undefined;
    }

    let ignore = false;

    async function loadResults() {
      try {
        const resultEntries = await Promise.all(
          continents.map(async (continent) => {
            const [progress, totalQuestions] = await Promise.all([
              getProgress(continent.apiValue),
              getQuestionCount(continent.apiValue),
            ]);

            return {
              continent: continent.name,
              correctAnswers: progress?.correctAnswers ?? 0,
              answeredQuestions: progress?.answeredQuestions ?? 0,
              earnedScore: progress?.earnedScore ?? 0,
              usedHintsCount: progress?.usedHintsCount ?? 0,
              totalQuestions: totalQuestions ?? 0,
            };
          }),
        );

        if (!ignore) {
          setResults(resultEntries);
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
      <Navbar variant="app" points={points} />
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
            // user={user}
            onClick={() => setShowUserInfoCard(true)}
          >
            User details
          </button>
          <button
            className="primary-button profile-page__show-results-button"
            // user={user}
            onClick={() => setShowUserResultsCard(true)}
          >
            Results
          </button>
        </div>
        {/* CARDS */}
        {showUserInfoCard ? (
          <UserInfoCard
            userInfo={userInfo ?? user}
            onClose={() => setShowUserInfoCard(false)}
          />
        ) : null}
        {showUserResultsCard ? (
          <UserResultsCard
            results={results}
            // user={user}
            onClose={() => setShowUserResultsCard(false)}
          />
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;

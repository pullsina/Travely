import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import UserResultsCard from "../components/UserResultsCard";
import "./ProfilePage.css";

function ProfilePage() {
  const { user } = useAuth();
  const [showUserInfoCard, setShowUserInfoCard] = useState(false);
  const [showUserResultsCard, setShowUserResultsCard] = useState(false);
  const navigate = useNavigate();

  const results = [
  {
    continent: "Europe",
    correct: 8,
    total: 10,
  },
  {
    continent: "Asia",
    correct: 6,
    total: 10,
  },
  {
    continent: "Africa",
    correct: 9,
    total: 10,
  },
  {
    continent: "North America",
    correct: 5,
    total: 10,
  },
  {
    continent: "South America",
    correct: 7,
    total: 10,
  },
  {
    continent: "Oceania",
    correct: 4,
    total: 10,
  },
];

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
            user={user}
            onClose={() => setShowUserResultsCard(false)}
          />
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;

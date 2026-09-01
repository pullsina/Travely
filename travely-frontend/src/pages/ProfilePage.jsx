import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundMap from "../assets/background_map.png";
import "./ProfilePage.css";
import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard";
import UserResultsCard from "../components/UserResultsCard";

function ProfilePage() {
    const { user } = useAuth();
  const [showUserInfoCard, setShowUserInfoCard] = useState(false);
  const [showUserResultsCard, setShowUserResultsCard] = useState(false);
  const navigate = useNavigate();

  return (
    <main
      className="profile-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      {/* Visa meny för inloggat läge */}
      <Navbar variant="user" showAuthLinks />
      {/* BACK BUTTON */}
      <button
        className="game-page__back"
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
          Manage your profile and view your game summary
        </p>
        {/*  DIV for action buttons */}
        <div className="profile-page__actions">
          <button
            className="primary-button profile-page__button"
            onClick={() => setShowUserInfoCard(true)}
          >
            Show user details
          </button>
          <button
            className="primary-button profile-page__button"
            onClick={() => setShowUserResultsCard(true)}
          >
            Show user game summary
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
          <UserResultsCard onClose={() => setShowUserResultsCard(false)} />
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;
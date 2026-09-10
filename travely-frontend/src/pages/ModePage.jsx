import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPoints } from "../api/quizApi";
import Navbar from "../components/Navbar";
import "./ModePage.css";

function ModePage() {
  const navigate = useNavigate();
  const { continent } = useParams();

  const [points, setPoints] = useState(100);

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const pointsResponse = await getUserPoints();
        setPoints(pointsResponse?.points ?? 100);
      } catch (error) {
        console.error("Failed to load user points:", error);
      }
    };

    loadPoints();
  }, []);

  const handlePractice = () => {
    navigate(`/practice/${continent}`);
  };

  const handleChallenge = () => {
    navigate(`/game/${continent}`);
  };

  return (
    <main className="mode-page">
      <Navbar variant="app" points={points} />

      <button
        className="mode-page__back"
        type="button"
        onClick={() => navigate("/continents")}
        aria-label="Go back to continents"
      >
        ←
      </button>

      <section className="mode-card" aria-labelledby="mode-title">
        <header className="mode-card__header">
          <h1 id="mode-title" className="mode-card__title">
            Choose your mode
          </h1>

          <p className="mode-card__continent">{continent}</p>

          <p className="mode-card__text">
            Are you improving your knowledge or testing your skills?
          </p>
        </header>

        <div className="mode-card__options">
          <button
            className="mode-card__button"
            type="button"
            onClick={handlePractice}
          >
            <span className="mode-card__button-title">Practice Mode</span>
            <span className="mode-card__button-description">
              Practice as many times as you like, at your own pace. No points
              will be earned in Practice Mode.
            </span>
          </button>

          <button
            className="mode-card__button"
            type="button"
            onClick={handleChallenge}
          >
            <span className="mode-card__button-title">Challenge Mode</span>
            <span className="mode-card__button-description">
              Ready to test your knowledge and earn points? You have a limited
              number of attempts.
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ModePage;

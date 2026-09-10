import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPoints } from "../api/quizApi";
import Navbar from "../components/Navbar";
import africaBackground from "../assets/continent-backgrounds/africa_bg.png";
import asiaBackground from "../assets/continent-backgrounds/asia_bg.png";
import europeBackground from "../assets/continent-backgrounds/europe_bg.png";
import northAmericaBackground from "../assets/continent-backgrounds/north_america_bg.png";
import oceaniaBackground from "../assets/continent-backgrounds/oceania_bg.png";
import southAmericaBackground from "../assets/continent-backgrounds/south_amerca_bg.png";
import "./ModePage.css";

const continentConfig = {
  Europe: { label: "Europe", backgroundImage: europeBackground },
  Africa: { label: "Africa", backgroundImage: africaBackground },
  Asia: { label: "Asia", backgroundImage: asiaBackground },
  Oceania: { label: "Oceania", backgroundImage: oceaniaBackground },
  "North America": {
    label: "North America",
    backgroundImage: northAmericaBackground,
  },
  "South America": {
    label: "South America",
    backgroundImage: southAmericaBackground,
  },
};

function ModePage() {
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;

  const [points, setPoints] = useState(null);

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const pointsResponse = await getUserPoints();
        setPoints(pointsResponse?.points ?? null);
      } catch (error) {
        console.error("Failed to load user points:", error);
      }
    };

    loadPoints();
  }, []);

  const handleLearning = () => {
    navigate(`/learning/${continent}`);
  };

  const handlePractice = () => {
    navigate(`/practice/${continent}`);
  };

  const handleChallenge = () => {
    navigate(`/game/${continent}`);
  };

  return (
    <main
      className="mode-page"
      style={{
        "--continent-background": `url(${currentContinent.backgroundImage})`,
      }}
    >
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

          <p className="mode-card__continent">{currentContinent.label}</p>

          <p className="mode-card__text">
            Are you learning, practicing or testing your skills?
          </p>
        </header>

        <div className="mode-card__options">
          <button
            className="mode-card__button"
            type="button"
            onClick={handleLearning}
          >
            <span className="mode-card__button-title">Learning Mode</span>
            <span className="mode-card__button-description">
              Learn about countries first, with facts, flags and capitals before
              you start answering.
            </span>
          </button>

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

import Navbar from "../components/Navbar";
import europeImage from "../assets/continents/europe.png";
import africaImage from "../assets/continents/africa.png";
import northAmericaImage from "../assets/continents/north-america.png";
import southAmericaImage from "../assets/continents/south-america.png";
import asiaImage from "../assets/continents/asia.png";
import oceaniaImage from "../assets/continents/oceania.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgress, getQuestionCount, getUserPoints } from "../api/quizApi";
import "./ContinentPage.css";

const continents = [
  { name: "Europe", apiValue: "Europe", image: europeImage },
  { name: "Africa", apiValue: "Africa", image: africaImage },
  { name: "North America", apiValue: "NorthAmerica", image: northAmericaImage },
  { name: "South America", apiValue: "SouthAmerica", image: southAmericaImage },
  { name: "Asia", apiValue: "Asia", image: asiaImage },
  { name: "Oceania", apiValue: "Oceania", image: oceaniaImage },
];

function ContinentPage() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(100);
  const [continentProgress, setContinentProgress] = useState({});

  useEffect(() => {
    let ignore = false;

    async function loadPoints() {
      try {
        const response = await getUserPoints();

        if (!ignore) {
          setPoints(response?.points ?? 100);
        }
      } catch (error) {
        console.error("Could not load user points:", error);
      }
    }

    loadPoints();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadContinentProgress() {
      try {
        const progressEntries = await Promise.all(
          continents.map(async (continent) => {
            const [progress, totalQuestions] = await Promise.all([
              getProgress(continent.apiValue),
              getQuestionCount(continent.apiValue),
            ]);

            return [
              continent.name,
              {
                answered: progress?.answeredQuestions || 0,
                total: totalQuestions || 0,
              },
            ];
          }),
        );

        if (!ignore) {
          setContinentProgress(Object.fromEntries(progressEntries));
        }
      } catch (error) {
        console.error("Could not load continent progress:", error);
      }
    }

    loadContinentProgress();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="continent-page">
      <Navbar variant="app" points={points} />

      <header className="continent-page__header">
        <h1 className="continent-page__logo">TRAVELY</h1>
        <p className="continent-page__subtitle">
          Pick a continent to start the game
        </p>
      </header>

      <section className="continent-page__grid" aria-label="Continents">
        {continents.map((continent) => (
          <button
            className="continent-page__card"
            key={continent.name}
            type="button"
            onClick={() => navigate(`/game/${encodeURIComponent(continent.name)}`)}
            style={{ backgroundImage: `url(${continent.image})` }}
          >
            <span className="continent-page__card-name">{continent.name}</span>
            <span className="continent-page__card-progress">
              {continentProgress[continent.name]?.answered || 0}/
              {continentProgress[continent.name]?.total || 0}
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default ContinentPage;

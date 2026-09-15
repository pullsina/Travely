import Navbar from "../components/Navbar";
import europeImage from "../assets/continents/europe.png";
import africaImage from "../assets/continents/africa.png";
import northAmericaImage from "../assets/continents/north-america.png";
import southAmericaImage from "../assets/continents/south-america.png";
import asiaImage from "../assets/continents/asia.png";
import oceaniaImage from "../assets/continents/oceania.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionCount, getUserPoints } from "../api/quizApi";
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
  const [points, setPoints] = useState(null);
  const [continentQuestionCounts, setContinentQuestionCounts] = useState({});

  useEffect(() => {
    let ignore = false;

    async function loadPoints() {
      try {
        const response = await getUserPoints();

        if (!ignore) {
          setPoints(response?.points ?? null);
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

    async function loadContinentQuestionCounts() {
      try {
        const countEntries = await Promise.all(
          continents.map(async (continent) => {
            const totalQuestions = await getQuestionCount(continent.apiValue);

            return [
              continent.name,
              totalQuestions || 0,
            ];
          }),
        );

        if (!ignore) {
          setContinentQuestionCounts(Object.fromEntries(countEntries));
        }
      } catch (error) {
        console.error("Could not load continent question counts:", error);
      }
    }

    loadContinentQuestionCounts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="continent-page">
      <Navbar variant="app" points={points} />

      <header className="continent-page__header">
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
            onClick={() => navigate(`/mode/${encodeURIComponent(continent.name)}`)}
            style={{ backgroundImage: `url(${continent.image})` }}
          >
            <span className="continent-page__card-name">{continent.name}</span>
            <span className="continent-page__card-progress">
              {continentQuestionCounts[continent.name] || 0} questions
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default ContinentPage;

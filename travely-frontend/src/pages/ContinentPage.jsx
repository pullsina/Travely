import Navbar from "../components/Navbar";
import europeImage from "../assets/continents/europe.png";
import africaImage from "../assets/continents/africa.png";
import northAmericaImage from "../assets/continents/north-america.png";
import southAmericaImage from "../assets/continents/south-america.png";
import asiaImage from "../assets/continents/asia.png";
import oceaniaImage from "../assets/continents/oceania.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPoints } from "../api/quizApi";
import "./ContinentPage.css";

const continents = [
  { name: "Europe", image: europeImage },
  { name: "Africa", image: africaImage },
  { name: "North America", image: northAmericaImage },
  { name: "South America", image: southAmericaImage },
  { name: "Asia", image: asiaImage },
  { name: "Oceania", image: oceaniaImage },
];

function ContinentPage() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(100);

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
            <span>{continent.name}</span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default ContinentPage;

import Navbar from "../components/Navbar";
import europeImage from "../assets/continents/europe.png";
import africaImage from "../assets/continents/africa.png";
import northAmericaImage from "../assets/continents/north-america.png";
import southAmericaImage from "../assets/continents/south-america.png";
import asiaImage from "../assets/continents/asia.png";
import oceaniaImage from "../assets/continents/oceania.png";
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
  return (
    <main className="continent-page">
      <Navbar variant="app" points={100} />

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
            onClick={() => onStartGame(continent.name)}
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

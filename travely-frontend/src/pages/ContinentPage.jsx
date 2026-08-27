import europeImage from '../assets/continents/europe.png'
import africaImage from '../assets/continents/africa.png'
import northAmericaImage from '../assets/continents/north-america.png'
import southAmericaImage from '../assets/continents/south-america.png'
import asiaImage from '../assets/continents/asia.png'
import oceaniaImage from '../assets/continents/oceania.png'
import './ContinentPage.css'

const continents = [
  { name: 'Europe', image: europeImage },
  { name: 'Africa', image: africaImage },
  { name: 'North America', image: northAmericaImage },
  { name: 'South America', image: southAmericaImage },
  { name: 'Asia', image: asiaImage },
  { name: 'Oceania', image: oceaniaImage },
]

function ContinentPage({ onBack }) {
  return (
    <main className="continent-page">
      <button className="continent-page__back" onClick={onBack} aria-label="Go back">
        ←
      </button>

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
            style={{ backgroundImage: `url(${continent.image})` }}
          >
            <span>{continent.name}</span>
          </button>
        ))}
      </section>

      <div className="continent-page__points" aria-label="Current points">
        100 p
      </div>
    </main>
  )
}

export default ContinentPage

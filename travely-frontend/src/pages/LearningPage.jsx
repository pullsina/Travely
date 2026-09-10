import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLearningCountries, getUserPoints } from "../api/quizApi";
import africaBackground from "../assets/continent-backgrounds/africa_bg.png";
import asiaBackground from "../assets/continent-backgrounds/asia_bg.png";
import europeBackground from "../assets/continent-backgrounds/europe_bg.png";
import northAmericaBackground from "../assets/continent-backgrounds/north_america_bg.png";
import oceaniaBackground from "../assets/continent-backgrounds/oceania_bg.png";
import southAmericaBackground from "../assets/continent-backgrounds/south_amerca_bg.png";
import "./LearningPage.css";

const continentConfig = {
  Europe: {
    label: "Europe",
    apiValue: "Europe",
    backgroundImage: europeBackground,
  },
  Africa: {
    label: "Africa",
    apiValue: "Africa",
    backgroundImage: africaBackground,
  },
  Asia: { label: "Asia", apiValue: "Asia", backgroundImage: asiaBackground },
  Oceania: {
    label: "Oceania",
    apiValue: "Oceania",
    backgroundImage: oceaniaBackground,
  },
  "North America": {
    label: "North America",
    apiValue: "NorthAmerica",
    backgroundImage: northAmericaBackground,
  },
  "South America": {
    label: "South America",
    apiValue: "SouthAmerica",
    backgroundImage: southAmericaBackground,
  },
};

const fallbackFactImageUrl = "/images/countries/hints/fallback.png";
const continentOptions = Object.values(continentConfig);

function LearningPage() {
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;
  const learningCardStorageKey = `travely-learning-card-${currentContinent.apiValue}`;

  const [points, setPoints] = useState(null);
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(null);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [isContinentPickerOpen, setIsContinentPickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const cardRef = useRef(null);

  const currentCountry = countries[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex >= countries.length - 1;

  useEffect(() => {
    let ignore = false;

    async function loadPoints() {
      try {
        const response = await getUserPoints();

        if (!ignore) {
          setPoints(response?.points ?? null);
        }
      } catch {
        if (!ignore) {
          setPoints(null);
        }
      }
    }

    loadPoints();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadLearningCountries() {
      setIsLoading(true);
      setPageError("");
      setCountries([]);
      setCurrentIndex(0);
      setIsCountryListOpen(false);

      try {
        const response = await getLearningCountries(currentContinent.apiValue);

        if (!ignore) {
          const learningCountries = response || [];
          const savedIndex = Number(
            window.sessionStorage.getItem(learningCardStorageKey),
          );
          const safeIndex =
            Number.isInteger(savedIndex) &&
            savedIndex >= 0 &&
            savedIndex < learningCountries.length
              ? savedIndex
              : 0;

          setCountries(learningCountries);
          setCurrentIndex(safeIndex);
        }
      } catch (error) {
        if (!ignore) {
          setPageError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadLearningCountries();

    return () => {
      ignore = true;
    };
  }, [currentContinent.apiValue, learningCardStorageKey]);

  useEffect(() => {
    if (!countries.length) {
      return;
    }

    window.sessionStorage.setItem(learningCardStorageKey, String(currentIndex));
  }, [countries.length, currentIndex, learningCardStorageKey]);

  useEffect(() => {
    const cardElement = cardRef.current;

    if (!cardElement) {
      return undefined;
    }

    function updateCardHeight() {
      setCardHeight(cardElement.getBoundingClientRect().height);
    }

    updateCardHeight();

    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(updateCardHeight);
    observer.observe(cardElement);

    return () => observer.disconnect();
  }, [currentCountry]);

  function handlePreviousCard() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function handleNextCard() {
    setCurrentIndex((index) => Math.min(index + 1, countries.length - 1));
  }

  function handleImageError(event) {
    if (!event.currentTarget.src.endsWith(fallbackFactImageUrl)) {
      event.currentTarget.src = fallbackFactImageUrl;
    }
  }

  return (
    <main
      className="learning-page"
      style={{
        "--continent-background": `url(${currentContinent.backgroundImage})`,
      }}
    >
      <Navbar variant="app" points={points} />

      <button
        className="learning-page__back"
        type="button"
        onClick={() => navigate(`/mode/${currentContinent.label}`)}
        aria-label="Go back to mode selection"
      >
        ←
      </button>

      <section className="learning-page__content">
        <label className="learning-page__continent-picker">
          <span className="learning-page__select-label">
            Choose continent
          </span>
          <select
            className="learning-page__continent-select"
            value={currentContinent.label}
            onFocus={() => setIsContinentPickerOpen(true)}
            onBlur={() => setIsContinentPickerOpen(false)}
            onMouseDown={() => setIsContinentPickerOpen(true)}
            onChange={(event) => {
              setIsContinentPickerOpen(false);
              navigate(`/learning/${encodeURIComponent(event.target.value)}`);
            }}
          >
            {continentOptions.map((continentOption) => (
              <option
                key={continentOption.label}
                value={continentOption.label}
              >
                {continentOption.label}
              </option>
            ))}
          </select>
        </label>
        <p className="learning-page__text">
          Learn countries, capitals, flags and facts before you start the quiz.
        </p>

        {isLoading ? (
          <p className="learning-page__message">Loading countries...</p>
        ) : null}

        {!isLoading && pageError ? (
          <p className="learning-page__message learning-page__message--error">
            {pageError}
          </p>
        ) : null}

        {!isLoading && !pageError && !currentCountry ? (
          <p className="learning-page__message">
            No countries found for this continent.
          </p>
        ) : null}

        {!isLoading && !pageError && currentCountry ? (
          <div
            className={
              isContinentPickerOpen
                ? "learning-page__study learning-page__study--muted"
                : "learning-page__study"
            }
            style={
              cardHeight
                ? { "--learning-card-height": `${cardHeight}px` }
                : undefined
            }
          >
            <button
              className="learning-country-list-toggle"
              type="button"
              onClick={() => setIsCountryListOpen((isOpen) => !isOpen)}
              aria-expanded={isCountryListOpen}
              aria-controls="learning-country-list"
            >
              <span aria-hidden="true">☰</span>
              Countries
              <strong>{currentIndex + 1} / {countries.length}</strong>
            </button>

            <aside
              className={
                isCountryListOpen
                  ? "learning-country-list learning-country-list--open"
                  : "learning-country-list"
              }
              aria-label="Countries"
            >
              <h2 className="learning-country-list__title">
                Countries
                <span>{countries.length}</span>
              </h2>

              <div
                className={
                  isCountryListOpen
                    ? "learning-country-list__items learning-country-list__items--open"
                    : "learning-country-list__items"
                }
                id="learning-country-list"
              >
                {countries.map((country, index) => (
                  <button
                    className={
                      index === currentIndex
                        ? "learning-country-list__item learning-country-list__item--active"
                        : "learning-country-list__item"
                    }
                    type="button"
                    key={country.questionId}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsCountryListOpen(false);
                    }}
                    aria-current={index === currentIndex ? "true" : undefined}
                  >
                    {country.flagUrl ? (
                      <img
                        src={country.flagUrl}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{country.country}</span>
                  </button>
                ))}
              </div>
            </aside>

            <article className="learning-card" ref={cardRef}>
              <p className="learning-card__progress">
                {currentIndex + 1} / {countries.length}
              </p>

              <div className="learning-card__top">
                {currentCountry.flagUrl ? (
                  <img
                    className="learning-card__flag"
                    src={currentCountry.flagUrl}
                    alt={`${currentCountry.country} flag`}
                  />
                ) : null}

                <div>
                  <h2 className="learning-card__country">
                    {currentCountry.country}
                  </h2>
                  <p className="learning-card__capital">
                    Capital: {currentCountry.capital || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="learning-card__body">
                <img
                  className="learning-card__image"
                  src={currentCountry.factUrl || fallbackFactImageUrl}
                  alt={`${currentCountry.country} fun fact`}
                  onError={handleImageError}
                />

                <div className="learning-card__fact">
                  <h3>DID YOU KNOW?</h3>
                  <p>{currentCountry.fact || "More facts are coming soon."}</p>
                </div>
            </div>

            <div className="learning-card__actions">
              <div className="learning-card__action-group">
                <button
                  className="learning-card__button learning-card__button--secondary"
                  type="button"
                  onClick={handlePreviousCard}
                  disabled={isFirstCard}
                >
                  ← Previous
                </button>

                <button
                  className="learning-card__button"
                  type="button"
                  onClick={handleNextCard}
                  disabled={isLastCard}
                >
                  Next →
                </button>
              </div>

              <div className="learning-card__action-group">
                <button
                  className="learning-card__button learning-card__button--challenge"
                  type="button"
                  onClick={() => navigate(`/practice/${currentContinent.label}`)}
                >
                  Start practice
                </button>

                <button
                  className="learning-card__button learning-card__button--challenge"
                  type="button"
                  onClick={() => navigate(`/game/${currentContinent.label}`)}
                >
                  Start challenge
                </button>
              </div>
            </div>
          </article>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default LearningPage;

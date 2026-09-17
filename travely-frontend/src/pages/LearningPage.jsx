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
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const cardRef = useRef(null);
  const cardSwipeStartRef = useRef(null);
  const lastCardSwipeAtRef = useRef(0);

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

  function handleCardTouchStart(event) {
    const interactiveButton = event.target.closest("button");

    if (interactiveButton && !interactiveButton.dataset.swipeSurface) {
      cardSwipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    cardSwipeStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handleCardTouchEnd(event) {
    const swipeStart = cardSwipeStartRef.current;
    cardSwipeStartRef.current = null;

    if (!swipeStart) {
      return;
    }

    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - swipeStart.x;
    const verticalDistance = touch.clientY - swipeStart.y;

    if (
      Math.abs(horizontalDistance) < 50 ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
    ) {
      return;
    }

    if (horizontalDistance < 0) {
      handleNextCard();
    } else {
      handlePreviousCard();
    }

    lastCardSwipeAtRef.current = Date.now();
  }

  function openEnlargedImage(image) {
    if (Date.now() - lastCardSwipeAtRef.current < 400) {
      return;
    }

    setEnlargedImage(image);
  }

  function handleImageError(event) {
    if (!event.currentTarget.src.endsWith(fallbackFactImageUrl)) {
      event.currentTarget.src = fallbackFactImageUrl;
    }
  }

  useEffect(() => {
    if (!enlargedImage) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setEnlargedImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedImage]);

  return (
    <main
      className="learning-page"
      style={{
        "--continent-background": `url(${currentContinent.backgroundImage})`,
      }}
    >
      <Navbar variant="app" points={points} />

      <section className="learning-page__content">
        <div className="learning-page__heading-row">
          <button
            className="learning-page__back"
            type="button"
            onClick={() => navigate(`/mode/${currentContinent.label}`)}
            aria-label="Go back to mode selection"
          >
            ←
          </button>

          <label className="learning-page__continent-picker">
            <span className="learning-page__select-label">
              Choose continent
            </span>
            <select
              className="learning-page__continent"
              value={currentContinent.label}
              onChange={(event) =>
                navigate(`/learning/${encodeURIComponent(event.target.value)}`)
              }
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
        </div>
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
            className="learning-page__study"
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
              <span
                className={`learning-country-list-toggle__icon${
                  isCountryListOpen
                    ? " learning-country-list-toggle__icon--open"
                    : ""
                }`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </span>
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

            <article
              className="learning-card"
              ref={cardRef}
              onTouchStart={handleCardTouchStart}
              onTouchEnd={handleCardTouchEnd}
            >
              <p className="learning-card__progress">
                {currentIndex + 1} / {countries.length}
              </p>

              <div className="learning-card__top">
                {currentCountry.flagUrl ? (
                  <button
                    className="learning-card__image-open learning-card__flag-open"
                    type="button"
                    data-swipe-surface="true"
                    onClick={() =>
                      openEnlargedImage({
                        src: currentCountry.flagUrl,
                        alt: `${currentCountry.country} flag`,
                      })
                    }
                    aria-label={`Enlarge ${currentCountry.country} flag`}
                  >
                    <img
                      className="learning-card__flag"
                      src={currentCountry.flagUrl}
                      alt={`${currentCountry.country} flag`}
                    />
                  </button>
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
                <div className="learning-card__image-wrap">
                  <button
                    className="learning-card__image-open"
                    type="button"
                    data-swipe-surface="true"
                    onClick={() =>
                      openEnlargedImage({
                        src:
                          currentCountry.factUrl || fallbackFactImageUrl,
                        alt: `${currentCountry.country} fun fact`,
                      })
                    }
                    aria-label={`Enlarge ${currentCountry.country} image`}
                  >
                    <img
                      className="learning-card__image"
                      src={currentCountry.factUrl || fallbackFactImageUrl}
                      alt={`${currentCountry.country} fun fact`}
                      onError={handleImageError}
                    />
                  </button>

                  <div className="learning-card__image-navigation">
                    <button
                      className="learning-card__image-button"
                      type="button"
                      onClick={handlePreviousCard}
                      disabled={isFirstCard}
                      aria-label="Previous country"
                    >
                      <span aria-hidden="true">←</span>
                    </button>

                    <button
                      className="learning-card__image-button"
                      type="button"
                      onClick={handleNextCard}
                      disabled={isLastCard}
                      aria-label="Next country"
                    >
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>

                <div className="learning-card__fact">
                  <h3>DID YOU KNOW?</h3>
                  <p>{currentCountry.fact || "More facts are coming soon."}</p>
                </div>
              </div>

            <div className="learning-card__actions">
              <div className="learning-card__action-group learning-card__action-group--navigation">
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
                  Practice
                </button>

                <button
                  className="learning-card__button learning-card__button--challenge"
                  type="button"
                  onClick={() => navigate(`/game/${currentContinent.label}`)}
                >
                  Challenge
                </button>
              </div>
            </div>
          </article>
          </div>
        ) : null}
      </section>

      {enlargedImage ? (
        <div
          className="learning-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={enlargedImage.alt}
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="learning-image-viewer__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="learning-image-viewer__close"
              type="button"
              onClick={() => setEnlargedImage(null)}
              aria-label="Close enlarged image"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>

            <button
              className="learning-image-viewer__image-button"
              type="button"
              onClick={() => setEnlargedImage(null)}
              aria-label="Close enlarged image"
            >
              <img src={enlargedImage.src} alt={enlargedImage.alt} />
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default LearningPage;

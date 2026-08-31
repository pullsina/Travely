import "./CountryInfoCard.css";

const fallbackFactImageUrl = "/images/countries/hints/fallback.png";

function CountryInfoCard({
  country = {},
  isCorrect = false,
  pointsEarned = 0,
  onNext,
}) {
  const countryName = country.name || "Unknown country";
  const capital = country.capital || "Unknown capital";
  const funFact = country.funFact || "More facts about this country are coming soon.";
  const factImageUrl = country.factImageUrl || fallbackFactImageUrl;
  const flagUrl = country.flagUrl;

  return (
    <section className="country-info-card" aria-labelledby="country-info-title">
      <div
        className={
          isCorrect
            ? "country-info-card__result country-info-card__result--correct"
            : "country-info-card__result country-info-card__result--incorrect"
        }
      >
        <p className="country-info-card__result-title">
          <span aria-hidden="true">{isCorrect ? "✓" : "✕"}</span>
          {isCorrect ? "Correct!" : "Not quite"}
        </p>

        {isCorrect ? (
          <p className="country-info-card__points">+{pointsEarned} points</p>
        ) : (
          <p className="country-info-card__correct-answer">
            Correct answer: {countryName}
          </p>
        )}
      </div>

      <div className="country-info-card__hero">
        {flagUrl && (
          <img
            className="country-info-card__flag"
            src={flagUrl}
            alt={`${countryName} flag`}
          />
        )}

        <div>
          <h1 id="country-info-title" className="country-info-card__title">
            {countryName}
          </h1>
          <p className="country-info-card__capital">Capital: {capital}</p>
        </div>
      </div>

      <div className="country-info-card__info">
        <div className="country-info-card__media">
          <img src={factImageUrl} alt={`${countryName} fun fact`} />
        </div>

        <div className="country-info-card__fact-panel">
          <h2 className="country-info-card__fact-title">Did you know?</h2>
          <p className="country-info-card__fact">{funFact}</p>
        </div>
      </div>

      <div className="country-info-card__actions">
        <button
          className="primary-button country-info-card__button"
          type="button"
          onClick={onNext}
        >
          Next question →
        </button>
      </div>
    </section>
  );
}

export default CountryInfoCard;

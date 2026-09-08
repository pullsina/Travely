import "./ContinentCompleteCard.css";

function ContinentCompleteCard({
  continent,
  progress,
  onBackToContinents,
  onViewProfile,
}) {
  const answeredQuestions = progress?.answeredQuestions || 0;
  const correctAnswers = progress?.correctAnswers || 0;
  const wrongAnswers = progress?.wrongAnswers || 0;
  const earnedScore = progress?.earnedScore || 0;
  const usedHintsCount = progress?.usedHintsCount || 0;

  const stats = [
    { label: "Questions answered", value: answeredQuestions },
    { label: "Correct answers", value: correctAnswers },
    { label: "Wrong answers", value: wrongAnswers },
    { label: "Score earned", value: `${earnedScore} p` },
    { label: "Hints used", value: usedHintsCount },
  ];

  return (
    <section className="continent-complete-card" aria-labelledby="continent-complete-title">
      <p className="continent-complete-card__eyebrow">Continent completed</p>
      <h1 id="continent-complete-title" className="continent-complete-card__title">
        {continent}
      </h1>

      <div className="continent-complete-card__stats" aria-label="Game statistics">
        {stats.map((stat) => (
          <div className="continent-complete-card__stat" key={stat.label}>
            <span className="continent-complete-card__stat-value">{stat.value}</span>
            <span className="continent-complete-card__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="continent-complete-card__actions">
        <button
          className="primary-button continent-complete-card__button"
          type="button"
          onClick={onBackToContinents}
        >
          Back to continents
        </button>
        <button
          className="continent-complete-card__profile-link"
          type="button"
          onClick={onViewProfile}
        >
          View profile
        </button>
      </div>
    </section>
  );
}

export default ContinentCompleteCard;

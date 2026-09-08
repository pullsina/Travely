import "./UserResultsCard.css";

function UserResultsCard({ results, onClose }) {
  const resultEntries = Array.isArray(results)
    ? results
    : results?.results || [];

  return (
    <section
      className="user-results-card"
      aria-labelledby="user-results-card-title"
    >
      <div className="user-results-card__actions">
        <button
          className="primary-button user-results-card__actions__close-button"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {resultEntries.map((progress) => {
        const correctAnswers = progress?.correctAnswers || 0;
        const answeredQuestions = progress?.answeredQuestions || 0;
        const totalQuestions = progress?.totalQuestions || 0;
        const earnedScore = progress?.earnedScore || 0;
        const usedHintsCount = progress?.usedHintsCount || 0;
        const percentage = (correctAnswers / totalQuestions) * 100;
        const stats = [
          { label: "Correct answers", value: correctAnswers },
          { label: "Questions answered", value: answeredQuestions },
          { label: "Hints used", value: usedHintsCount },
          { label: "Score earned", value: `${earnedScore} p` },
        ];

        return (
          <section
            className="user-results-card__continent"
            key={progress.continent}
          >
            <div className="user-results-card__progressbar">
              {/* Show results for each continent - as a progress bar */}
              <h2 className="user-results-card__title">{progress.continent}</h2>
              <div className="user-results-card__list-result__progressbar-background">
                <div
                  className="user-results-card__list-result__progressbar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            {/* Show results for each continent - as a list */}
            <div className="user-results-card__list">
              {stats.map((stat) => (
                <div
                  className="user-results-card__list-result"
                  key={stat.label}
                >
                  <span className="user-results-card__list-result-label">
                    {stat.label}
                  </span>
                  <span className="user-results-card__list-result-value">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {resultEntries.length === 0 ? (
        <p className="user-results-card__empty">No results available yet.</p>
      ) : null}
    </section>
  );
}

export default UserResultsCard;

import "./UserResultsCard.css";

// Submits the results as a property
function UserResultsCard({ results = [], onClose }) {
  return (
    <section className="user-results-card" aria-label="User results card">
      <h2>Results</h2>
      {/* list results per continent */}
      <div className="user-results-card__list">
        {results.map((result) => {
          // const to provide dynamic progress bar width
          const percentage =
            result.total > 0 ? (result.correct / result.total) * 100 : 0;

          return (
            // results per continent
            <div
              className="user-results-card__list-result"
              key={result.continent}
            >
              <div className="user-results-card__list-result-header">
                <span className="user-results-card__list-result-header__name">
                  {result.continent}
                </span>
                {/* Display the number of correct answered questions in relation to the total number of questions */}
                <span className="user-results-card__list-result-header__score">
                  {result.correct} / {result.total}
                </span>
              </div>
              <div className="user-results-card__list-result__progressbar">
                <div
                  className="user-results-card__list-result__progressbar-fill"
                  // component to provide dynamic progress bar width
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="user-results-card__actions">
        <button
          className="primary-button user-results-card__actions__close-button"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </section>
  );
}

export default UserResultsCard;

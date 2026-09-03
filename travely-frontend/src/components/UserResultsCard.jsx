import "./UserResultsCard.css";

// Submits the results as a property
function UserResultsCard({ results = [], onClose }) {
  return (
    <div className="user-results-card">
      <button
        className="primary-button user-results-card__back-button"
        type="button"
        onClick={onClose}
      >
        Back to profile
      </button>
      <h2>Results</h2>
      {/* list results */}
      {results.map((result) => {
        // const to provide dynamic progress bar width
        const percentage =
          result.total > 0 ? (result.correct / result.total) * 100 : 0;

        return (
          // results per continent
          <div
            className="user-results-card__continent-result"
            key={result.continent}
          >
            <div className="user-results-card__continent-result-header">
              <span className="user-results-card__continent-result-header__name">
                {result.continent}
              </span>
              {/* Display the number of correct answered questions in relation to the total number of questions */}
              <span className="user-results-card__continent-result-header__score">
                {result.correct} / {result.total}
              </span>
              {/* Display the number of correct answered questions in relation to the total number of answered questions */}
              <span className="user-results-card__continent-result-header__score">
                {result.correct} / {result.answered}
              </span>
              <p className="user-results-card__continent-result-header__text-smaller">
                To be implemented
              </p>
            </div>
            <div className="user-results-card__continent-result__progressbar">
              {/* component to provide dynamic progress bar width */}
              <div
                className="user-results-card__continent-result__progressbar-fill"
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
  );
}

export default UserResultsCard;

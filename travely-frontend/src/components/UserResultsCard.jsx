import "./UserResultsCard.css";

const results = [
  {
    continent: "Europe",
    correct: 8,
    total: 10,
  },
  {
    continent: "Asia",
    correct: 6,
    total: 10,
  },
  {
    continent: "Africa",
    correct: 9,
    total: 10,
  },
  {
    continent: "North America",
    correct: 5,
    total: 10,
  },
  {
    continent: "South America",
    correct: 7,
    total: 10,
  },
  {
    continent: "Oceania",
    correct: 4,
    total: 10,
  },
];

// Submits the results as a property
function UserResultsCard({ results }) {
  return (
    <div className="user-results-card">
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

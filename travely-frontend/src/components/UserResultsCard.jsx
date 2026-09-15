import "./UserResultsCard.css";

function UserResultsCard({ results, onClose }) {
  const resultEntries = Array.isArray(results)
    ? results
    : results?.results || [];
  const totalScoresUser = resultEntries.reduce(
    (acc, total) => acc + (total?.earnedScore || 0),
    0,
  );
  const totalScoresPossible = 5 * (44 + 23 + 48 + 54 + 12 + 14);
  return (
    <section className="user-results-card" aria-labelledby="user-results-card">
      <div className="user-results-card__header">
        <div className="user-results-card__heading">
          <h1 id="user-results-card" className="user-results-card__title">
            User results
          </h1>
        </div>
        <div className="user-results-card__actions">
          <button
            className="primary-button user-results-card__actions__close-button"
            type="button"
            onClick={onClose}
            aria-label="Close user results card"
          >
            Close
          </button>
        </div>
      </div>
      <div>
        <h2 className="user-results-card__title">Total result overview</h2>
      </div>

      <section className="user-results-card__total-result-overview">
        <div className="user-results-card__progressbar-label"></div>
        <div className="user-results-card__progressbar-background">
          <div
            className="user-results-card__progressbar-fill"
            style={{
              width: `${(totalScoresUser / totalScoresPossible) * 100}%`,
            }}
          />
        </div>
        <p>*** Will be replaced by donut chart ***</p>
      </section>

      <div>
        <h2 className="user-results-card__title">
          Result overview per continent
        </h2>
      </div>

      {resultEntries.map((progress) => {
        const correctAnswers = progress?.correctAnswers || 0;
        // const answeredQuestions = progress?.answeredQuestions || 0;
        const totalQuestions = progress?.totalQuestions || 0;
        const earnedScore = progress?.earnedScore || 0;
        // const usedHintsCount = progress?.usedHintsCount || 0;
        const totalScoresUser = 5 * (44 + 23 + 48 + 54 + 12 + 14); // per continent
        // const totalScoresPossible = totalScoresUser;
        const percentageScores = (earnedScore / totalScoresUser) * 100;
        const percentageCorrects = (correctAnswers / totalQuestions) * 100;

        // const stats = [
        //   { label: "Correct answers", value: correctAnswers },
        //   { label: "Questions answered", value: answeredQuestions },
        //   { label: "Hints used", value: usedHintsCount },
        //   { label: "Score earned", value: `${earnedScore} p` },
        // ];

        return (
          <section
            className="user-results-card__continent"
            key={progress.continent}
          >
            <div className="user-results-card__continent-grid">
              {/* Show results for each continent - as a progress bar */}
              <div className="user-results-card__progressbar-heading">
                <h3 className="user-results-card__progressbar-title">
                  {progress.continent}
                </h3>
              </div>
              {/* <div className="user-results-card__continent-subgrid"> */}
              <div className="user-results-card__progressbar-label">
                <p>Percentage correct answers* </p>
              </div>
              <div className="user-results-card__progressbar-background">
                <div
                  className="user-results-card__progressbar-fill"
                  style={{ width: `${percentageCorrects}%` }}
                />
              </div>
              <div> </div>
              <div className="user-results-card__progressbar-label">
                <p>Percentage scores*</p>
              </div>
              <div className="user-results-card__progressbar-background">
                <div
                  className="user-results-card__progressbar-fill"
                  style={{ width: `${percentageScores}%` }}
                />
              </div>
              {/* </div> */}
            </div>
            <div className="user-results-card__progressbar">
              {/* Show results for each continent - as a progress bar */}
              {/* <h2 className="user-results-card__title">{progress.continent}</h2>
              <div className="user-results-card__list-result__progressbar-background">
                <div
                  className="user-results-card__list-result__progressbar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div> */}
            </div>
            {/* Show results for each continent - as a list */}
            <div className="user-results-card__list">
              {/* {stats.map((stat) => (
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
              ))} */}
            </div>
          </section>
        );
      })}
      <div>
        <p>
          *Percentages are calculated based on the number of correct answers out
          of the total number of questions and earned scores out of total
          possible scores.
        </p>
      </div>

      {resultEntries.length === 0 ? (
        <p className="user-results-card__empty">No results available yet.</p>
      ) : null}
    </section>
  );
}

export default UserResultsCard;

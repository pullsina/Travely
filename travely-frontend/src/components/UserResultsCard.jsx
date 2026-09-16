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
            User Result
          </h1>
        </div>
        <div className="user-results-card__actions">
          <button
            className="user-results-card__actions__close-button"
            type="button"
            onClick={onClose}
            aria-label="Close user results card"
            title="Close"
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="user-results-card__total-result-overview">
        <h2 className="user-results-card__section-title">
          Total result overview
        </h2>
        <div className="user-results-card__progressbar-background">
          <div
            className="user-results-card__progressbar-fill"
            style={{
              width: `${(totalScoresUser / totalScoresPossible) * 100}%`,
            }}
          />
        </div>
        <p className="user-results-card__placeholder">
          Donut chart will be added later.
        </p>
      </section>

      <section className="user-results-card__continent-results">
        <h2 className="user-results-card__section-title">
          Result overview per continent
        </h2>

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
            <h3 className="user-results-card__continent-title">
              {progress.continent}
            </h3>

            <div className="user-results-card__metric">
              <p className="user-results-card__progressbar-label">
                Correct answers
              </p>
              <div className="user-results-card__progressbar-background">
                <div
                  className="user-results-card__progressbar-fill"
                  style={{ width: `${percentageCorrects}%` }}
                />
              </div>
            </div>

            <div className="user-results-card__metric">
              <p className="user-results-card__progressbar-label">Score</p>
              <div className="user-results-card__progressbar-background">
                <div
                  className="user-results-card__progressbar-fill"
                  style={{ width: `${percentageScores}%` }}
                />
              </div>
            </div>
          </section>
        );
        })}
      </section>

      <div className="user-results-card__note">
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

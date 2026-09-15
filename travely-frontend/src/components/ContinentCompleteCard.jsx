import "./ContinentCompleteCard.css";
import { useState } from "react";

const difficultyPoints = {
  Easy: 5,
  Medium: 7,
  Hard: 10,
};

function ContinentCompleteCard({
  continent,
  progress,
  details = [],
  detailsError = "",
  onBackToContinents,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const answeredQuestions = progress?.answeredQuestions || 0;
  const correctAnswers = progress?.correctAnswers || 0;
  const wrongAnswers = progress?.wrongAnswers || 0;
  const earnedScore = progress?.earnedScore || 0;
  const usedHintsCount = progress?.usedHintsCount || 0;
  const maxScore = details.reduce(
    (totalScore, result) =>
      totalScore + (difficultyPoints[result.difficulty] || 0),
    0,
  );
  const scorePercent =
    maxScore > 0 ? Math.min((earnedScore / maxScore) * 100, 100) : 0;

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
          onClick={() => setIsDetailsOpen((currentValue) => !currentValue)}
          aria-expanded={isDetailsOpen}
        >
          Details
        </button>
      </div>

      {isDetailsOpen ? (
        <div className="continent-complete-card__details">
          <h2 className="continent-complete-card__details-title">
            Challenge details
          </h2>

          {detailsError ? (
            <p className="continent-complete-card__details-error">
              {detailsError}
            </p>
          ) : null}

          {!detailsError && details.length === 0 ? (
            <p className="continent-complete-card__details-empty">
              Details are loading...
            </p>
          ) : null}

          {!detailsError && details.length > 0 ? (
            <>
              <div className="continent-complete-card__score-bar">
                <div className="continent-complete-card__score-bar-header">
                  <span>Score</span>
                  <strong>
                    {earnedScore} / {maxScore} p
                  </strong>
                </div>
                <div
                  className="continent-complete-card__score-bar-track"
                  aria-hidden="true"
                >
                  <span
                    className="continent-complete-card__score-bar-fill"
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>

              <ul className="continent-complete-card__details-list">
                {details.map((result, index) => (
                  <li
                    className="continent-complete-card__details-item"
                    key={`${result.questionId}-${index}`}
                  >
                    <span
                      className={
                        result.isCorrect
                          ? "continent-complete-card__details-result continent-complete-card__details-result--correct"
                          : "continent-complete-card__details-result continent-complete-card__details-result--wrong"
                      }
                    >
                      {result.isCorrect ? "Correct" : "Wrong"}
                    </span>

                    <span className="continent-complete-card__details-country">
                      {result.country || `Question ${index + 1}`}
                    </span>

                    <span className="continent-complete-card__details-meta">
                      {result.difficulty} · {result.usedHintsCount} hints ·{" "}
                      {result.score} p
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default ContinentCompleteCard;

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
  onDoChallengeAgain,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [claimedRewardCode, setClaimedRewardCode] = useState(() => {
    return localStorage.getItem(`travely-reward-${continent}`);
  });
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const answeredQuestions = progress?.answeredQuestions || 0;
  const correctAnswers = progress?.correctAnswers || 0;
  const rewardDiscount = getRewardDiscount(correctAnswers, answeredQuestions);
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

  //function to calculate discount
  function getRewardDiscount(correctAnswers, answeredQuestions) {
    if (answeredQuestions === 0) {
      return 0;
    }

    const percentage = (correctAnswers / answeredQuestions) * 100;

    //if the users end result is less than 60% correct, no reward will be given
    if (percentage < 60) {
      return 0;
    }

    //if the users end result is less than 80% but more than 60% correct, a 5% reward will be given
    if (percentage < 80) {
      return 5;
    }

    //if none of the above (more than 80% correct) a 10% reward will be given
    return 10;
  }

  return (
    <section
      className="continent-complete-card"
      aria-labelledby="continent-complete-title"
    >
      <p className="continent-complete-card__eyebrow">Continent completed</p>
      <h1
        id="continent-complete-title"
        className="continent-complete-card__title"
      >
        {continent}
      </h1>

      <div
        className="continent-complete-card__stats"
        aria-label="Game statistics"
      >
        {stats.map((stat) => (
          <div className="continent-complete-card__stat" key={stat.label}>
            <span className="continent-complete-card__stat-value">
              {stat.value}
            </span>
            <span className="continent-complete-card__stat-label">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {rewardDiscount > 0 || claimedRewardCode ? (
        <div className="continent-complete-card__reward">
          {!claimedRewardCode ? (
            <>
              <p className="continent-complete-card__reward-title">
                Reward unlocked!
              </p>

              <p className="continent-complete-card__reward-text">
                Congratulations! You completed {continent} challenge and
                unlocked a {rewardDiscount}% travel discount.
              </p>

              <button
                className="primary-button continent-complete-card__reward-button"
                type="button"
                onClick={() => {
                  const rewardCode = `TRAVELY-${continent}-${rewardDiscount}`;

                  setClaimedRewardCode(rewardCode);

                  localStorage.setItem(
                    `travely-reward-${continent}`,
                    rewardCode,
                  );
                }}
              >
                Claim reward
              </button>
            </>
          ) : (
            <>
              <p className="continent-complete-card__reward-title">
                Your reward
              </p>

              <p className="continent-complete-card__reward-text">
                Your reward is ready to use.
              </p>

              <div className="continent-complete-card__reward-code-container">
                <span className="continent-complete-card__reward-code">
                  {claimedRewardCode}
                </span>

                <button
                  className="continent-complete-card__copy-button"
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(claimedRewardCode);
                    setIsCodeCopied(true);
                  }}
                >
                  {isCodeCopied ? "Copied!" : "Copy code"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}

      <div className="continent-complete-card__actions">
        <button
          className="primary-button continent-complete-card__button"
          type="button"
          onClick={onBackToContinents}
        >
          Back to continents
        </button>
        <button
          className="primary-button continent-complete-card__button"
          type="button"
          onClick={onDoChallengeAgain}
        >
          Do challenge again
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

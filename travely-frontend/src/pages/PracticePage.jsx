import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePracticeQuestion from "../hooks/usePracticeQuestion";
import africaBackground from "../assets/continent-backgrounds/africa_bg.png";
import asiaBackground from "../assets/continent-backgrounds/asia_bg.png";
import europeBackground from "../assets/continent-backgrounds/europe_bg.png";
import northAmericaBackground from "../assets/continent-backgrounds/north_america_bg.png";
import oceaniaBackground from "../assets/continent-backgrounds/oceania_bg.png";
import southAmericaBackground from "../assets/continent-backgrounds/south_amerca_bg.png";
import "./PracticePage.css";

// Configuration for each continent, including the label, API value, and background image
// it makes it easier to manage and update continent-related data in one place.
// it works well with the continent picker dropdown, as it allows for easy mapping of labels to API values and background images.

const continentConfig = {
  Europe: {
    label: "Europe",
    apiValue: "Europe",
    backgroundImage: europeBackground,
  },
  Africa: {
    label: "Africa",
    apiValue: "Africa",
    backgroundImage: africaBackground,
  },
  Asia: { label: "Asia", apiValue: "Asia", backgroundImage: asiaBackground },
  Oceania: {
    label: "Oceania",
    apiValue: "Oceania",
    backgroundImage: oceaniaBackground,
  },
  "North America": {
    label: "North America",
    apiValue: "NorthAmerica",
    backgroundImage: northAmericaBackground,
  },
  "South America": {
    label: "South America",
    apiValue: "SouthAmerica",
    backgroundImage: southAmericaBackground,
  },
};

// Create an array of continent options for the dropdown, derived from the continentConfig object

const continentOptions = Object.values(continentConfig);

function PracticePage() {
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;
  const practiceModeStorageKey = `travely-practice-mode-${currentContinent.apiValue}`;
  const [practiceMode, setPracticeMode] = useState(
    window.sessionStorage.getItem(practiceModeStorageKey),
  );

  // Use the custom hook to manage practice question state and actions
  // The hook returns various state variables and functions related to practice questions
  const {
    question,
    questionNumber,
    totalQuestions,
    selectedAnswerId,
    isAnswered,
    isCorrect,
    isRevealed,
    showInfo,
    isComplete,
    isLoading,
    error,
    loadNextQuestion,
    openInfo,
    revealAnswer,
    restartPractice,
    selectAnswer,
  } = usePracticeQuestion(currentContinent.apiValue);

  // Function to choose a practice mode and save it in session storage
  function choosePracticeMode(nextPracticeMode) {
    setPracticeMode(nextPracticeMode);
    window.sessionStorage.setItem(practiceModeStorageKey, nextPracticeMode);
  }

  // Function to clear the practice mode and remove it from session storage
  function clearPracticeMode() {
    setPracticeMode(null);
    window.sessionStorage.removeItem(practiceModeStorageKey);
  }

  // Load the next question when the continent changes or when there is no current question
  useEffect(() => {
    if (!question) {
      loadNextQuestion();
    }
  }, [currentContinent.apiValue, question]);

  // Update the practice mode state when the component mounts or when the practiceModeStorageKey changes
  useEffect(() => {
    setPracticeMode(window.sessionStorage.getItem(practiceModeStorageKey));
  }, [practiceModeStorageKey]);

  return (
    <main
      className="practice-page"
      style={{
        "--continent-background": `url(${currentContinent.backgroundImage})`,
      }}
    >
      <button
        className="practice-page__back"
        type="button"
        onClick={() => navigate(`/mode/${currentContinent.label}`)}
        aria-label="Go back to mode selection"
      >
        ←
      </button>

      <section className="practice-card" aria-labelledby="practice-title">
        <header className="practice-card__header">
          <h1 id="practice-title" className="practice-card__title">
            Practice Mode
          </h1>
          <label className="practice-card__continent-picker">
            <span className="practice-card__select-label">
              Choose continent
            </span>
            <select
              className="practice-card__continent-select"
              value={currentContinent.label}
              onChange={(event) =>
                navigate(`/practice/${encodeURIComponent(event.target.value)}`)
              }
            >
              {continentOptions.map((continentOption) => (
                <option
                  key={continentOption.label}
                  value={continentOption.label}
                >
                  {continentOption.label}
                </option>
              ))}
            </select>
          </label>
          <p className="practice-card__text">
            Choose what you want to practice.
          </p>
        </header>

        <div className="practice-card__options">
          <button
            className="practice-card__button"
            type="button"
            onClick={() => {
              choosePracticeMode("capitals");
            }}
            aria-pressed={practiceMode === "capitals"}
          >
            Countries & Capitals
          </button>

          <button
            className="practice-card__button"
            type="button"
            onClick={() => {
              choosePracticeMode("flags");
            }}
            aria-pressed={practiceMode === "flags"}
          >
            Flags & Countries
          </button>
        </div>

        {isLoading && (
          <p className="practice-page__message">Loading question...</p>
        )}
        {error && (
          <p className="practice-page__message practice-page__message--error">
            {error}
          </p>
        )}

        {practiceMode === "capitals" && (
          <p className="practice-page__message">
            Countries and capitals practice is coming next.
          </p>
        )}

        {practiceMode === "flags" && isComplete && (
          <section className="practice-complete">
            <h2>Flags practice complete!</h2>
            <p>
              You practiced all {totalQuestions} flags in{" "}
              {currentContinent.label}.
            </p>

            <div className="practice-complete__actions">
              <button
                className="practice-question__primary-action"
                type="button"
                onClick={restartPractice}
              >
                Practice again
              </button>

              <button
                className="practice-question__secondary-action"
                type="button"
                onClick={clearPracticeMode}
              >
                Choose another mode
              </button>
            </div>
          </section>
        )}

        {practiceMode === "flags" && !isComplete && question && (
          <section className="practice-question">
            <p className="practice-question__count">
              {questionNumber} / {totalQuestions || questionNumber}
            </p>

            <img
              className="practice-question__flag"
              src={question.flagUrl}
              alt={`${question.country} flag`}
            />
            <p className="practice-question__prompt">
              Which country has this flag?
            </p>

            <div className="practice-question__answers">
              {question.answers.map((answer) => (
                <button
                  className="practice-question__answer"
                  key={answer.answerId}
                  type="button"
                  onClick={() => selectAnswer(answer.answerId)}
                  disabled={isAnswered}
                  data-correct={
                    isAnswered && answer.answerId === question.questionId
                  }
                  data-incorrect={
                    isAnswered &&
                    selectedAnswerId === answer.answerId &&
                    answer.answerId !== question.questionId
                  }
                >
                  {answer.country}
                </button>
              ))}
            </div>

            {isAnswered && (
              <>
                {isRevealed ? (
                  <p className="practice-question__feedback">
                    Correct answer: {question.country}
                  </p>
                ) : (
                  <p
                    className={
                      isCorrect
                        ? "practice-question__feedback"
                        : "practice-question__feedback practice-question__feedback--incorrect"
                    }
                  >
                    {isCorrect
                      ? "Correct!"
                      : `Not quite. Correct answer: ${question.country}`}
                  </p>
                )}
              </>
            )}

            <button
              className="practice-question__dont-know"
              type="button"
              onClick={revealAnswer}
              disabled={isAnswered}
            >
              Don't know
            </button>

            {isAnswered && (
              <div className="practice-question__next-actions">
                <button
                  className="practice-question__secondary-action"
                  type="button"
                  onClick={openInfo}
                >
                  Read more
                </button>

                <button
                  className="practice-question__primary-action"
                  type="button"
                  onClick={loadNextQuestion}
                >
                  Next question →
                </button>
              </div>
            )}

            {showInfo && (
              <section
                className="practice-info"
                aria-label="Country information"
              >
                <div className="practice-info__header">
                  <img
                    className="practice-info__flag"
                    src={question.flagUrl}
                    alt={`${question.country} flag`}
                  />
                  <div>
                    <h2>{question.country}</h2>
                    <p>Capital: {question.question}</p>
                  </div>
                </div>

                <div className="practice-info__body">
                  {question.factUrl ? (
                    <img
                      className="practice-info__image"
                      src={question.factUrl}
                      alt={`${question.country} fun fact`}
                    />
                  ) : null}

                  <div className="practice-info__fact">
                    <h3>DID YOU KNOW?</h3>
                    <p>{question.fact || "More facts are coming soon."}</p>
                  </div>
                </div>
              </section>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default PracticePage;

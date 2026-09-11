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

const practiceTypes = {
  capitals: "CapitalToCountry",
  flags: "FlagToCountry",
};

const practiceDirectionOptions = {
  capitals: [
    { value: "CapitalToCountry", label: "Capital → Country" },
    { value: "CountryToCapital", label: "Country → Capital" },
  ],
  flags: [
    { value: "FlagToCountry", label: "Flag → Country" },
    { value: "CountryToFlag", label: "Country → Flag" },
  ],
};

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
  const [practiceDirection, setPracticeDirection] = useState(
    practiceTypes[practiceMode] || "",
  );
  const practiceType = practiceDirection || null;

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
  } = usePracticeQuestion(currentContinent.apiValue, practiceType);

  // Function to choose a practice mode and save it in session storage
  function choosePracticeMode(nextPracticeMode) {
    const nextDirection = practiceTypes[nextPracticeMode];

    setPracticeMode(nextPracticeMode);
    setPracticeDirection(nextDirection);
    window.sessionStorage.setItem(practiceModeStorageKey, nextPracticeMode);
  }

  // Function to clear the practice mode and remove it from session storage
  function clearPracticeMode() {
    setPracticeMode(null);
    setPracticeDirection("");
    window.sessionStorage.removeItem(practiceModeStorageKey);
  }

  // Load the next question when the continent changes or when there is no current question
  useEffect(() => {
    if (practiceType && !question && !isComplete) {
      loadNextQuestion();
    }
  }, [currentContinent.apiValue, practiceType, question, isComplete]);

  // Update the practice mode state when the component mounts or when the practiceModeStorageKey changes
  useEffect(() => {
    const savedPracticeMode = window.sessionStorage.getItem(
      practiceModeStorageKey,
    );

    setPracticeMode(savedPracticeMode);
    setPracticeDirection(practiceTypes[savedPracticeMode] || "");
  }, [practiceModeStorageKey]);

  function getCorrectAnswerText() {
    if (!question) {
      return "";
    }

    const correctAnswer = question.answers.find(
      (answer) => answer.answerId === question.correctAnswerId,
    );

    return correctAnswer?.text || question.country;
  }

  function getCorrectAnswer() {
    if (!question) {
      return null;
    }

    return question.answers.find(
      (answer) => answer.answerId === question.correctAnswerId,
    );
  }

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

        <div className="practice-card__switch-row">
          <div
            className="practice-card__direction-switch practice-card__direction-switch--left"
            role="group"
            aria-label="Choose capitals practice direction"
          >
            {practiceDirectionOptions.capitals.map((option) => (
              <button
                className="practice-card__direction-button"
                key={option.value}
                type="button"
                onClick={() => {
                  if (practiceMode === "capitals") {
                    setPracticeDirection(option.value);
                  }
                }}
                aria-pressed={practiceDirection === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div
            className="practice-card__options"
            role="group"
            aria-label="Choose practice type"
          >
            <button
              className="practice-card__button"
              type="button"
              onClick={() => {
                choosePracticeMode("capitals");
              }}
              aria-pressed={practiceMode === "capitals"}
            >
              Capitals
            </button>

            <button
              className="practice-card__button"
              type="button"
              onClick={() => {
                choosePracticeMode("flags");
              }}
              aria-pressed={practiceMode === "flags"}
            >
              Flags
            </button>
          </div>

          <div
            className="practice-card__direction-switch practice-card__direction-switch--right"
            role="group"
            aria-label="Choose flags practice direction"
          >
            {practiceDirectionOptions.flags.map((option) => (
              <button
                className="practice-card__direction-button"
                key={option.value}
                type="button"
                onClick={() => {
                  if (practiceMode === "flags") {
                    setPracticeDirection(option.value);
                  }
                }}
                aria-pressed={practiceDirection === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <p className="practice-page__message">Loading question...</p>
        )}
        {error && (
          <p className="practice-page__message practice-page__message--error">
            {error}
          </p>
        )}

        {practiceMode && isComplete && (
          <section className="practice-complete">
            <h2>Practice complete!</h2>
            <p>
              You practiced all {totalQuestions} questions in{" "}
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

        {practiceMode && !isComplete && question && (
          <section className="practice-question">
            <p className="practice-question__count">
              {questionNumber} / {totalQuestions || questionNumber}
            </p>

            {question.questionImageUrl ? (
              <img
                className="practice-question__flag"
                src={question.questionImageUrl}
                alt={`${question.country} flag`}
              />
            ) : (
              <p className="practice-question__text-question">
                {question.questionText}
              </p>
            )}
            <p className="practice-question__prompt">
              {question.questionImageUrl
                ? question.questionText
                : "Choose the correct answer."}
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
                    isAnswered && answer.answerId === question.correctAnswerId
                  }
                  data-incorrect={
                    isAnswered &&
                    selectedAnswerId === answer.answerId &&
                    answer.answerId !== question.correctAnswerId
                  }
                >
                  {answer.imageUrl ? (
                    <img
                      className="practice-question__answer-image"
                      src={answer.imageUrl}
                      alt={answer.text}
                    />
                  ) : (
                    answer.text
                  )}
                </button>
              ))}
            </div>

            {isAnswered && (
              <>
                {isRevealed ? (
                  <p className="practice-question__feedback">
                    Correct answer: {getCorrectAnswerText()}
                  </p>
                ) : isCorrect ? (
                  <p className="practice-question__feedback">Correct!</p>
                ) : practiceType === "CountryToFlag" ? (
                  <div className="practice-question__feedback practice-question__feedback--incorrect">
                    <span>Not quite. Correct answer:</span>
                    <img
                      className="practice-question__correct-answer-flag"
                      src={getCorrectAnswer()?.imageUrl}
                      alt={getCorrectAnswer()?.text}
                    />
                  </div>
                ) : (
                  <p className="practice-question__feedback practice-question__feedback--incorrect">
                    Not quite. Correct answer: {getCorrectAnswerText()}
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
                    <p>Capital: {question.capital}</p>
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

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePracticeQuestion from "../hooks/usePracticeQuestion";
import africaBackground from "../assets/continent-backgrounds/africa_bg.png";
import asiaBackground from "../assets/continent-backgrounds/asia_bg.png";
import europeBackground from "../assets/continent-backgrounds/europe_bg.png";
import northAmericaBackground from "../assets/continent-backgrounds/north_america_bg.png";
import oceaniaBackground from "../assets/continent-backgrounds/oceania_bg.png";
import southAmericaBackground from "../assets/continent-backgrounds/south_amerca_bg.png";
import correctFeedbackIcon from "../assets/feddback-icons/travely-correct-feedback.svg";
import wrongFeedbackIcon from "../assets/feddback-icons/travely-wrong-feedback.svg";
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
    { value: "CapitalToCountry", label: "Capital" },
    { value: "CountryToCapital", label: "Country" },
  ],
  flags: [
    { value: "FlagToCountry", label: "Flag" },
    { value: "CountryToFlag", label: "Country" },
  ],
};

const questionTypeLabels = {
  0: "FlagToCountry",
  1: "CountryToFlag",
  2: "CapitalToCountry",
  3: "CountryToCapital",
  FlagToCountry: "FlagToCountry",
  CountryToFlag: "CountryToFlag",
  CapitalToCountry: "CapitalToCountry",
  CountryToCapital: "CountryToCapital",
};

const practicePromptTexts = {
  FlagToCountry: "Which country has this flag?",
  CountryToFlag: "Which flag belongs to this country?",
  CapitalToCountry: "Which country has this capital?",
  CountryToCapital: "What is the capital of this country?",
};

function PracticePage() {
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;
  const practiceModeStorageKey = `travely-practice-mode-${currentContinent.apiValue}`;
  const practiceDirectionStorageKey = `travely-practice-direction-${currentContinent.apiValue}`;
  const savedPracticeMode = window.sessionStorage.getItem(
    practiceModeStorageKey,
  );
  const [practiceMode, setPracticeMode] = useState(savedPracticeMode);
  const [practiceDirection, setPracticeDirection] = useState(
    window.sessionStorage.getItem(practiceDirectionStorageKey) ||
      practiceTypes[savedPracticeMode] ||
      "",
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
    window.sessionStorage.setItem(practiceDirectionStorageKey, nextDirection);
  }

  // Function to clear the practice mode and remove it from session storage
  function clearPracticeMode() {
    setPracticeMode(null);
    setPracticeDirection("");
    window.sessionStorage.removeItem(practiceModeStorageKey);
    window.sessionStorage.removeItem(practiceDirectionStorageKey);
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
    const savedPracticeDirection = window.sessionStorage.getItem(
      practiceDirectionStorageKey,
    );

    setPracticeMode(savedPracticeMode);
    setPracticeDirection(
      savedPracticeDirection || practiceTypes[savedPracticeMode] || "",
    );
  }, [practiceDirectionStorageKey, practiceModeStorageKey]);

  function choosePracticeDirection(nextDirection) {
    setPracticeDirection(nextDirection);
    window.sessionStorage.setItem(practiceDirectionStorageKey, nextDirection);
  }

  const currentQuestionType =
    questionTypeLabels[question?.questionType] || practiceType;

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
                title={`Switch between ${option.label.toLowerCase()} questions`}
                type="button"
                onClick={() => {
                  if (practiceMode === "capitals") {
                    choosePracticeDirection(option.value);
                  }
                }}
                aria-pressed={practiceDirection === option.value}
                aria-label={`Switch between ${option.label.toLowerCase()} questions`}
              >
                <span className="practice-card__direction-label">
                  {option.label}
                </span>
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
                title={`Switch between ${option.label.toLowerCase()} questions`}
                type="button"
                onClick={() => {
                  if (practiceMode === "flags") {
                    choosePracticeDirection(option.value);
                  }
                }}
                aria-pressed={practiceDirection === option.value}
                aria-label={`Switch between ${option.label.toLowerCase()} questions`}
              >
                <span className="practice-card__direction-label">
                  {option.label}
                </span>
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
              <div className="practice-question__question-row">
                <img
                  className="practice-question__flag"
                  src={question.questionImageUrl}
                  alt={`${question.country} flag`}
                />
                {isAnswered && (
                  <img
                    className="practice-question__feedback-icon"
                    src={isCorrect ? correctFeedbackIcon : wrongFeedbackIcon}
                    alt={isCorrect ? "Correct answer" : "Wrong answer"}
                  />
                )}
              </div>
            ) : (
              <div className="practice-question__question-row">
                <p className="practice-question__text-question">
                  {question.questionText}
                </p>
                {isAnswered && (
                  <img
                    className="practice-question__feedback-icon"
                    src={isCorrect ? correctFeedbackIcon : wrongFeedbackIcon}
                    alt={isCorrect ? "Correct answer" : "Wrong answer"}
                  />
                )}
              </div>
            )}
            <p className="practice-question__prompt">
              <span>
                {practicePromptTexts[currentQuestionType] ||
                  "Choose the correct answer."}
              </span>
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

            {!isAnswered && (
              <button
                className="practice-question__dont-know"
                type="button"
                onClick={revealAnswer}
              >
                Don't know
              </button>
            )}

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

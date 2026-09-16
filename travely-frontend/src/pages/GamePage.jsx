import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ContinentCompleteCard from "../components/ContinentCompleteCard";
import CountryInfoCard from "../components/CountryInfoCard";
import QuestionCard from "../components/QuestionCard";
import africaOutline from "../assets/continent-outlines/africa.png";
import asiaOutline from "../assets/continent-outlines/asia.png";
import europeOutline from "../assets/continent-outlines/europe.png";
import northAmericaOutline from "../assets/continent-outlines/north-america.png";
import oceaniaOutline from "../assets/continent-outlines/oceania.png";
import southAmericaOutline from "../assets/continent-outlines/south-america.png";
import {
  completeChallenge,
  getNextQuestion,
  getProgress,
  getQuestionCount,
  getResults,
  getUserPoints,
  submitAnswers,
} from "../api/quizApi";
import "./GamePage.css";

// ---------------------------
// Continent configuration
// ---------------------------
const continentConfig = {
  Europe: { label: "Europe", apiValue: "Europe", mapImage: europeOutline },
  Africa: { label: "Africa", apiValue: "Africa", mapImage: africaOutline },
  Asia: { label: "Asia", apiValue: "Asia", mapImage: asiaOutline },
  Oceania: { label: "Oceania", apiValue: "Oceania", mapImage: oceaniaOutline },
  "North America": {
    label: "North America",
    apiValue: "NorthAmerica",
    mapImage: northAmericaOutline,
  },
  "South America": {
    label: "South America",
    apiValue: "SouthAmerica",
    mapImage: southAmericaOutline,
  },
};

// ---------------------------
// Labels from backend enums
// ---------------------------
const difficultyLabels = {
  0: "Easy",
  1: "Medium",
  2: "Hard",
  Easy: "Easy",
  Medium: "Medium",
  Hard: "Hard",
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

const questionPromptTexts = {
  FlagToCountry: "Which country has this flag?",
  CountryToFlag: "Which flag belongs to this country?",
  CapitalToCountry: "Which country has this capital?",
  CountryToCapital: "What is the capital of this country?",
};

// ---------------------------
// Hint and timer settings
// ---------------------------
const capitalHintQuestionTypes = new Set(["FlagToCountry", "CountryToFlag"]);

const QUESTION_TIME_LIMIT = 15;
const INFO_CARD_TIME_LIMIT = 5;
const PAUSE_TIMER_FOR_DESIGN = false;
const LEAVE_CHALLENGE_WARNING =
  "Are you sure you want to leave? Your current challenge progress and unsaved points will be lost.";

// ---------------------------
// Small helpers
// ---------------------------
function haveSameQuestionIds(firstIds = [], secondIds = []) {
  if (firstIds.length !== secondIds.length) {
    return false;
  }

  return firstIds.every((id, index) => id === secondIds[index]);
}

// ---------------------------
// Page component
// ---------------------------
function GamePage() {
  // ---------------------------
  // Router and selected continent
  // ---------------------------
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;

  // ---------------------------
  // Game state
  // ---------------------------
  const [points, setPoints] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [challengeAnswers, setChallengeAnswers] = useState([]);

  // ---------------------------
  // Hint and answer state
  // ---------------------------
  const [hintType, setHintType] = useState("map");
  const [usedHints, setUsedHints] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [showCountryInfo, setShowCountryInfo] = useState(false);

  // ---------------------------
  // Progress and UI state
  // ---------------------------
  const [savedProgress, setSavedProgress] = useState(null);
  const [isContinentComplete, setIsContinentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [gameError, setGameError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [resultDetails, setResultDetails] = useState([]);
  const [resultDetailsError, setResultDetailsError] = useState("");
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [infoTimeLeft, setInfoTimeLeft] = useState(INFO_CARD_TIME_LIMIT);

  // Current question is saved so refresh does not change the active question.
  const currentQuestionStorageKey = `travely-current-question-${currentContinent.apiValue}`;
  const challengeAttemptStorageKey = `travely-challenge-attempt-${currentContinent.apiValue}`;

  // Prevent the next button and info-card timer from moving twice at the same time.
  const isMovingToNextQuestion = useRef(false);
  const challengeAnswersRef = useRef([]);

  // ---------------------------
  // Derived values for rendering
  // ---------------------------
  const visibleTotalQuestions = totalQuestions || questionNumber;
  const possibleQuestionPoints = question
    ? Math.max(question.points - usedHints.length, 0)
    : 0;
  const isSubmitted = Boolean(answerResult);
  const isCorrect = Boolean(answerResult?.isCorrect);
  const hasActiveChallengeAttempt =
    !isContinentComplete &&
    (challengeAnswers.length > 0 || Boolean(question) || Boolean(answerResult));

  // ---------------------------
  // Load total question count
  // ---------------------------
  useEffect(() => {
    let ignore = false;

    async function loadQuestionCount() {
      try {
        const count = await getQuestionCount(currentContinent.apiValue);

        if (!ignore) {
          setTotalQuestions(count);
        }
      } catch (error) {
        if (!ignore) {
          setGameError(error.message);
        }
      }
    }

    loadQuestionCount();

    return () => {
      ignore = true;
    };
  }, [currentContinent.apiValue]);

  // ---------------------------
  // Load saved user progress and points
  // ---------------------------
  useEffect(() => {
    let ignore = false;

    async function loadSavedProgress() {
      setIsProgressLoaded(false);
      setQuestion(null);
      setQuestionNumber(1);
      setUsedQuestionIds([]);
      setChallengeAnswers([]);
      setHintType("map");
      setUsedHints([]);
      setSelectedAnswerId(null);
      setAnswerResult(null);
      setShowCountryInfo(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setSavedProgress(null);
      setIsContinentComplete(false);
      setGameError("");
      setSubmitError("");
      setResultDetails([]);
      setResultDetailsError("");

      try {
        const progress = await getProgress(currentContinent.apiValue);
        const pointsResponse = await getUserPoints();

        if (!ignore) {
          const answeredQuestionIds = progress?.answeredQuestionIds || [];
          const savedAttemptText = window.sessionStorage.getItem(
            challengeAttemptStorageKey,
          );
          const savedAttempt = savedAttemptText
            ? JSON.parse(savedAttemptText)
            : null;
          const savedAnswers = savedAttempt?.answers || [];
          const pendingQuestionIds = savedAnswers.map(
            (answer) => answer.questionId,
          );
          const allAnsweredQuestionIds = [
            ...new Set([...answeredQuestionIds, ...pendingQuestionIds]),
          ];

          setUsedQuestionIds(allAnsweredQuestionIds);
          challengeAnswersRef.current = savedAnswers;
          setChallengeAnswers(savedAnswers);
          setQuestionNumber(allAnsweredQuestionIds.length + 1);
          setPoints(pointsResponse?.points ?? null);
          setSavedProgress(progress);
        }
      } catch (error) {
        if (!ignore) {
          setGameError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsProgressLoaded(true);
        }
      }
    }

    loadSavedProgress();

    return () => {
      ignore = true;
    };
  }, [challengeAttemptStorageKey, currentContinent.apiValue]);

  // ---------------------------
  // Load or restore the current question
  // ---------------------------
  useEffect(() => {
    let ignore = false;

    if (!isProgressLoaded) {
      return undefined;
    }

    async function loadQuestion() {
      setIsLoading(true);
      setGameError("");
      setSubmitError("");

      try {
        const savedQuestionText = window.sessionStorage.getItem(
          currentQuestionStorageKey,
        );

        if (savedQuestionText) {
          const savedQuestionState = JSON.parse(savedQuestionText);
          const savedQuestion = savedQuestionState?.question;
          const savedQuestionIds = savedQuestionState?.usedQuestionIds || [];

          if (
            savedQuestion &&
            !usedQuestionIds.includes(savedQuestion.questionId) &&
            haveSameQuestionIds(savedQuestionIds, usedQuestionIds)
          ) {
            if (!ignore) {
              setQuestion(savedQuestion);
              setHintType(savedQuestionState.hintType || "map");
              setUsedHints(savedQuestionState.usedHints || []);
              setSelectedAnswerId(savedQuestionState.selectedAnswerId || null);
              setTimeLeft(savedQuestionState.timeLeft || QUESTION_TIME_LIMIT);
            }

            return;
          }
        }

        const nextQuestion = await getNextQuestion(
          currentContinent.apiValue,
          usedQuestionIds,
        );

        if (!ignore) {
          if (!nextQuestion) {
            const answersToSave = challengeAnswersRef.current;
            const latestProgress =
              answersToSave.length > 0
                ? await completeChallenge(
                    currentContinent.apiValue,
                    answersToSave,
                  )
                : await getProgress(currentContinent.apiValue);
            const pointsResponse = await getUserPoints();

            window.sessionStorage.removeItem(challengeAttemptStorageKey);
            window.sessionStorage.removeItem(currentQuestionStorageKey);

            setSavedProgress(latestProgress);
            setPoints(pointsResponse?.points ?? null);
            setChallengeAnswers([]);
            setIsContinentComplete(true);
            setQuestion(null);
            return;
          }

          setIsContinentComplete(false);
          setQuestion(nextQuestion);
          setTimeLeft(QUESTION_TIME_LIMIT);
        }
      } catch (error) {
        if (!ignore) {
          setGameError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadQuestion();

    return () => {
      ignore = true;
    };
  }, [
    currentContinent.apiValue,
    challengeAttemptStorageKey,
    currentQuestionStorageKey,
    isProgressLoaded,
    usedQuestionIds,
  ]);

  // ---------------------------
  // Load detailed results after completing a continent
  // ---------------------------
  useEffect(() => {
    let ignore = false;

    if (!isContinentComplete) {
      return undefined;
    }

    async function loadResultDetails() {
      try {
        const details = await getResults(currentContinent.apiValue);

        if (!ignore) {
          setResultDetails(details || []);
          setResultDetailsError("");
        }
      } catch (error) {
        if (!ignore) {
          setResultDetailsError(error.message);
        }
      }
    }

    loadResultDetails();

    return () => {
      ignore = true;
    };
  }, [currentContinent.apiValue, isContinentComplete]);

  // ---------------------------
  // Save current question state for refresh
  // ---------------------------
  useEffect(() => {
    if (!isProgressLoaded || !question || answerResult) {
      return;
    }

    window.sessionStorage.setItem(
      currentQuestionStorageKey,
      JSON.stringify({
        question,
        usedQuestionIds,
        hintType,
        usedHints,
        selectedAnswerId,
        timeLeft,
      }),
    );
  }, [
    answerResult,
    currentQuestionStorageKey,
    hintType,
    isProgressLoaded,
    question,
    selectedAnswerId,
    timeLeft,
    usedHints,
    usedQuestionIds,
  ]);

  // ---------------------------
  // Save pending challenge answers for refresh
  // ---------------------------
  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }

    challengeAnswersRef.current = challengeAnswers;

    if (challengeAnswers.length === 0) {
      window.sessionStorage.removeItem(challengeAttemptStorageKey);
      return;
    }

    window.sessionStorage.setItem(
      challengeAttemptStorageKey,
      JSON.stringify({ answers: challengeAnswers }),
    );
  }, [challengeAnswers, challengeAttemptStorageKey, isProgressLoaded]);

  // ---------------------------
  // Question timer
  // ---------------------------
  useEffect(() => {
    if (
      PAUSE_TIMER_FOR_DESIGN ||
      !question ||
      answerResult ||
      showCountryInfo ||
      isContinentComplete
    ) {
      return undefined;
    }

    // Automatically submit the answer when the timer reaches zero
    if (timeLeft <= 0) {
      handleSubmit(selectedAnswerId ?? -1);
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((currentTime) => Math.max(currentTime - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [answerResult, isContinentComplete, question, showCountryInfo, timeLeft]);

  // ---------------------------
  // Show country info after submitted answer
  // ---------------------------
  useEffect(() => {
    if (!answerResult) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setShowCountryInfo(true);
    }, 1800);

    return () => window.clearTimeout(timerId);
  }, [answerResult]);

  // ---------------------------
  // Automatically continue after showing country info
  // ---------------------------
  useEffect(() => {
    if (!showCountryInfo || !question || isContinentComplete) {
      return undefined;
    }

    if (infoTimeLeft <= 0) {
      handleNextQuestion();
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setInfoTimeLeft((currentTime) => Math.max(currentTime - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [showCountryInfo, question, isContinentComplete, infoTimeLeft]);

  // ---------------------------
  // Allow next-question action again after a new question has loaded
  // ---------------------------
  useEffect(() => {
    isMovingToNextQuestion.current = false;
  }, [question?.questionId]);

  // ---------------------------
  // Warn before leaving an active challenge
  // ---------------------------
  useEffect(() => {
    if (!hasActiveChallengeAttempt) {
      return undefined;
    }

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = LEAVE_CHALLENGE_WARNING;
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasActiveChallengeAttempt]);

  // ---------------------------
  // Event handlers
  // ---------------------------
  function handleHint(nextHintType) {
    setHintType(nextHintType);

    if (usedHints.includes(nextHintType)) {
      return;
    }

    setUsedHints((currentHints) => [...currentHints, nextHintType]);
  }

  function handleSelectAnswer(answerId) {
    if (isSubmitted) {
      return;
    }

    setSelectedAnswerId(answerId);
    setSubmitError("");
  }

  function handleLeaveChallenge() {
    if (hasActiveChallengeAttempt && !window.confirm(LEAVE_CHALLENGE_WARNING)) {
      return;
    }

    window.sessionStorage.removeItem(currentQuestionStorageKey);
    window.sessionStorage.removeItem(challengeAttemptStorageKey);
    navigate("/continents");
  }

  async function handleSubmit(answerIdOverride) {
    if (!question) {
      return;
    }

    const answerIdToSubmit =
      typeof answerIdOverride === "number"
        ? answerIdOverride
        : selectedAnswerId;

    if (!answerIdToSubmit) {
      setSubmitError("Please choose an answer first.");
      return;
    }

    try {
      const result = await submitAnswers(
        question.questionId,
        answerIdToSubmit,
        usedHints.length,
      );
      window.sessionStorage.removeItem(currentQuestionStorageKey);
      setAnswerResult(result);
      setChallengeAnswers((currentAnswers) => {
        const nextAnswers = [
          ...currentAnswers.filter(
            (answer) => answer.questionId !== question.questionId,
          ),
          {
            questionId: question.questionId,
            answerId: answerIdToSubmit,
            usedHintsCount: usedHints.length,
          },
        ];

        challengeAnswersRef.current = nextAnswers;

        return nextAnswers;
      });
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  function handleNextQuestion() {
    if (isMovingToNextQuestion.current) {
      return;
    }

    if (!question) {
      return;
    }

    isMovingToNextQuestion.current = true;

    // Reset active-question state before loading the next one.
    window.sessionStorage.removeItem(currentQuestionStorageKey);
    setUsedQuestionIds((currentIds) => [...currentIds, question.questionId]);
    setQuestionNumber((currentNumber) => currentNumber + 1);
    setHintType("map");
    setUsedHints([]);
    setSelectedAnswerId(null);
    setAnswerResult(null);
    setShowCountryInfo(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setInfoTimeLeft(INFO_CARD_TIME_LIMIT);
    setIsContinentComplete(false);
    setSubmitError("");
  }

  // ---------------------------
  // Data prepared for child components
  // ---------------------------
  const answers =
    question?.answers.map((answer) => ({
      id: answer.answerId,
      label: answer.text || answer.country,
      imageUrl: answer.imageUrl,
    })) || [];

  const correctCountry = question?.country || "Unknown country";
  const questionText = question?.questionText || question?.question;
  const questionType = questionTypeLabels[question?.questionType];
  const promptText =
    questionPromptTexts[questionType] ||
    question?.questionText ||
    "Choose the correct answer.";
  const primaryHintType = capitalHintQuestionTypes.has(questionType)
    ? "capital"
    : "flag";
  const primaryHintLabel =
    primaryHintType === "capital" ? "Capital - 1 p" : "Flag - 1 p";

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <main className="game-page">
      <Navbar variant="app" points={points} />

      <button
        className="game-page__back"
        type="button"
        onClick={handleLeaveChallenge}
        aria-label="Go back to continents"
      >
        ←
      </button>

      {isLoading && <p className="game-page__message">Loading question...</p>}

      {!isLoading && gameError && (
        <p className="game-page__message game-page__message--error">
          {gameError}
        </p>
      )}

      {!isLoading && !gameError && isContinentComplete ? (
        <ContinentCompleteCard
          continent={currentContinent.label}
          progress={savedProgress}
          details={resultDetails}
          detailsError={resultDetailsError}
          onBackToContinents={() => navigate("/continents")}
        />
      ) : null}

      {!isLoading &&
      !gameError &&
      !isContinentComplete &&
      question &&
      showCountryInfo ? (
        <CountryInfoCard
          country={{
            name: correctCountry,
            capital: question.capital || question.question,
            funFact: question.fact,
            flagUrl: question.flagUrl,
            factImageUrl: question.factUrl,
            mapOutlineUrl: currentContinent.mapImage,
          }}
          isCorrect={isCorrect}
          pointsEarned={answerResult?.score || 0}
          secondsLeft={infoTimeLeft}
          onNext={handleNextQuestion}
        />
      ) : null}

      {!isLoading &&
      !gameError &&
      !isContinentComplete &&
      question &&
      !showCountryInfo ? (
        <QuestionCard
          continent={currentContinent.label}
          questionNumber={questionNumber}
          totalQuestions={visibleTotalQuestions}
          difficulty={difficultyLabels[question.difficulty] || "Easy"}
          points={possibleQuestionPoints}
          timeLeft={timeLeft}
          capital={question.question}
          questionText={questionText}
          questionImageUrl={question.questionImageUrl}
          promptText={promptText}
          answers={answers}
          selectedAnswerId={selectedAnswerId}
          correctAnswerId={answerResult?.correctAnswerId}
          hintType={hintType}
          mapImage={currentContinent.mapImage}
          flagUrl={question.flagUrl}
          capitalHint={question.capital || question.question}
          factImageUrl={question.factUrl}
          factText={question.fact}
          primaryHintType={primaryHintType}
          primaryHintLabel={primaryHintLabel}
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
          submitError={submitError}
          onSelectAnswer={handleSelectAnswer}
          onPrimaryHint={() => handleHint(primaryHintType)}
          onFactHint={() => handleHint("fact")}
          onSubmit={() => handleSubmit()}
        />
      ) : null}
    </main>
  );
}

export default GamePage;

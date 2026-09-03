import { useEffect, useState } from "react";
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
  getNextQuestion,
  getProgress,
  getQuestionCount,
  getUserPoints,
  submitAnswers,
} from "../api/quizApi";
import "./GamePage.css";

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

const difficultyLabels = {
  0: "Easy",
  1: "Medium",
  2: "Hard",
  Easy: "Easy",
  Medium: "Medium",
  Hard: "Hard",
};

function haveSameQuestionIds(firstIds = [], secondIds = []) {
  if (firstIds.length !== secondIds.length) {
    return false;
  }

  return firstIds.every((id, index) => id === secondIds[index]);
}

// The GamePage component manages the state and logic for the quiz game, including loading questions, handling user answers, and displaying results.
function GamePage() {
  const navigate = useNavigate();
  const { continent } = useParams();
  const selectedContinent = decodeURIComponent(continent || "Europe");
  const currentContinent =
    continentConfig[selectedContinent] || continentConfig.Europe;

  const [points, setPoints] = useState(100);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [hintType, setHintType] = useState("map");
  const [usedHints, setUsedHints] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const [isContinentComplete, setIsContinentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [gameError, setGameError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const currentQuestionStorageKey = `travely-current-question-${currentContinent.apiValue}`;

  const visibleTotalQuestions = totalQuestions || questionNumber;
  const possibleQuestionPoints = question
    ? Math.max(question.points - usedHints.length, 0)
    : 0;
  const isSubmitted = Boolean(answerResult);
  const isCorrect = Boolean(answerResult?.isCorrect);

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

  useEffect(() => {
    let ignore = false;

    async function loadSavedProgress() {
      setIsProgressLoaded(false);
      setQuestion(null);
      setQuestionNumber(1);
      setUsedQuestionIds([]);
      setHintType("map");
      setUsedHints([]);
      setSelectedAnswerId(null);
      setAnswerResult(null);
      setShowCountryInfo(false);
      setSavedProgress(null);
      setIsContinentComplete(false);
      setGameError("");
      setSubmitError("");

      try {
        const progress = await getProgress(currentContinent.apiValue);
        const pointsResponse = await getUserPoints();

        if (!ignore) {
          const answeredQuestionIds = progress?.answeredQuestionIds || [];

          setUsedQuestionIds(answeredQuestionIds);
          setQuestionNumber(answeredQuestionIds.length + 1);
          setPoints(pointsResponse?.points ?? 100);
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
  }, [currentContinent.apiValue]);

  useEffect(() => {
    let ignore = false;

    if (!isProgressLoaded) {
      return undefined;
    }

    // This effect loads a new question whenever the continent or used question IDs change.
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
            const latestProgress = await getProgress(currentContinent.apiValue);

            setSavedProgress(latestProgress);
            setIsContinentComplete(true);
            setQuestion(null);
            return;
          }

          setIsContinentComplete(false);
          setQuestion(nextQuestion);
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
    currentQuestionStorageKey,
    isProgressLoaded,
    usedQuestionIds,
  ]);

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
      }),
    );
  }, [
    answerResult,
    currentQuestionStorageKey,
    hintType,
    isProgressLoaded,
    question,
    selectedAnswerId,
    usedHints,
    usedQuestionIds,
  ]);

  // This effect shows the country information after a delay when an answer is submitted.
  useEffect(() => {
    if (!answerResult) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setShowCountryInfo(true);
    }, 1800);

    return () => window.clearTimeout(timerId);
  }, [answerResult]);

  // This function handles the selection of hints, updating the hint type and deducting points if a new hint is used.
  function handleHint(nextHintType) {
    setHintType(nextHintType);

    if (usedHints.includes(nextHintType)) {
      return;
    }

    setUsedHints((currentHints) => [...currentHints, nextHintType]);
  }

  // This function handles the selection of an answer, updating the selected answer ID and clearing any previous submission errors.
  function handleSelectAnswer(answerId) {
    if (isSubmitted) {
      return;
    }

    setSelectedAnswerId(answerId);
    setSubmitError("");
  }

  // This function handles the submission of an answer, sending it to the API and updating the state with the result.
  async function handleSubmit() {
    if (!question) {
      return;
    }

    if (!selectedAnswerId) {
      setSubmitError("Please choose an answer first.");
      return;
    }

    try {
      const result = await submitAnswers(
        question.questionId,
        selectedAnswerId,
        usedHints.length,
      );
      window.sessionStorage.removeItem(currentQuestionStorageKey);
      setAnswerResult(result);
      setPoints((currentPoints) => currentPoints + result.score);
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  // This function handles moving to the next question, updating the state and navigating back to the continents page if all questions have been answered.
  function handleNextQuestion() {
    if (!question) {
      return;
    }

    // Reset state for the next question
    window.sessionStorage.removeItem(currentQuestionStorageKey);
    setUsedQuestionIds((currentIds) => [...currentIds, question.questionId]);
    setQuestionNumber((currentNumber) => currentNumber + 1);
    setHintType("map");
    setUsedHints([]);
    setSelectedAnswerId(null);
    setAnswerResult(null);
    setShowCountryInfo(false);
    setIsContinentComplete(false);
    setSubmitError("");
  }

  // Prepare the answers for the QuestionCard component, mapping them to the required format.
  const answers =
    question?.answers.map((answer) => ({
      id: answer.answerId,
      label: answer.country,
    })) || [];
  // Determine the correct country name for display in the CountryInfoCard component.
  const correctCountry = question?.country || "Unknown country";

  return (
    <main className="game-page">
      <Navbar variant="app" points={points} />

      <button
        className="game-page__back"
        type="button"
        onClick={() => navigate("/continents")}
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
          onBackToContinents={() => navigate("/continents")}
          onViewProfile={() => navigate("/profile")}
        />
      ) : null}

      {!isLoading && !gameError && !isContinentComplete && question && showCountryInfo ? (
        <CountryInfoCard
          country={{
            name: correctCountry,
            capital: question.question,
            funFact: question.fact,
            flagUrl: question.flagUrl,
            factImageUrl: question.factUrl,
            mapOutlineUrl: currentContinent.mapImage,
          }}
          isCorrect={isCorrect}
          pointsEarned={answerResult?.score || 0}
          onNext={handleNextQuestion}
        />
      ) : null}

      {!isLoading && !gameError && !isContinentComplete && question && !showCountryInfo ? (
        <QuestionCard
          continent={currentContinent.label}
          questionNumber={questionNumber}
          totalQuestions={visibleTotalQuestions}
          difficulty={difficultyLabels[question.difficulty] || "Easy"}
          points={possibleQuestionPoints}
          capital={question.question}
          answers={answers}
          selectedAnswerId={selectedAnswerId}
          correctAnswerId={answerResult?.correctAnswerId}
          hintType={hintType}
          mapImage={currentContinent.mapImage}
          flagUrl={question.flagUrl}
          factImageUrl={question.factUrl}
          factText={question.fact}
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
          submitError={submitError}
          onSelectAnswer={handleSelectAnswer}
          onFlagHint={() => handleHint("flag")}
          onFactHint={() => handleHint("fact")}
          onSubmit={handleSubmit}
        />
      ) : null}
    </main>
  );
}

export default GamePage;

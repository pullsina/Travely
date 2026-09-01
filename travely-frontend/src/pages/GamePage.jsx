import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountryInfoCard from "../components/CountryInfoCard";
import QuestionCard from "../components/QuestionCard";
import africaOutline from "../assets/continent-outlines/africa.png";
import asiaOutline from "../assets/continent-outlines/asia.png";
import europeOutline from "../assets/continent-outlines/europe.png";
import northAmericaOutline from "../assets/continent-outlines/north-america.png";
import oceaniaOutline from "../assets/continent-outlines/oceania.png";
import southAmericaOutline from "../assets/continent-outlines/south-america.png";
import { getRandomQuestion, submitAnswers } from "../api/quizApi";
import "./GamePage.css";

const totalQuestions = 10;

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

function getDifficulty(questionNumber) {
  if (questionNumber <= 3) {
    return "Easy";
  }

  if (questionNumber <= 7) {
    return "Medium";
  }

  return "Hard";
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
  const [question, setQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [hintType, setHintType] = useState("map");
  const [usedHints, setUsedHints] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameError, setGameError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const difficulty = getDifficulty(questionNumber);
  const isSubmitted = Boolean(answerResult);
  const isCorrect = Boolean(answerResult?.isCorrect);

  useEffect(() => {
    let ignore = false;
    // This effect loads a new question whenever the continent, difficulty, or used question IDs change.
    async function loadQuestion() {
      setIsLoading(true);
      setGameError("");
      setSubmitError("");

      try {
        const nextQuestion = await getRandomQuestion(
          currentContinent.apiValue,
          difficulty,
          usedQuestionIds,
        );

        if (!ignore) {
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
  }, [currentContinent.apiValue, difficulty, usedQuestionIds]);

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
    setPoints((currentPoints) => Math.max(currentPoints - 1, 0));
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
      const result = await submitAnswers(question.questionId, selectedAnswerId);
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

    if (questionNumber >= totalQuestions) {
      navigate("/continents");
      return;
    }

    // Reset state for the next question
    setUsedQuestionIds((currentIds) => [...currentIds, question.questionId]);
    setQuestionNumber((currentNumber) => currentNumber + 1);
    setHintType("map");
    setUsedHints([]);
    setSelectedAnswerId(null);
    setAnswerResult(null);
    setShowCountryInfo(false);
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

      {!isLoading && !gameError && question && showCountryInfo ? (
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

      {!isLoading && !gameError && question && !showCountryInfo ? (
        <QuestionCard
          continent={currentContinent.label}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
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

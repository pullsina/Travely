import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CountryInfoCard from "../components/CountryInfoCard";
import QuestionCard from "../components/QuestionCard";
import europeOutline from "../assets/continent-outlines/europe.png";
import { useNavigate } from "react-router-dom";
import "./GamePage.css";

const demoQuestion = {
  continent: "Europe",
  questionNumber: 6,
  totalQuestions: 10,
  capital: "Paris",
  correctAnswerId: 1,
  mapImage: europeOutline,
  flagUrl: "/images/countries/flags/france.svg",
  factImageUrl: "/images/countries/hints/france.jpg",
  factText: "The Eiffel Tower is located in this country.",
  countryInfo: {
    name: "France",
    capital: "Paris",
    funFact:
      "France is known for art, food, fashion, and landmarks like the Eiffel Tower.",
    flagUrl: "/images/countries/flags/france.svg",
    factImageUrl: "/images/countries/hints/france.jpg",
    mapOutlineUrl: europeOutline,
  },
  answers: [
    { id: 1, label: "France" },
    { id: 2, label: "Italy" },
    { id: 3, label: "Spain" },
    { id: 4, label: "Portugal" },
    { id: 5, label: "Germany" },
    { id: 6, label: "Poland" },
    { id: 7, label: "Belgium" },
    { id: 8, label: "Netherlands" },
  ],
};

function GamePage() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(100);
  const [hintType, setHintType] = useState("map");
  const [usedHints, setUsedHints] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isCorrect = selectedAnswerId === demoQuestion.correctAnswerId;

  useEffect(() => {
    if (!isSubmitted) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setShowCountryInfo(true);
    }, 1800);

    return () => window.clearTimeout(timerId);
  }, [isSubmitted]);

  function handleHint(nextHintType) {
    setHintType(nextHintType);

    if (usedHints.includes(nextHintType)) {
      return;
    }

    setUsedHints((currentHints) => [...currentHints, nextHintType]);
    setPoints((currentPoints) => Math.max(currentPoints - 1, 0));
  }

  function handleSelectAnswer(answerId) {
    if (isSubmitted) {
      return;
    }

    setSelectedAnswerId(answerId);
    setSubmitError("");
  }

  function handleSubmit() {
    if (!selectedAnswerId) {
      setSubmitError("Please choose an answer first.");
      return;
    }

    setIsSubmitted(true);
  }

  function handleNextQuestion() {
    setHintType("map");
    setUsedHints([]);
    setSelectedAnswerId(null);
    setIsSubmitted(false);
    setShowCountryInfo(false);
    setSubmitError("");
  }

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

      {showCountryInfo ? (
        <CountryInfoCard
          country={demoQuestion.countryInfo}
          isCorrect={isCorrect}
          pointsEarned={5}
          onNext={handleNextQuestion}
        />
      ) : (
        <QuestionCard
          continent={demoQuestion.continent}
          questionNumber={demoQuestion.questionNumber}
          totalQuestions={demoQuestion.totalQuestions}
          capital={demoQuestion.capital}
          answers={demoQuestion.answers}
          selectedAnswerId={selectedAnswerId}
          correctAnswerId={demoQuestion.correctAnswerId}
          hintType={hintType}
          mapImage={demoQuestion.mapImage}
          flagUrl={demoQuestion.flagUrl}
          factImageUrl={demoQuestion.factImageUrl}
          factText={demoQuestion.factText}
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
          submitError={submitError}
          onSelectAnswer={handleSelectAnswer}
          onFlagHint={() => handleHint("flag")}
          onFactHint={() => handleHint("fact")}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default GamePage;

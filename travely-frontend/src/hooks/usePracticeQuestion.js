import { useEffect, useState } from "react";
import { getNextPracticeQuestion, getQuestionCount } from "../api/quizApi";

// this function retrieves the saved practice state from sessionStorage for a given storage key.
function getSavedPracticeState(storageKey) {
  const savedStateText = window.sessionStorage.getItem(storageKey);

  if (!savedStateText) {
    return null;
  }

  try {
    return JSON.parse(savedStateText);
  } catch {
    window.sessionStorage.removeItem(storageKey);
    return null;
  }
}
// This custom hook manages the state of practice questions for a given continent and practice type.
function usePracticeQuestion(continent, practiceType) {
  const storageKey = `travely-practice-${continent}-${practiceType || "none"}`;
  const savedState = getSavedPracticeState(storageKey);

  // Stores the current practice question from the backend
  const [question, setQuestion] = useState(savedState?.question || null);

  // Stores question IDs that we already used in this practice round
  const [usedQuestionIds, setUsedQuestionIds] = useState(
    savedState?.usedQuestionIds || [],
  );

  // Stores how many questions exist in the selected continent
  const [totalQuestions, setTotalQuestions] = useState(
    savedState?.totalQuestions || 0,
  );

  // Stores which practice question number the user is currently on
  const [questionNumber, setQuestionNumber] = useState(
    savedState?.questionNumber || 1,
  );

  // Stores the answer that the user clicked
  const [selectedAnswerId, setSelectedAnswerId] = useState(
    savedState?.selectedAnswerId || null,
  );

  // Shows if the user has clicked an answer or revealed it
  const [isAnswered, setIsAnswered] = useState(
    savedState?.isAnswered || false,
  );

  // Shows if the correct answer has been revealed
  const [isRevealed, setIsRevealed] = useState(
    savedState?.isRevealed || false,
  );

  // Shows the country info panel after the user answers
  const [showInfo, setShowInfo] = useState(savedState?.showInfo || false);

  // Shows if all practice questions for the continent are completed
  const [isComplete, setIsComplete] = useState(savedState?.isComplete || false);

  const isCorrect =
    question && selectedAnswerId
      ? selectedAnswerId === question.correctAnswerId
      : false;

  // Used to show loading text/spinner while the question is loading
  const [isLoading, setIsLoading] = useState(false);

  // Stores an error message if something goes wrong
  const [error, setError] = useState("");

  useEffect(() => {
    const nextSavedState = getSavedPracticeState(storageKey);

    setQuestion(nextSavedState?.question || null);
    setUsedQuestionIds(nextSavedState?.usedQuestionIds || []);
    setTotalQuestions(nextSavedState?.totalQuestions || 0);
    setQuestionNumber(nextSavedState?.questionNumber || 1);
    setSelectedAnswerId(nextSavedState?.selectedAnswerId || null);
    setIsAnswered(nextSavedState?.isAnswered || false);
    setIsRevealed(nextSavedState?.isRevealed || false);
    setShowInfo(nextSavedState?.showInfo || false);
    setIsComplete(nextSavedState?.isComplete || false);
    setIsLoading(false);
    setError("");
  }, [storageKey, practiceType]);

  async function loadNextQuestion() {
    if (!practiceType) {
      return;
    }

    // Start loading and clear old errors
    setIsLoading(true);
    setError("");

    try {
      let currentTotalQuestions = totalQuestions;

      if (!totalQuestions) {
        // Ask backend how many questions this continent has
        const count = await getQuestionCount(continent);
        currentTotalQuestions = count || 0;
        setTotalQuestions(currentTotalQuestions);
      }

      // Add the current question to used IDs before loading the next one
      const nextUsedQuestionIds = question
        ? [...usedQuestionIds, question.questionId]
        : usedQuestionIds;

      // Ask backend for a question from this continent,
      // but skip questions we already practiced
      const nextQuestion = await getNextPracticeQuestion(
        continent,
        practiceType,
        nextUsedQuestionIds,
      );

      if (!nextQuestion) {
        setQuestion(null);
        setUsedQuestionIds(nextUsedQuestionIds);
        setQuestionNumber(nextUsedQuestionIds.length);
        setIsAnswered(false);
        setIsRevealed(false);
        setShowInfo(false);
        setIsComplete(true);

        window.sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            question: null,
            usedQuestionIds: nextUsedQuestionIds,
            totalQuestions: currentTotalQuestions,
            questionNumber: nextUsedQuestionIds.length,
            selectedAnswerId: null,
            isAnswered: false,
            isRevealed: false,
            showInfo: false,
            isComplete: true,
          }),
        );

        return;
      }

      // Save the updated list of used question IDs
      setUsedQuestionIds(nextUsedQuestionIds);

      // Show the next question number in the UI
      setQuestionNumber(nextUsedQuestionIds.length + 1);

      // Save the new question in state
      setQuestion(nextQuestion);

      // Clear selected answer for the new question
      setSelectedAnswerId(null);

      // Unlock the new question
      setIsAnswered(false);

      // Hide the correct answer for the new question
      setIsRevealed(false);

      // Hide the info panel for the new question
      setShowInfo(false);

      // Mark practice as not complete while a question is active
      setIsComplete(false);

      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          question: nextQuestion,
          usedQuestionIds: nextUsedQuestionIds,
          totalQuestions: currentTotalQuestions,
          questionNumber: nextUsedQuestionIds.length + 1,
          selectedAnswerId: null,
          isAnswered: false,
          isRevealed: false,
          showInfo: false,
          isComplete: false,
        }),
      );
    } catch (error) {
      // Save error message so the page can show it
      setError(error.message);
    } finally {
      // Stop loading, both when it works and when it fails
      setIsLoading(false);
    }
  }

  function selectAnswer(answerId) {
    if (isAnswered) {
      return;
    }

    // Save which answer the user clicked
    setSelectedAnswerId(answerId);

    // Lock the question after the user answers
    setIsAnswered(true);

    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        question,
        usedQuestionIds,
        totalQuestions,
        questionNumber,
        selectedAnswerId: answerId,
        isAnswered: true,
        isRevealed,
        showInfo,
        isComplete,
      }),
    );
  }

  function revealAnswer() {
    // Show the correct answer when the user does not know
    setIsAnswered(true);
    setIsRevealed(true);

    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        question,
        usedQuestionIds,
        totalQuestions,
        questionNumber,
        selectedAnswerId,
        isAnswered: true,
        isRevealed: true,
        showInfo,
        isComplete,
      }),
    );
  }

  function openInfo() {
    // Show extra country information
    setShowInfo(true);

    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        question,
        usedQuestionIds,
        totalQuestions,
        questionNumber,
        selectedAnswerId,
        isAnswered,
        isRevealed,
        showInfo: true,
        isComplete,
      }),
    );
  }

  async function restartPractice() {
    // Clear saved practice state and start again from the first question
    setIsLoading(true);
    setError("");
    window.sessionStorage.removeItem(storageKey);

    try {
      const count = await getQuestionCount(continent);
      const firstQuestion = await getNextPracticeQuestion(
        continent,
        practiceType,
        [],
      );
      const nextTotalQuestions = count || 0;

      setQuestion(firstQuestion);
      setUsedQuestionIds([]);
      setTotalQuestions(nextTotalQuestions);
      setQuestionNumber(1);
      setSelectedAnswerId(null);
      setIsAnswered(false);
      setIsRevealed(false);
      setShowInfo(false);
      setIsComplete(false);

      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          question: firstQuestion,
          usedQuestionIds: [],
          totalQuestions: nextTotalQuestions,
          questionNumber: 1,
          selectedAnswerId: null,
          isAnswered: false,
          isRevealed: false,
          showInfo: false,
          isComplete: false,
        }),
      );
    } catch (error) {
      // Save error message so the page can show it
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
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
    selectAnswer,
    revealAnswer,
    openInfo,
    restartPractice,
  };
}

export default usePracticeQuestion;

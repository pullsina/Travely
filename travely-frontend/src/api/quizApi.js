// ---------------------------------------------
// BASE URL for the backend API (Should be retrieved from environment variables)
// ---------------------------------------------
const API_BASE = "https://localhost:7009";
// ---------------------------------------------
// GENERIC REQUEST FUNCTION (to communicate with the backend API)
// ---------------------------------------------
async function request(path, options = {}) {
  // Get headers from options, otherwise create empty object
  const headers = options.headers || {};
  // Translate the body to JSON if it exists
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }
  // Make the fetch request to the backend API
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", // Include cookies in the request
  });
  // Read the response as text
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Ignore JSON parsing errors
  }
  if (!response.ok) {
    const errorMessage =
      (data && data.message) || response.statusText || "Something went wrong.";
    throw new Error(errorMessage);
  }
  return data;
}
// ---------------------------------------------
// GET questions
// ---------------------------------------------
export async function getQuestion(questionId) {
  return request(`/api/quiz/question/${questionId}`, {
    method: "GET",
  });
}

// ---------------------------------------------
// GET random question
// ---------------------------------------------

// This function retrieves a random question based on the specified continent and difficulty level.
export async function getRandomQuestion(
  continent,
  difficulty,
  excludedQuestionIds = [],
) {
  const params = new URLSearchParams({
    continent,
    difficulty,
  });

  // Append excluded question IDs to the query parameters
  excludedQuestionIds.forEach((questionId) => {
    params.append("excludedQuestionIds", questionId);
  });

  return request(`/api/quiz/question/random?${params.toString()}`, {
    method: "GET",
  });
}

// ---------------------------------------------
// GET next question
// ---------------------------------------------

// This function retrieves the next question for a continent.
// The backend decides difficulty order: Easy, then Medium, then Hard.
export async function getNextQuestion(continent, excludedQuestionIds = []) {
  const params = new URLSearchParams({
    continent,
  });

  excludedQuestionIds.forEach((questionId) => {
    params.append("excludedQuestionIds", questionId);
  });

  try {
    return await request(`/api/quiz/question/next?${params.toString()}`, {
      method: "GET",
    });
  } catch (error) {
    if (error.message === "Not Found") {
      return null;
    }

    throw error;
  }
}

// ---------------------------------------------
// POST answers
// ---------------------------------------------
export async function submitAnswers(questionId, answerId) {
  return request("/api/quiz/answer", {
    method: "POST",
    body: JSON.stringify({ questionId, answerId }),
  });
}
// ---------------------------------------------
// GET results
// ---------------------------------------------
export async function getResults() {
  return request("/quiz/results");
}
// ---------------------------------------------
// EXPORTS
// ---------------------------------------------
export default {
  getQuestion,
  getRandomQuestion,
  getNextQuestion,
  submitAnswers,
  getResults,
};
// ---------------------------------------------

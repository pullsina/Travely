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
      (data && data.message) ||
      response.statusText ||
      `Request failed with status ${response.status}.`;
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
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
    if (error.status === 404) {
      return null;
    }

    throw error;
  }
}

// ---------------------------------------------
// GET question count
// ---------------------------------------------

// This function retrieves how many questions exist for a continent.
export async function getQuestionCount(continent) {
  const params = new URLSearchParams({
    continent,
  });

  return request(`/api/quiz/questions/count?${params.toString()}`, {
    method: "GET",
  });
}

// ---------------------------------------------
// GET saved progress
// ---------------------------------------------

// This function retrieves the logged-in user's saved progress for one continent.
export async function getProgress(continent) {
  const params = new URLSearchParams({
    continent,
  });

  return request(`/api/quiz/progress?${params.toString()}`, {
    method: "GET",
  });
}

// ---------------------------------------------
// GET total points
// ---------------------------------------------

// This function retrieves the logged-in user's total points across all continents.
export async function getUserPoints() {
  return request("/api/quiz/points", {
    method: "GET",
  });
}

// This function retrieves the logged-in user's total points and points per continent.
export async function getUserPointsSummary() {
  return request("/api/quiz/points/summary", {
    method: "GET",
  });
}

// ---------------------------------------------
// POST answers
// ---------------------------------------------
export async function submitAnswers(questionId, answerId, usedHintsCount = 0) {
  return request("/api/quiz/answer", {
    method: "POST",
    body: JSON.stringify({ questionId, answerId, usedHintsCount }),
  });
}
// ---------------------------------------------
// GET results
// ---------------------------------------------
export async function getResults() {
  return request("/api/quiz/results");
}
// ---------------------------------------------
// EXPORTS
// ---------------------------------------------
export default {
  getQuestion,
  getRandomQuestion,
  getNextQuestion,
  getQuestionCount,
  getProgress,
  getUserPoints,
  getUserPointsSummary,
  submitAnswers,
  getResults,
};
// ---------------------------------------------

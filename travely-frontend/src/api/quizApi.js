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
  return request(`/quiz/question/${questionId}`, {
    method: "GET",
  });
}
// ---------------------------------------------
// POST answers
// ---------------------------------------------
export async function submitAnswers(questionId, answerId) {
  return request("/quiz/answer", {
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
  submitAnswers,
  getResults,
};
// ---------------------------------------------

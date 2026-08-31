// Base URL for the backend API, retrieved from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Basic function to fetch data from the backend API
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    let errorMessage = "Something went wrong.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // Ignore JSON parsing errors and use the default error message
    }
    throw new Error(errorMessage);
  }
  return response.json(); // Parse and return the JSON response
}

// ---------------------------------------------
// Functions for registration, login and logout
// ---------------------------------------------
export async function register({ username, email, password }) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return request("/auth/logout", {
    method: "POST",
  });
}

// ---------------------------------------------
// Function to get questions, submit answers and get results
// ---------------------------------------------
export async function getQuestion(questionId) {
  return await request(`/quiz/question/${questionId}`, {
    method: "GET",
  });
}
export async function submitAnswers(questionId, answerId) {
  return request("/quiz/answer", {
    method: "POST",
    body: JSON.stringify({ questionId, answerId }),
  });
}

export async function getResults() {
  return request("/quiz/results");
}
// ---------------------------------------------

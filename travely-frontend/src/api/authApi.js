const API_BASE = "https://localhost:7009";

//function to reuse in every request
async function request(path, options = {}) {
  const headers = options.headers || {};

  //backend needs data to be in json
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    //get everything from options (method, body...)
    ...options,
    headers,
    //for cookies
    credentials: "include",
  });

  //read response as text
  const text = await response.text();

  //convert to json
  let data = null;

  try {
    if (text) {
      data = JSON.parse(text);
    }
  } catch {
    //if response is not json, keep as text
    data = text;
  }

  if (!response.ok) {
    const errorMessage =
      data?.error || data?.message || data?.title || "Request failed";
    throw new Error(errorMessage);
  }

  return data;
}

// REGISTER
// POST /api/auth/register
export async function register({ username, email, password, confirmPassword }) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  });
}

// LOGIN
// POST /api/auth/login
export async function login({ email, password }) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

// LOGOUT
// POST /api/auth/logout
export async function logout() {
  return request("/api/auth/logout", {
    method: "POST",
  });
}

// GET CURRENT USER
// GET /api/auth/me
export async function getCurrentUser() {
  return request("/api/auth/me", {
    method: "GET",
  });
}

// DELETE ACCOUNT
// DELETE /api/auth/delete
export async function deleteAccount() {
  return request("/api/auth/delete", {
    method: "DELETE",
  });
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  deleteAccount,
};

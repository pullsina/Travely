import { useState } from "react";
import { login } from "../api/authApi";
import backgroundMap from "../assets/background_map.png";
import "./LoginPage.css";

function LoginPage({ onBack, onRegister, onLoginSuccess }) {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setLoginError("");
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();

    if (!loginValues.email || !loginValues.password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    try {
      const result = await login({
        email: loginValues.email,
        password: loginValues.password,
      });

      console.log("Login result:", result);

      if (result.success) {
        onLoginSuccess();
      } else {
        setLoginError(result.error || "Login failed.");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  }

  function handleResetSubmit(event) {
    event.preventDefault();

    if (!resetEmail) {
      setResetError("Please enter your email address.");
      return;
    }

    setResetError("");
    setResetMessage("If an account exists, a reset link will be sent.");
  }

  function closeResetPanel() {
    setIsResetOpen(false);
    setResetEmail("");
    setResetMessage("");
    setResetError("");
  }

  return (
    <main
      className="login-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      <button
        className="login-page__back"
        onClick={onBack}
        aria-label="Go back"
      >
        ←
      </button>

      <section className="login-page__panel" aria-labelledby="login-title">
        <h1 className="login-page__logo">TRAVELY</h1>

        {isResetOpen ? (
          <>
            <h2 id="login-title" className="login-page__title">
              Reset password
            </h2>

            <form
              className="login-page__form"
              onSubmit={handleResetSubmit}
              noValidate
            >
              <label className="login-page__field">
                <span>Email</span>
                <input
                  type="email"
                  name="resetEmail"
                  autoComplete="email"
                  value={resetEmail}
                  onChange={(event) => {
                    setResetEmail(event.target.value);
                    setResetError("");
                    setResetMessage("");
                  }}
                  aria-invalid={Boolean(resetError)}
                />
              </label>

              {resetError && (
                <p className="login-page__message login-page__message--error">
                  {resetError}
                </p>
              )}

              {resetMessage && (
                <p className="login-page__reset-message">{resetMessage}</p>
              )}

              <button
                className="primary-button login-page__submit"
                type="submit"
              >
                Send reset link
              </button>
            </form>

            <button
              className="login-page__text-link"
              type="button"
              onClick={closeResetPanel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 id="login-title" className="login-page__title">
              Welcome back
            </h2>

            <form
              className="login-page__form"
              onSubmit={handleLoginSubmit}
              noValidate
            >
              <label className="login-page__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={loginValues.email}
                  onChange={handleLoginChange}
                  aria-invalid={Boolean(loginError && !loginValues.email)}
                />
              </label>

              <label className="login-page__field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={loginValues.password}
                  onChange={handleLoginChange}
                  aria-invalid={Boolean(loginError && !loginValues.password)}
                />
              </label>

              {loginError && (
                <p className="login-page__message login-page__message--error">
                  {loginError}
                </p>
              )}

              <button
                className="primary-button login-page__submit"
                type="submit"
              >
                Log in
              </button>
            </form>

            <button
              className="login-page__text-link"
              type="button"
              onClick={() => setIsResetOpen(true)}
            >
              Forgot password?
            </button>

            <button
              className="login-page__register-link"
              type="button"
              onClick={onRegister}
            >
              Create account
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default LoginPage;

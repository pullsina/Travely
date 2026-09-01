import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundMap from "../assets/background_map.png";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required.";
    }

    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!formValues.email.includes("@")) {
      errors.email = "Email must contain @.";
    }

    if (!formValues.password) {
      errors.password = "Password is required.";
    } else if (
      formValues.password.length < 6 ||
      !/[A-Z]/.test(formValues.password) ||
      !/[a-z]/.test(formValues.password) ||
      !/[0-9]/.test(formValues.password) ||
      !/[^A-Za-z0-9]/.test(formValues.password)
    ) {
      errors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, number and special character.";
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    }

    if (
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormError("");
      return;
    }

    setFormErrors({});

    try {
      const result = await register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      });

      console.log(result);

      if (result.success) {
        navigate("/continents");
      } else {
        setFormError(result.message || result.error || "Registration failed.");
      }
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <main
      className="register-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      <button
        className="register-page__back"
        onClick={() => navigate("/")}
        aria-label="Go back"
      >
        ←
      </button>

      <section
        className="register-page__panel"
        aria-labelledby="register-title"
      >
        <h1 className="register-page__logo">TRAVELY</h1>
        <h2 id="register-title" className="register-page__title">
          Create account
        </h2>

        <form
          className="register-page__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="register-page__field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={formValues.username}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.username)}
            />
            {formErrors.username && (
              <p className="register-page__message register-page__message--error">
                {formErrors.username}
              </p>
            )}
          </label>

          <label className="register-page__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.email)}
            />
            {formErrors.email && (
              <p className="register-page__message register-page__message--error">
                {formErrors.email}
              </p>
            )}
          </label>

          <label className="register-page__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.password)}
            />
            {formErrors.password && (
              <p className="register-page__message register-page__message--error">
                {formErrors.password}
              </p>
            )}
          </label>

          <label className="register-page__field">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(formErrors.confirmPassword)}
            />
            {formErrors.confirmPassword && (
              <p className="register-page__message register-page__message--error">
                {formErrors.confirmPassword}
              </p>
            )}
          </label>

          {formError && (
            <p className="register-page__message register-page__message--error">
              {formError}
            </p>
          )}

          <button
            className="primary-button register-page__submit"
            type="submit"
          >
            Register
          </button>
        </form>

        <button
          className="register-page__login-link"
          type="button"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </section>
    </main>
  );
}

export default RegisterPage;

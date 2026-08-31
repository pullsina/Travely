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
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formValues.username ||
      !formValues.email ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

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
        setFormError(result.error || "Registration failed.");
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
              aria-invalid={Boolean(formError && !formValues.username)}
            />
          </label>

          <label className="register-page__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              aria-invalid={Boolean(formError && !formValues.email)}
            />
          </label>

          <label className="register-page__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              aria-invalid={Boolean(formError && !formValues.password)}
            />
          </label>

          <label className="register-page__field">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(formError && !formValues.confirmPassword)}
            />
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

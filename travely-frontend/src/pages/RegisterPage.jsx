import backgroundMap from '../assets/background_map.png'
import './RegisterPage.css'

function RegisterPage({ onBack }) {
  return (
    <main
      className="register-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      <button className="register-page__back" onClick={onBack} aria-label="Go back">
        ←
      </button>

      <section className="register-page__panel" aria-labelledby="register-title">
        <h1 className="register-page__logo">TRAVELY</h1>
        <h2 id="register-title" className="register-page__title">
          Create account
        </h2>

        <form className="register-page__form">
          <label className="register-page__field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" />
          </label>

          <label className="register-page__field">
            <span>Password</span>
            <input type="password" name="password" autoComplete="new-password" />
          </label>

          <label className="register-page__field">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
            />
          </label>

          <button className="primary-button register-page__submit" type="submit">
            Register
          </button>
        </form>

        <button className="register-page__login-link" type="button">
          Log in
        </button>
      </section>
    </main>
  )
}

export default RegisterPage

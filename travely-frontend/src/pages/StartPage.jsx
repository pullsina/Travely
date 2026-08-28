import Navbar from "../components/Navbar";
import backgroundMap from "../assets/background_map.png";
import "./StartPage.css";

function StartPage({ onRegister, onLogin }) {
  return (
    <main
      className="start-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      <Navbar variant="guest" onHome={() => {}} />

      <section className="start-page__content">
        <h1 className="start-page__logo">TRAVELY</h1>
        <p className="start-page__tagline">
          Knowledge that takes you around the world
        </p>

        <div className="start-page__actions">
          <button
            className="primary-button start-page__button"
            onClick={onRegister}
          >
            Register
          </button>
          <button
            className="primary-button start-page__button"
            onClick={onLogin}
          >
            Log in
          </button>
        </div>
      </section>
    </main>
  );
}

export default StartPage;

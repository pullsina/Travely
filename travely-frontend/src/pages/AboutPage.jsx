import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import backgroundMap from "../assets/background_map.png";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <main
      className="about-page"
      style={{ backgroundImage: `url(${backgroundMap})` }}
    >
      <Navbar
        variant={isAuthenticated ? "app" : "guest"}
        showAuthLinks={!isAuthenticated}
      />

      <button
        className="about-page__back"
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      <section className="about-card" aria-labelledby="about-title">
        <p className="about-card__eyebrow">About Travely</p>
        <h1 id="about-title" className="about-card__title">
          A school project for learning countries, flags and capitals.
        </h1>

        <div className="about-card__sections">
          <article className="about-card__section">
            <h2>School project</h2>
            <p>
              Travely was created as part of a school project at{" "}
              <a href="https://www.newton.se/" target="_blank" rel="noreferrer">
                Newton
              </a>
              . The app is built for practicing geography in a playful way
              through learning, practice and challenge modes.
            </p>
          </article>

          <article className="about-card__section">
            <h2>Learning content</h2>
            <p>
              Country facts, hints and descriptions are used as educational
              material. Some informational text may be AI-assisted, so the
              content should be treated as learning support rather than an
              official fact database or travel guide.
            </p>
          </article>

          <article className="about-card__section">
            <h2>Rewards</h2>
            <p>
              Rewards, discounts and travel offers shown in Travely are not real.
              They are part of the project story and are included only to
              demonstrate how the app could work together with a travel company.
            </p>
          </article>

          <article className="about-card__section">
            <h2>Images and flags</h2>
            <p>
              Country images are mainly sourced from Unsplash, with some images
              from Pixabay. Detailed image source links are available in{" "}
              <a href="/CREDITS.md" target="_blank" rel="noreferrer">
                Travely credits
              </a>
              . Flag images are used as visual learning material and appear to
              be based on the{" "}
              <a
                href="https://github.com/lipis/flag-icons"
                target="_blank"
                rel="noreferrer"
              >
                flag-icons
              </a>{" "}
              project.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;

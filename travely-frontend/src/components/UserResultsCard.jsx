import "./UserResultsCard.css";

// Submits the user as a property
function UserResultsCard({ user }) {
  return (
    <div
      className="user-results-card__body"
      aria-label="User game summary card"
    >
      {" "}
      <h2 id="user-results-card__title">Game result summary</h2>{" "}
      {/*  Number of questions answered */}
      <p
        className="user-results-card__text"
        aria-labelledby="user-results-card__title"
      >
        {" "}
        <strong>Number of Questions answered:</strong>{" "}
        {user.numQuestionsAnswered}{" "}
      </p>{" "}
      {/*  Number of correct answers */}
      <p
        className="user-results-card__text"
        aria-labelledby="user-results-card__title"
      >
        {" "}
        <strong>Number of Correct Answers:</strong>{" "}
        {user.numCorrectAnswers}{" "}
      </p>{" "}
      {/* Continents achieved */}
      <p
        className="user-results-card__text"
        aria-labelledby="user-results-card__title"
      >
        {" "}
        <strong>Continents conquered:</strong>{" "}
        {user.continentsConquered.join(", ")}{" "}
      </p>{" "}
    </div>
  );
}
export default UserResultsCard;

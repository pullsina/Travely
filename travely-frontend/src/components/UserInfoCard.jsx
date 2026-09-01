import "./UserInfoCard.css";

// Submits the user as a property
function UserInfoCard({ user }) {
  return (
    <div className="user-info-card__body" aria-label="User details card">
      {" "}
      <h2 id="user-info-card-title" className="user-info-card__title">
        User details
      </h2>{" "}
      <p
        className="user-info-card__text"
        aria-labelledby="user-info-card-title"
      >
        {" "}
        <strong>Name:</strong> {user.name}{" "}
      </p>{" "}
      <p
        className="user-info-card__text"
        aria-labelledby="user-info-card-title"
      >
        {" "}
        <strong>Email:</strong> {user.email}{" "}
      </p>{" "}
      <p
        className="user-info-card__text"
        aria-labelledby="user-info-card-title"
      >
        {" "}
        <strong>Password:</strong> ••••••••{" "}
      </p>{" "}
      {/* Buttons for actions */}
      <p className="user-info-card__text">
        To be implemented: Button to change info and password
      </p>
      <button
        className="user-info-card__change-info-button"
        type="button"
        aria-label="Change user info - Not implemented"
      >
        Change Info
      </button>
      <p className="user-info-card__text">
        To be implemented: Button to delete profile
      </p>
      <button
        className="user-info-card__delete-profile-button"
        type="button"
        aria-label="Delete user profile - Not implemented"
      >
        Delete Profile
      </button>
    </div>
  );
}
export default UserInfoCard;

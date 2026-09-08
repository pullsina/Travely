import "./UserInfoCard.css";

// Submits the user as a property
function UserInfoCard({ user, onClose }) {
  const email =
    user.email ?? user.Email ?? user.emailAddress ?? user.EmailAddress;

  return (
    <section className="user-info-card" aria-label="User details card">
      <div className="user-info-card__info" aria-label="User details">
        <p
          className="user-info-card__text"
          aria-labelledby="user-info-card__text"
        >
          <strong>Name:</strong> {user.username}
        </p>
        <p
          className="user-info-card__text"
          aria-labelledby="user-info-card__text"
        >
          <strong>Email:</strong> {email || "No email available"}
        </p>
      </div>
      <div className="user-info-card__panel-actions" aria-label="User actions">
        {/* Buttons for actions */}
        <button
          className="primary-button user-info-card__change-info-button"
          type="button"
          aria-label="Change user info - Not implemented"
        >
          Change Info
        </button>
        <p className="user-info-card__text-small">To be implemented!</p>
        <button
          className="primary-button user-info-card__delete-profile-button"
          type="button"
          aria-label="Delete user profile - Not implemented"
        >
          Delete Profile
        </button>
        <p className="user-info-card__text-small">To be implemented!</p>
      </div>
      <button
        className="primary-button user-info-card__actions__close-button"
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </section>
  );
}

export default UserInfoCard;

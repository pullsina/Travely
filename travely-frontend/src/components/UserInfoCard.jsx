import "./UserInfoCard.css";

function UserInfoCard({ userInfo, onClose }) {
  const username = userInfo?.name ?? userInfo?.username;
  const email = userInfo?.email ?? userInfo?.emailAddress;

  return (
    <section className="user-info-card" aria-labelledby="user-info-card-title">
      {/* Header with title and close button */}
      <div className="user-info-card__header">
        <div
          className="user-info-card__header__title"
          aria-labelledby="user-info-card-title"
        >
          <h2 className="user-info-card__title" id="user-info-card-title">
            User Details
          </h2>
        </div>
        <div className="user-info-card__header__actions">
          <button
            className="primary-button user-info-card__actions__close-button"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {/* Card main content */}
      <div className="user-info-card__main">
        <div className="user-info-card__main__info">
          <p className="user-info-card__main__info-text">
            <strong>Username:</strong> {username || "No username available"}
          </p>
          <p className="user-info-card__main__info-text">
            <strong>E-mail:</strong> {email || "No email available"}
          </p>
        </div>
      </div>
      {/* Footer with action buttons to be implemented... */}
      <div
        className="user-info-card__footer"
        aria-labelledby="user-info-card-footer"
      >
        {/* Buttons for actions */}
        <div className="user-info-card__footer__button">
          <button
            className="primary-button user-info-card__change-info-button"
            type="button"
            aria-labelledby="user-info-card-change-info-button"
          >
            Change Info
          </button>
          <p className="user-info-card__footer__text-small">
            To be implemented!
          </p>
        </div>
        <div className="user-info-card__footer__button">
          <button
            className="primary-button user-info-card__delete-profile-button"
            type="button"
            aria-labelledby="user-info-card-delete-profile-button"
          >
            Delete Profile
          </button>
          <p className="user-info-card__footer__text-small">
            To be implemented!
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserInfoCard;

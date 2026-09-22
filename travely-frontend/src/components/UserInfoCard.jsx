import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import "./ChangePasswordForm.css";
import "./UserInfoCard.css";

function UserInfoCard({ userInfo, onClose, onUpdate, onDelete }) {
  const username = userInfo?.name ?? userInfo?.username;
  const email = userInfo?.email ?? userInfo?.emailAddress;
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);
  const [emailInput, setEmailInput] = useState(email);
  const [error, setError] = useState(null);

  async function handleSave() {
    try {
      setError("");
      await onUpdate({
        username: usernameInput,
        email: emailInput,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Could not update user information.");
    }
  }

  async function handleCancel() {
    setUsernameInput(username);
    setEmailInput(email);
    setIsEditing(false);
    setError("");
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your Travely account? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    await onDelete();
  }

  // Function to show ChangePasswordForm
  function handleShowChangePasswordForm() {
    setShowChangePasswordForm(true);
  }

  return (
    <section className="user-info-card" aria-labelledby="user-info-card-title">
      {/* Header with title and close button */}
      <div
        className={`user-info-card__header${
          isEditing ? " user-info-card__header--editing" : ""
        }`}
      >
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
            className="user-info-card__actions__close-button"
            type="button"
            onClick={onClose}
            aria-label="Close user info card"
            title="Close"
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      {!isEditing ? (
        <>
          {/* Card main content */}
          <div className="user-info-card__main">
            <p className="user-info-card__main__info">
              <strong>Username:</strong> {username || "No username available"}
            </p>
            <p className="user-info-card__main__info">
              <strong>E-mail:</strong> {email || "No email available"}
            </p>
          </div>
          {/* Footer with action buttons to be implemented... */}
          <div
            className="user-info-card__actions"
            aria-labelledby="user-info-card-actions"
          >
            {/* Buttons for actions */}
            <div className="user-info-card__actions__button">
              <button
                className="primary-button user-info-card__change-info-button"
                type="button"
                aria-labelledby="user-info-card-change-info-button"
                onClick={() => setIsEditing(true)}
              >
                Change Info
              </button>
              {/* <p className="user-info-card__footer__text-small">
            To be implemented!
          </p> */}
            </div>
            <div className="user-info-card__actions__button">
              <button
                className="primary-button user-info-card__delete-profile-button"
                type="button"
                aria-labelledby="user-info-card-delete-profile-button"
                onClick={handleDelete}
              >
                Delete Profile
              </button>
              {/* <p className="user-info-card__footer__text-small">
                To be implemented!
              </p> */}
            </div>
            <div className="user-info-card__actions__button">
              <button
                className="primary-button user-info-card__change-password-button"
                onClick={handleShowChangePasswordForm}
              >
                Change Password
              </button>
            </div>
            {showChangePasswordForm && (
              <ChangePasswordForm
                onClose={() => setShowChangePasswordForm(false)}
              />
            )}
          </div>
        </>
      ) : (
        <div className="user-info-card__edit">
          <label className="user-info-card__edit-label">
            <span>Name</span>
            <input
              className="user-info-card__edit-input"
              type="text"
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
            />
          </label>

          <label className="user-info-card__edit-label">
            <span>Email</span>
            <input
              className="user-info-card__edit-input"
              type="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
          </label>

          {error && <p className="user-info-card__error">{error}</p>}

          <div className="user-info-card__edit-actions">
            <button
              className="primary-button"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserInfoCard;

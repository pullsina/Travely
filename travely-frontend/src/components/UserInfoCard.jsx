import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
// import "./ChangePasswordForm.css";
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
    <section className="user-info-card" aria-label="user-info-card">
      {/* Upper part with title and close button */}
      <div
        className={`user-info-card__title${
          isEditing ? " user-info-card__title--editing" : ""
        }`}
      >
        <h2
          className="user-info-card__title-title"
          aria-label="Title of user info card"
          id="user-info-card-title"
        >
          User details
        </h2>
        <button
          className="user-info-card__close-button"
          type="button"
          onClick={onClose}
          aria-label="Button to close user info card"
          title="Close"
        >
          <span aria-hidden="true" />
        </button>
        {/* </div> */}
      </div>
      {!isEditing ? (
        <>
          {/* Card main content */}
          <div className="user-info-card__main">
            <label
              className="user-info-card__main__label"
              htmlFor="username-input"
            >
              Username:
              <p className="user-info-card__main__info">
                {username || "No username available"}
              </p>
            </label>
            <label
              className="user-info-card__main__label"
              htmlFor="email-input"
            >
              E-mail:
              <p className="user-info-card__main__info">
                {email || "No email available"}
              </p>
            </label>
          </div>
          {/* Buttons for actions */}
          <div
            className="user-info-card__actions"
            aria-labelledby="user-info-card-actions"
          >
            <div className="user-info-card__edit-button">
              <button
                className="primary-button user-info-card__edit-button"
                type="button"
                aria-label="Button to edit user info card"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
            <div className="user-info-card__delete-button">
              <button
                className="primary-button user-info-card__delete-button"
                type="button"
                aria-label="Button to delete user information"
                onClick={handleDelete}
              >
                Delete profile
              </button>
            </div>
            <div className="user-info-card__change-password-button">
              <button
                className="primary-button user-info-card__change-password-button"
                type="button"
                aria-label="Button to change user password"
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
              aria-label="Input for editing user name"
            />
          </label>

          <label className="user-info-card__edit-label">
            <span>Email</span>
            <input
              className="user-info-card__edit-input"
              type="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              aria-label="Input for editing user email"
            />
          </label>

          {error && <p className="user-info-card__error">{error}</p>}

          <div className="user-info-card__edit-actions">
            <button
              className="primary-button"
              type="button"
              onClick={handleSave}
              aria-label="Button to save user info"
            >
              Save
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={handleCancel}
              aria-label="Button to cancel editing user info"
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

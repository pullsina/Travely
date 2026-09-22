import { useState } from "react";
import { changePassword } from "../api/authApi";
import "./ChangePasswordForm.css";

// function to handle change password form submission
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const result = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      setMessage(result?.message ?? "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <h3 className="change-password-form__title">Change password</h3>
      <div className="change-password-form__field">
        <label
          className="change-password-form__label"
          htmlFor="current-password"
        >
          Current password
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="change-password-form__field">
        <label className="change-password-form__label" htmlFor="new-password">
          New password
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="change-password-form__field">
        <label
          className="change-password-form__label"
          htmlFor="confirm-new-password"
        >
          Confirm new password
          <input
            id="confirm-new-password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </label>
        {error && <p className="change-password-form__error">{error}</p>}
        {message && <p className="change-password-form__message">{message}</p>}
      </div>
      <div className="change-password-form__actions">
        <button
          type="submit"
          disabled={loading}
          className="primary-button change-password-button"
        >
          {loading ? "Changing..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

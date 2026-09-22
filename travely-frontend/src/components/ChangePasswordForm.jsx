import { useState } from "react";
import { changePassword } from "../api/authApi";

// function to handle change password form submission
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      alert("Password changed successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <div>
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="change-password-button">
        Change Password
      </button>
    </form>
  );
}

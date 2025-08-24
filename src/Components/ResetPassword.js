import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/auth";
import "../styles/ResetPassword.css"; // import the CSS file

function ResetPassword() {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }
    try {
      const res = await resetPassword(uidb64, token, newPassword, confirmPassword);
      setMessage(res.message || "✅ Password reset successful! You can login now.");
    } catch (error) {
      setMessage(error.message || "❌ Invalid or expired reset link.");
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="reset-input"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="reset-input"
        />
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
      <p className="reset-message">{message}</p>
    </div>
  );
}

export default ResetPassword;

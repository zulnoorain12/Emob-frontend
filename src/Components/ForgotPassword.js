import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import "../styles/ForgotPassword.css"; // import the CSS file

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "Reset link sent! (check your email or backend console)");
    } catch (error) {
      setMessage(error.message || "Error sending reset link.");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-input"
        />
        <button type="submit" className="forgot-button">
          Send Reset Link
        </button>
      </form>
      <p className="forgot-message">{message}</p>
    </div>
  );
}

export default ForgotPassword;

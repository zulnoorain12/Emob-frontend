import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, loginUser } from '../api/auth';

import '../styles/authentication.css';
import signupRobot from '../assets/robooo.PNG';
import logoIcon from '../assets/Icon.png';

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');  // ✅ changed from phone → email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1️⃣ Signup user
      await signupUser(username, email, password, confirmPassword);

      // 2️⃣ Auto-login after signup
      const data = await loginUser(username, password);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert("Signup successful! Redirecting to dashboard...");
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <img src={logoIcon} alt="Emob Icon" className="logo-icon" />
        <h2 className="signup-heading">SignUp</h2>

        <input
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm your password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      <img src={signupRobot} alt="Chatbot" className="side-image" />
    </div>
  );
}

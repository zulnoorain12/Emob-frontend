// src/components/SignUp.js
import React from 'react';
import './styles.css';
import signupRobot from '../assets/robooo.PNG';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/Icon.png';

export default function SignUp() {
  return (
    <div className="form-container">
      <form className="form-box">
        <img src={logoIcon} alt="Emob Icon" className="signup-icon" />
        <h2 className="signup-heading">SignUp</h2>
        <input type="text" placeholder="Enter your full name..." />
        <input type="text" placeholder="Enter your phone number..." />
        <input type="password" placeholder="Enter your password..." />
        <input type="password" placeholder="Confirm your password..." />
        <button type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      <img src={signupRobot} alt="Chatbot" className="side-image" />
    </div>
  );
}

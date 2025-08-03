// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import loginRobot from '../assets/rest.png';
import logoIcon from '../assets/Icon.png';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Dummy login check (replace with real auth later)
    if (username && password) {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <img src={logoIcon} alt="Emob Icon" className="login-icon" />
        <h2 className="Login-heading">Login</h2>
        
        <input
          type="text"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="forgot">
          <Link to="#">Forgot Password?</Link>
        </div>
        
        <button type="submit">Login</button>
        
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
      
      <img src={loginRobot} alt="Chatbot" className="side-image" />
    </div>
  );
}

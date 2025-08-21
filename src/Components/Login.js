import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';

import '../styles/authentication.css';
import loginRobot from '../assets/rest.png';
import logoIcon from '../assets/Icon.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log("Login Success:", data);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <img src={logoIcon} alt="Emob Icon" className="login-icon" />
        <h2 className="Login-heading">Login</h2>
        
        <input
          type="text"
          placeholder="Enter your username..."
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
          <Link to="/forgot-password">Forgot Password?</Link>
      </div>
        
        <button type="submit">Login</button>
        
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
      <img src={loginRobot} alt="Chatbot" className="side-image" />
    </div>
  );
}

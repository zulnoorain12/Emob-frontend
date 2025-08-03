// src/components/Welcome.js
import React from 'react';
import './styles.css';
import welcomeImage from '../assets/Icon.png';
import backgroundImage from '../assets/background.png'; // import background
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="container welcome"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <img src={welcomeImage} alt="Welcome" className="robot-img" />
      <h2>Welcome to Emob!</h2>
      <p>Your smart AI chatbot for online stores.</p>
      <button onClick={() => navigate('/signup')}>Get started</button>
    </div>
  );
}

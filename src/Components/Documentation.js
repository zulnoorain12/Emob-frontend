import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';


import logoImage from '../assets/Icon.png';
import dashboardIcon from '../assets/icons/dashboard.png';
import embedIcon from '../assets/icons/embed.png';
import customizationIcon from '../assets/icons/customization.png';
import chatIcon from '../assets/icons/chat.png';
import subscriptionIcon from '../assets/icons/subscription.png';
import documentationIcon from '../assets/icons/documentation.png';
import contactIcon from '../assets/icons/contact.png';
import profileIcon from '../assets/icons/profile.png';

const NavItem = ({ text, path, icon, active }) => (
  <Link to={path} className={`nav-item ${active ? 'active' : ''}`}>
    <img src={icon} alt={`${text} icon`} className="nav-img" />
    <span>{text}</span>
  </Link>
);

const DocCard = ({ id, title, description, expanded, onToggle, steps }) => (
  <div className="doc-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <button onClick={onToggle} className="read-more">
      {expanded ? 'Show less' : 'Read more'}
    </button>
    
    {expanded && (
      <div className="card-expanded-content">
        <h4 className="steps-title">Implementation Steps</h4>
        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              {step}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default function DocumentationPage() {
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-flex">

        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-logo-wrapper">
            <img src={logoImage} alt="Logo" className="dashboard-logo" />
            <span className="dashboard-logo-text">Emob</span>
          </div>

          <nav className="dashboard-nav">
            <NavItem text="Dashboard" path="/dashboard" active={location.pathname === "/dashboard"} icon={dashboardIcon} />
            <NavItem text="Embed Code" path="/dashboard/embed" active={location.pathname === "/dashboard/embed"} icon={embedIcon} />
            <NavItem text="Customization" path="/dashboard/customization" active={location.pathname === "/dashboard/customization"} icon={customizationIcon} />
            <NavItem text="Chat Demo" path="/dashboard/chat" active={location.pathname === "/dashboard/chat"} icon={chatIcon} />
            <NavItem text="Subscription" path="/dashboard/subscription" active={location.pathname === "/dashboard/subscription"} icon={subscriptionIcon} />
            <NavItem text="Documentation" path="/dashboard/documentation" active={location.pathname === "/dashboard/documentation"} icon={documentationIcon} />
            <NavItem text="Contact Us" path="/dashboard/contact" active={location.pathname === "/dashboard/contact"} icon={contactIcon} />
            <NavItem text="Profile" path="/dashboard/profile" active={location.pathname === "/dashboard/profile"} icon={profileIcon} />
          </nav>
        </aside>

        {/* Documentation Content */}
        <main className="documentation-main">
          <h1 className="doc-heading">Documentation</h1>
          <p className="doc-subheading">
            Everything you need to integrate, customize, and optimize your AI chatbot
          </p>

          <h2 className="doc-section-title">Getting Started</h2>
          <div className="doc-cards">
            <DocCard 
              id="quickstart"
              title="Quick Start Guide" 
              description="Get your chatbot up and running in 5 minutes"
              expanded={expandedCard === 'quickstart'}
              onToggle={() => toggleCard('quickstart')}
              steps={[
                "1. Sign up for an Emob account and get your API key",
                "2. Add the Emob script to your website's HTML head section",
                "3. Initialize the chatbot with your API key",
                "4. Customize the appearance and position",
                "5. Test the chatbot functionality on your website"
              ]}
            />
            <DocCard 
              id="installation"
              title="Installation Methods" 
              description="Different ways to install the chatbot"
              expanded={expandedCard === 'installation'}
              onToggle={() => toggleCard('installation')}
              steps={[
                "1. Choose your preferred installation method (CDN, NPM, or Manual)",
                "2. For CDN: Add script tag to your HTML",
                "3. For NPM: Run 'npm install emob-chatbot-sdk'",
                "4. For Manual: Download and include the JavaScript file",
                "5. Import the library in your project",
                "6. Configure the initialization parameters"
              ]}
            />
            <DocCard 
              id="configuration"
              title="First Configuration" 
              description="Basic setup and initial customization"
              expanded={expandedCard === 'configuration'}
              onToggle={() => toggleCard('configuration')}
              steps={[
                "1. Set up your API credentials in the configuration",
                "2. Choose your chatbot theme (light/dark)",
                "3. Configure the chatbot position on your website",
                "4. Set up welcome messages and default responses",
                "5. Enable or disable features like file upload, voice input",
                "6. Test the configuration in development mode"
              ]}
            />
            <DocCard 
              id="testing"
              title="Testing Your Chatbot" 
              description="How to test before going live"
              expanded={expandedCard === 'testing'}
              onToggle={() => toggleCard('testing')}
              steps={[
                "1. Enable test mode in your configuration",
                "2. Test basic message sending and receiving",
                "3. Verify all interactive features work correctly",
                "4. Test on different devices and browsers",
                "5. Check chatbot performance and response times",
                "6. Review error handling and edge cases",
                "7. Deploy to production after successful testing"
              ]}
            />
          </div>

        </main>
      </div>
    </div>
  );
}
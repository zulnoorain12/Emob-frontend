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

export default function EmbedCodePage() {
  const [selectedEmbed, setSelectedEmbed] = useState('standard');
  const [selectedTab, setSelectedTab] = useState('html');
  const location = useLocation();

  const codeSnippets = {
    html: `<!-- Standard Embed -->
<div id="chatbot-widget"></div>
<script>
  window.ChatbotConfig = {
    apiKey: "YOUR_API_KEY",
    theme: "dark",
    position: "bottom-right",
    version: "standard"
  };
</script>
<script src="https://cdn.chatbotstudio.io/widget-standard.js"></script>`,

    css: `/* Optional CSS Customization */
#chatbot-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}`,

    javascript: `// Example: Custom Chatbot Trigger
document.getElementById("chatbot-widget").addEventListener("click", function() {
  console.log("Chatbot widget clicked");
});`
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-flex">
        <aside className="dashboard-sidebar">
          <div className="dashboard-logo-wrapper">
            <img src={logoImage} alt="Emob Logo" className="dashboard-logo" />
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

        <main className="embed-container">
          <h1 className="embed-title">Embed Your Chatbot</h1>
          <p className="embed-subtitle">Choose your framework and get production-ready embed codes</p>

          <div className="embed-content">
            <div className="embed-configuration">
              <h3>Configuration</h3>
              <div className="embed-type-options">
                <button className={`embed-option ${selectedEmbed === 'standard' ? 'active' : ''}`} onClick={() => setSelectedEmbed('standard')}>
                  Standard Embed
                  <span>Perfect for most websites and blogs</span>
                </button>
                <button className={`embed-option ${selectedEmbed === 'minimal' ? 'active' : ''}`} onClick={() => setSelectedEmbed('minimal')}>
                  Minimal Embed
                  <span>Lightweight version with essential features only</span>
                </button>
                <button className={`embed-option ${selectedEmbed === 'advanced' ? 'active' : ''}`} onClick={() => setSelectedEmbed('advanced')}>
                  Advanced Embed
                  <span>Full featured with analytics and custom branding</span>
                </button>
              </div>
            </div>

            <div className="embed-preview">
              <h2>Standard Embed</h2>
              <div className="badge-row">
                <span className="badge">Easy Setup</span>
                <span className="badge">Customizable Theme</span>
                <span className="badge">Responsive Design</span>
              </div>

              <div className="code-tabs">
                <button className={`tab-button ${selectedTab === 'html' ? 'active' : ''}`} onClick={() => setSelectedTab('html')}>HTML</button>
                <button className={`tab-button ${selectedTab === 'css' ? 'active' : ''}`} onClick={() => setSelectedTab('css')}>CSS</button>
                <button className={`tab-button ${selectedTab === 'javascript' ? 'active' : ''}`} onClick={() => setSelectedTab('javascript')}>JavaScript</button>
              </div>

              <div className="code-box">
                <pre><code>{codeSnippets[selectedTab]}</code></pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ text, path, active, icon }) {
  return (
    <Link to={path} className={`nav-item ${active ? 'active' : ''}`}>
      <img src={icon} alt={`${text} icon`} className="nav-img" />
      <span>{text}</span>
    </Link>
  );
}

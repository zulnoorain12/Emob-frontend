import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/customization.css'; // Tailwind layer file

import logoImage from '../assets/Icon.png';
import dashboardIcon from '../assets/icons/dashboard.png';
import embedIcon from '../assets/icons/embed.png';
import customizationIcon from '../assets/icons/customization.png';
import chatIcon from '../assets/icons/chat.png';
import subscriptionIcon from '../assets/icons/subscription.png';
import documentationIcon from '../assets/icons/documentation.png';
import contactIcon from '../assets/icons/contact.png';
import profileIcon from '../assets/icons/profile.png';

// 👇 Import your bot avatar image
import botAvatar from '../assets/Icon.png';

const NavItem = ({ text, path, icon, active }) => (
  <Link to={path} className={`nav-item ${active ? 'active' : ''}`}>
    <img src={icon} alt={`${text} icon`} className="nav-img" />
    <span>{text}</span>
  </Link>
);

export default function Customization() {
  const location = useLocation();

    // ✅ Sidebar toggle for mobile
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#00C897");
  const [botColor, setBotColor] = useState("#7f7fff");
  const [multiTheme, setMultiTheme] = useState(false);

  const accentOptions = ["#FFC107", "#00C897", "#4B47FF", "#FF5733"];
  const botOptions = ["#7f7fff", "#ff66cc"];

  return (
    <div className="dashboard-container">
      <div className="dashboard-flex">
        {/* ✅ Hamburger button visible only on mobile */}
        <button 
          className="hamburger-btn lg:hidden" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>

        {/* ✅ Dark overlay on mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}


        {/* Sidebar */}
         <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
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

        {/* Main Customization Panel */}
        <main className="customization-wrapper">
          <h2 className="customization-title">Customize</h2>
          <h5 className="customization-subtitle">Change the colors to customize your Chatbot</h5>

          <div className="customization-content">
            {/* Left Options */}
            <div className="customization-left">
              <div className="theme-section">
                <h4>Theme</h4>
                <div className="theme-buttons">
                  <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>☀️ Light</button>
                  <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>🌙 Dark</button>
                </div>
              </div>

              <div className="color-section">
                <h4>Color</h4>
                <p>Accent color</p>
                <div className="color-options">
                  {accentOptions.map((color, index) => (
                    <span
                      key={index}
                      className={`color-dot ${!multiTheme && accentColor === color ? "selected" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setAccentColor(color);
                        setMultiTheme(false);
                      }}
                    />
                  ))}

                  {/* Multicolor Circle */}
                  <span
                    className={`color-dot multicolor-dot ${multiTheme ? "selected" : ""}`}
                    title="Multicolor Theme"
                    onClick={() => setMultiTheme(true)}
                  />
                </div>
              </div>

              <div className="color-section">
                <p>Bot messages</p>
                <div className="color-options">
                  {botOptions.map((color, index) => (
                    <span
                      key={index}
                      className={`color-dot ${botColor === color ? "selected" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setBotColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Preview */}
            <div
              className={`chat-preview-box ${theme} ${multiTheme ? "theme-multi" : ""}`}
              style={!multiTheme ? { "--primary": accentColor } : {}}

            >
              {/* Bot message with avatar */}
              <div className="chat-row">
                <img src={botAvatar} alt="Bot Avatar" className="chat-avatar" />
                <div className="chat-bubble bot" style={{ backgroundColor: botColor }}>
                  Bot message here
                </div>
              </div>

              {/* User message */}
              <div
                className="chat-bubble user"
                style={!multiTheme ? { backgroundColor: accentColor } : {}}
              >
                User message here
              </div>

              {/* Suggested message */}
              <div className="chat-bubble suggestion">Suggested message here</div>

              {/* Input */}
              <input type="text" className="chat-input" placeholder="Type your message here..." />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

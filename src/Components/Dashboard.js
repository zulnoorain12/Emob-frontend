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

export default function Dashboard() {
  const location = useLocation();

  // ✅ Added state for enhanced functionality
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    conversations: 152,
    leads: 28,
    conversionRate: 18
  });

  // ✅ Enhanced function to copy embed code to clipboard with feedback
  const copyToClipboard = () => {
    const embedCode = `<script src='http://cdh.emob.com/embed.js'></script>`;
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy embed code."));
  };

  // ✅ Function to refresh stats (simulate real-time updates)
  const refreshStats = () => {
    setStats({
      conversations: stats.conversations + Math.floor(Math.random() * 5),
      leads: stats.leads + Math.floor(Math.random() * 3),
      conversionRate: Math.min(25, stats.conversionRate + Math.floor(Math.random() * 2))
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-flex">

        {/* Sidebar */}
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

        {/* Main content */}
        <main className="dashboard-main">
          {/* ✅ Enhanced header with refresh button */}
          <div className="dashboard-header">
            <h2 className="dashboard-heading">Hi Zara, here's your chatbot performance</h2>
            <button className="refresh-btn" onClick={refreshStats} title="Refresh Stats">
              🔄 Refresh
            </button>
          </div>

          <div className="dashboard-stats">
            <StatCard label="Conversations" value={stats.conversations} trend="+12%" />
            <StatCard label="Leads" value={stats.leads} trend="+8%" />
            <StatCard label="Conversion Rate" value={`${stats.conversionRate}%`} trend="+3%" />
          </div>

          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3>Embed Code</h3>
              <div className="embed-box">
                <code>&lt;script src='http://cdh.emob.com/embed.js'&gt;&lt;/script&gt;</code>
                {/* ✅ Enhanced copy button with feedback */}
                <button 
                  className={`btn-primary ${copied ? 'copied' : ''}`} 
                  onClick={copyToClipboard}
                >
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              {/* ✅ Added preview section */}
              <div className="embed-preview">
                <p>Preview:</p>
                <div className="chatbot-mini-preview">
                  💬 Your chatbot will appear here
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <h3>Customize Your Chatbot</h3>
              <p>Adjust the appearance of your chatbot to match your brand</p>
              {/* ✅ Enhanced with Link to customization page */}
              <Link to="/dashboard/customization">
                <button className="btn-primary">Customize</button>
              </Link>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li className="activity-item">
                  <span className="activity-dot green"></span>
                  Visitor started a new conversation — <span>Today, 11:45 AM</span>
                </li>
                <li className="activity-item">
                  <span className="activity-dot blue"></span>
                  Chatbot generated a lead — <span>Yesterday, 4:20 PM</span>
                </li>
                <li className="activity-item">
                  <span className="activity-dot green"></span>
                  Visitor started a new conversation — <span>Yesterday, 9:30 AM</span>
                </li>
              </ul>
            </div>
            <div className="dashboard-card">
              <h3>Subscription</h3>
              <p>Current Plan: <strong>Pro</strong></p>
              <p>Renewal Date: <strong>May 15, 2025</strong></p>
              {/* ✅ Added usage bar */}
              <div className="usage-indicator">
                <div className="usage-bar">
                  <div className="usage-fill" style={{width: '15.2%'}}></div>
                </div>
                <small>{stats.conversations}/1000 conversations used</small>
              </div>
              {/* ✅ Enhanced with Link to subscription page */}
              <Link to="/dashboard/subscription">
                <button className="btn-primary">Upgrade Plan</button>
              </Link>
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

// ✅ Enhanced StatCard with trend indicator
function StatCard({ label, value, trend }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
      {trend && <span className="trend-indicator">{trend}</span>}
    </div>
  );
}
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/Icon.png';

import '../styles/embed.css';
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
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  // ✅ Sidebar toggle for mobile
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const codeSnippets = {
    standard: {
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
    },
    minimal: {
      html: `<!-- Minimal Embed -->
<div id="chatbot-minimal"></div>
<script>
  window.ChatbotConfig = {
    apiKey: "YOUR_API_KEY",
    theme: "light",
    version: "minimal"
  };
</script>
<script src="https://cdn.chatbotstudio.io/widget-minimal.js"></script>`,

      css: `/* Minimal CSS */
#chatbot-minimal {
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 999;
}`,

      javascript: `// Minimal JavaScript
window.ChatbotMinimal = {
  init: function() {
    console.log("Minimal chatbot initialized");
  }
};`
    },
    advanced: {
      html: `<!-- Advanced Embed -->
<div id="chatbot-advanced"></div>
<script>
  window.ChatbotConfig = {
    apiKey: "YOUR_API_KEY",
    theme: "custom",
    position: "bottom-right",
    version: "advanced",
    analytics: true,
    customBranding: true
  };
</script>
<script src="https://cdn.chatbotstudio.io/widget-advanced.js"></script>`,

      css: `/* Advanced CSS Customization */
#chatbot-advanced {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  --primary-color: #6366f1;
  --secondary-color: #f1f5f9;
}`,

      javascript: `// Advanced JavaScript Configuration
window.ChatbotAdvanced = {
  onReady: function() {
    console.log("Advanced chatbot ready");
  },
  onMessage: function(message) {
    console.log("Message sent:", message);
  }
};`
    }
  };

  const embedConfig = {
    standard: {
      title: 'Standard Embed',
      description: 'Perfect for most websites and blogs',
      badges: ['Easy Setup', 'Customizable Theme', 'Responsive Design']
    },
    minimal: {
      title: 'Minimal Embed',
      description: 'Lightweight version with essential features only',
      badges: ['Lightweight', 'Fast Loading', 'Basic Features']
    },
    advanced: {
      title: 'Advanced Embed',
      description: 'Full featured with analytics and custom branding',
      badges: ['Analytics', 'Custom Branding', 'Advanced Features']
    }
  };

  const copyToClipboard = () => {
    const code = codeSnippets[selectedEmbed][selectedTab];
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
            <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"} lg:open`}>
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
          <div className="embed-header">
            <h1 className="embed-title">Embed Your Chatbot</h1>
            <p className="embed-subtitle">Choose your framework and get production-ready embed codes</p>
          </div>

          <div className="embed-content">
            <div className="embed-configuration">
              <h3>Configuration</h3>
              <div className="embed-type-label">Embed Type</div>
              <div className="embed-type-options">
                <button className={`embed-option ${selectedEmbed === 'standard' ? 'active' : ''}`} onClick={() => setSelectedEmbed('standard')}>
                  <div className="embed-option-title">Standard Embed</div>
                  <span>Perfect for most websites and blogs</span>
                </button>
                <button className={`embed-option ${selectedEmbed === 'minimal' ? 'active' : ''}`} onClick={() => setSelectedEmbed('minimal')}>
                  <div className="embed-option-title">Minimal Embed</div>
                  <span>Lightweight version with essential features only</span>
                </button>
                <button className={`embed-option ${selectedEmbed === 'advanced' ? 'active' : ''}`} onClick={() => setSelectedEmbed('advanced')}>
                  <div className="embed-option-title">Advanced Embed</div>
                  <span>Full featured with analytics and custom branding</span>
                </button>
              </div>
            </div>

            <div className="embed-preview">
              <div className="embed-preview-content">
                <div className="embed-preview-header">
                  <h2>{embedConfig[selectedEmbed].title}</h2>
                  <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                    {copied ? '✓ Copied!' : '📋 Copy Code'}
                  </button>
                </div>
                <div className="badge-row">
                  {embedConfig[selectedEmbed].badges.map((badge, index) => (
                    <span key={index} className="badge">{badge}</span>
                  ))}
                </div>
              </div>

              <div className="code-tabs">
                <button className={`tab-button ${selectedTab === 'html' ? 'active' : ''}`} onClick={() => setSelectedTab('html')}>HTML</button>
                <button className={`tab-button ${selectedTab === 'css' ? 'active' : ''}`} onClick={() => setSelectedTab('css')}>CSS</button>
                <button className={`tab-button ${selectedTab === 'javascript' ? 'active' : ''}`} onClick={() => setSelectedTab('javascript')}>JavaScript</button>
              </div>

              <div className="code-container">
                <div className="code-header">
                  <span className="code-language">{selectedTab.toUpperCase()} Integration</span>
                </div>
                <div className="code-box">
                  <pre><code>{codeSnippets[selectedEmbed][selectedTab]}</code></pre>
                </div>
              </div>

              <div className="integration-steps">
                <h4>🚀 Quick Integration Steps</h4>
                <ol>
                  <li>Replace "YOUR_API_KEY" with your actual API key</li>
                  <li>Copy the {selectedTab.toUpperCase()} code above</li>
                  <li>Paste it into your website before the closing &lt;/body&gt; tag</li>
                  <li>Your chatbot is now live! 🎉</li>
                </ol>
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
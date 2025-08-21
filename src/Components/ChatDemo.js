import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/chatdemo.css';

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

export default function ChatDemo() {
  const location = useLocation();

  // ✅ Sidebar toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi, I\'m your virtual assistant.\nHow can I help you today?' },
    { from: 'user', text: 'Do you ship internationally?' },
    { from: 'bot', text: 'Yes, we do! Offer international shipping to over 100 countries. What country would you be shipping to?' },
    { from: 'user', text: 'Germany' },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBotReply = async (userInput) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Sorry, I am just a demo bot. You asked: "${userInput}"`);
      }, 1200);
    });
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponse = await fetchBotReply(input);
    setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
    setIsLoading(false);
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
        {/* Sidebar */}
         <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"} lg:open`}>
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

        {/* Main Chat Area */}
        <main className="chat-main">
          <h1 className="chat-header">Demo</h1>
          <div className="chat-box">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.from}`}>
                  <span>{msg.text}</span>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message bot">
                  <span>Typing...</span>
                </div>
              )}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
              />
              <button onClick={sendMessage} disabled={isLoading}>➤</button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

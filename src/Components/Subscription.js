import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/subscription.css';
import logoImage from '../assets/Icon.png';

import dashboardIcon from '../assets/icons/dashboard.png';
import embedIcon from '../assets/icons/embed.png';
import customizationIcon from '../assets/icons/customization.png';
import chatIcon from '../assets/icons/chat.png';
import subscriptionIcon from '../assets/icons/subscription.png';
import documentationIcon from '../assets/icons/documentation.png';
import contactIcon from '../assets/icons/contact.png';
import profileIcon from '../assets/icons/profile.png';

// Reusable nav item component
const NavItem = ({ text, path, icon, active }) => (
  <Link to={path} className={`nav-item ${active ? 'active' : ''}`}>
    <img src={icon} alt={`${text} icon`} className="nav-img" />
    <span>{text}</span>
  </Link>
);

export default function Subscription() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // JavaScript functionality states
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState('month');
  const [animatedCards, setAnimatedCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      billing: "year",
      originalPrice: null,
      popular: false,
      features: [
        "1 Chatbot",
        "50 Messages P/M Chatbot",
        "500,000 characters/bot",
        "Widget customisation",
        "Chat history & insights",
        "Embed on unlimited websites",
        "WordPress Integration",
        "Powered by GPT-3.5"
      ]
    },
    {
      name: "Business",
      price: billingCycle === 'month' ? "$40" : "$360",
      billing: billingCycle,
      originalPrice: billingCycle === 'year' ? "$480" : null,
      popular: false,
      features: [
        "2 Chatbot",
        "2000 Messages P/M Chatbot",
        "12,000,000 characters/bot",
        "Widget customisation",
        "Chat history & insights",
        "Collect & export leads",
        "Embed on unlimited websites",
        "WordPress Integration",
        "Zapier Integration",
        "GPT-3.5 Turbo, GPT-4*, GPT-4 Turbo*"
      ]
    },
    {
      name: "Essential",
      price: billingCycle === 'month' ? "$16" : "$144",
      billing: billingCycle,
      originalPrice: billingCycle === 'year' ? "$192" : null,
      popular: true,
      features: [
        "5 Chatbot",
        "5000 Messages P/M Chatbot",
        "12,000,000 characters/bot",
        "Widget customisation",
        "Chat history & insights",
        "Embed on unlimited websites",
        "WordPress Integration",
        "Zapier Integration",
        "GPT-3.5 Turbo, GPT-4*, GPT-4 Turbo*",
        "Priority Support"
      ]
    }
  ];

  // JavaScript functions
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSubscribe = () => {
    alert(`Subscribing to ${selectedPlan.name} plan at ${selectedPlan.price}/${selectedPlan.billing}`);
    setShowModal(false);
    setSelectedPlan(null);
  };

  const handleBillingToggle = () => {
    setBillingCycle(prev => prev === 'month' ? 'year' : 'month');
  };

  const calculateSavings = (plan) => {
    if (plan.originalPrice && billingCycle === 'year') {
      const original = parseInt(plan.originalPrice.replace('$', ''));
      const current = parseInt(plan.price.replace('$', ''));
      return original - current;
    }
    return 0;
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

        {/* Main Content */}
        <main className="subscription-wrapper">
          <h2 className="subscription-heading">Start Enjoying Your New AI Assistant</h2>
          <p className="subscription-subheading">
            We have range of plans for businesses at all stages from startups to enterprise companies
          </p>

          {/* Billing Toggle - New JavaScript Functionality */}
          <div className="billing-toggle">
            <span className={`billing-label ${billingCycle === 'month' ? 'active' : ''}`}>Monthly</span>
            
            <label className="billing-switch">
              <input 
                type="checkbox" 
                checked={billingCycle === 'year'}
                onChange={handleBillingToggle}
                className="billing-input"
              />
              <span className={`billing-slider ${billingCycle === 'year' ? 'active' : ''}`}>
                <span className="billing-slider-thumb"></span>
              </span>
            </label>
            
            <span className={`billing-label ${billingCycle === 'year' ? 'active' : ''}`}>Yearly</span>
            
            {billingCycle === 'year' && (
              <span className="savings-badge">Save 25%</span>
            )}
          </div>

          <div className="subscription-plans">
            {plans.map((plan, idx) => (
              <div 
                className={`plan-card ${plan.popular ? 'popular' : ''} ${animatedCards ? 'animated' : ''} ${hoveredCard === idx ? 'hovered' : ''}`}
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}
                
                <h3 className="plan-name">{plan.name}</h3>
                
                <div className="plan-pricing">
                  <p className="plan-price">
                    {plan.price}
                    <span className="plan-billing"> / {plan.billing}</span>
                  </p>
                  
                  {/* Show original price and savings */}
                  {plan.originalPrice && (
                    <div className="price-savings">
                      <span className="original-price">{plan.originalPrice}</span>
                      <span className="savings-text">
                        Save ${calculateSavings(plan)}!
                      </span>
                    </div>
                  )}
                </div>
                
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="plan-feature">✅ {feature}</li>
                  ))}
                </ul>
                
                {/* Interactive Button */}
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className={`select-plan-btn ${plan.popular ? 'popular' : ''} ${hoveredCard === idx ? 'hovered' : ''}`}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal - New JavaScript Functionality */}
      {showModal && selectedPlan && (
        <div 
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-content">
            <button 
              onClick={() => setShowModal(false)}
              className="modal-close"
            >
              ×
            </button>
            
            <h3 className="modal-title">
              Confirm Your Selection
            </h3>
            
            <p className="modal-description">
              You've selected the <strong>{selectedPlan.name}</strong> plan.
            </p>
            
            <div className="modal-details">
              <p><strong>Price:</strong> {selectedPlan.price} / {selectedPlan.billing}</p>
              <p><strong>Billing:</strong> {billingCycle === 'month' ? 'Monthly' : 'Yearly'}</p>
              {selectedPlan.originalPrice && (
                <p className="modal-savings">
                  <strong>You save:</strong> ${calculateSavings(selectedPlan)} per year
                </p>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubscribe}
                className="btn-primary"
              >
                {selectedPlan.name === 'Free' ? 'Get Started' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
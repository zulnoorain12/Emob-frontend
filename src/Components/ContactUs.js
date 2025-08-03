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

import phoneIcon from '../assets/icons/phone.png';
import emailIcon from '../assets/icons/email.png';
import instagramIcon from '../assets/icons/instagram.png';
import linkedinIcon from '../assets/icons/linkedin.png';

const NavItem = ({ text, path, icon, active }) => (
  <Link to={path} className={`nav-item ${active ? 'active' : ''}`}>
    <img src={icon} alt={`${text} icon`} className="nav-img" />
    <span>{text}</span>
  </Link>
);

export default function ContactUsPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, subject, message } = formData;
    if (!fullName || !email || !subject || !message) {
      alert('Please fill all fields');
      return;
    }
    alert('Message sent!');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
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
            <NavItem text="Dashboard" path="/dashboard" icon={dashboardIcon} active={location.pathname === "/dashboard"} />
            <NavItem text="Embed Code" path="/dashboard/embed" icon={embedIcon} active={location.pathname === "/dashboard/embed"} />
            <NavItem text="Customization" path="/dashboard/customization" icon={customizationIcon} active={location.pathname === "/dashboard/customization"} />
            <NavItem text="Chat Demo" path="/dashboard/chat" icon={chatIcon} active={location.pathname === "/dashboard/chat"} />
            <NavItem text="Subscription" path="/dashboard/subscription" icon={subscriptionIcon} active={location.pathname === "/dashboard/subscription"} />
            <NavItem text="Documentation" path="/dashboard/documentation" icon={documentationIcon} active={location.pathname === "/dashboard/documentation"} />
            <NavItem text="Contact Us" path="/dashboard/contact" icon={contactIcon} active={location.pathname === "/dashboard/contact"} />
            <NavItem text="Profile" path="/dashboard/profile" icon={profileIcon} active={location.pathname === "/dashboard/profile"} />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="contact-main">
          <h2 className="contact-header">Contact Us</h2>
          <p className="contact-sub">Feel free to reach out, we'll get back to you as soon as possible!</p>

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-box">
                <img src={phoneIcon} alt="Phone" className="info-icon" />
                <h4>Phone</h4>
                <p>+1 (123) 456-7890</p>
              </div>
              <div className="info-box">
                <img src={emailIcon} alt="Email" className="info-icon" />
                <h4>Email</h4>
                <p>support@example.com</p>
              </div>
              <div className="info-box">
                <img src={instagramIcon} alt="Instagram" className="info-icon" />
                <h4>Instagram</h4>
                <p>@username</p>
              </div>
              <div className="info-box">
                <img src={linkedinIcon} alt="LinkedIn" className="info-icon" />
                <h4>LinkedIn</h4>
                <p>@username</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Get in touch</h3>
              <p>If you have any inquiries, technical support, or just want to say hello, we’d love to hear from you.</p>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" />
              <button type="submit">Send Now</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

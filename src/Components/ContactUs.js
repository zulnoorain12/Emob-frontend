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

  // Enhanced functionality additions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errors, setErrors] = useState({});

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Character count for message
  const messageCharCount = formData.message.length;
  const maxMessageLength = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent message from exceeding max length
    if (name === 'message' && value.length > maxMessageLength) {
      return;
    }
    
    setFormData({ ...formData, [name]: value });
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to send message');
      // }

      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle copy contact info to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    });
  };

  // Handle opening social media links
  const openSocialLink = (platform) => {
    const links = {
      instagram: 'https://instagram.com/username',
      linkedin: 'https://linkedin.com/in/username'
    };
    window.open(links[platform], '_blank');
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
              <div className="info-box" onClick={() => copyToClipboard('+1 (123) 456-7890', 'Phone number')} style={{cursor: 'pointer'}} title="Click to copy">
                <img src={phoneIcon} alt="Phone" className="info-icon" />
                <h4>Phone</h4>
                <p>+1 (123) 456-7890</p>
              </div>
              <div className="info-box" onClick={() => copyToClipboard('support@example.com', 'Email')} style={{cursor: 'pointer'}} title="Click to copy">
                <img src={emailIcon} alt="Email" className="info-icon" />
                <h4>Email</h4>
                <p>support@example.com</p>
              </div>
              <div className="info-box" onClick={() => openSocialLink('instagram')} style={{cursor: 'pointer'}} title="Visit our Instagram">
                <img src={instagramIcon} alt="Instagram" className="info-icon" />
                <h4>Instagram</h4>
                <p>@username</p>
              </div>
              <div className="info-box" onClick={() => openSocialLink('linkedin')} style={{cursor: 'pointer'}} title="Visit our LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="info-icon" />
                <h4>LinkedIn</h4>
                <p>@username</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Get in touch</h3>
              <p>If you have any inquiries, technical support, or just want to say hello, we'd love to hear from you.</p>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div style={{backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #c3e6cb'}}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #f5c6cb'}}>
                  ✗ Please check the form for errors and try again.
                </div>
              )}

              <div>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  style={{borderColor: errors.fullName ? '#dc3545' : ''}}
                  disabled={isSubmitting}
                />
                {errors.fullName && <div style={{color: '#dc3545', fontSize: '12px', marginTop: '3px'}}>{errors.fullName}</div>}
              </div>

              <div>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email" 
                  style={{borderColor: errors.email ? '#dc3545' : ''}}
                  disabled={isSubmitting}
                />
                {errors.email && <div style={{color: '#dc3545', fontSize: '12px', marginTop: '3px'}}>{errors.email}</div>}
              </div>

              <div>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Subject" 
                  style={{borderColor: errors.subject ? '#dc3545' : ''}}
                  disabled={isSubmitting}
                />
                {errors.subject && <div style={{color: '#dc3545', fontSize: '12px', marginTop: '3px'}}>{errors.subject}</div>}
              </div>

              <div>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Message" 
                  style={{borderColor: errors.message ? '#dc3545' : ''}}
                  disabled={isSubmitting}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px'}}>
                  {errors.message && <div style={{color: '#dc3545', fontSize: '12px'}}>{errors.message}</div>}
                  <div style={{color: messageCharCount > maxMessageLength * 0.8 ? '#dc3545' : '#6c757d', fontSize: '12px', marginLeft: 'auto'}}>
                    {messageCharCount}/{maxMessageLength}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Now'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
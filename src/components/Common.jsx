import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash]);
  return null;
}

export function Skeleton({ type }) {
  return <div className={`skeleton ${type}`}></div>;
}

export function ProductImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`image-wrap ${isLoaded ? 'loaded' : ''}`}>
      {!isLoaded && <Skeleton type="image" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
}

export function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toast ${isVisible ? 'visible' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
}

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenNewsletter = sessionStorage.getItem('becane_newsletter_seen');
      if (!hasSeenNewsletter) {
        setIsVisible(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('becane_newsletter_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="newsletter-popup fade-in-up">
      <button className="newsletter-close" onClick={handleClose}>✕</button>
      {!submitted ? (
        <>
          <h4>Join the Community</h4>
          <p>Get exclusive access to new drops and 10% off your first order.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-discover dark-btn">Sign Up</button>
          </form>
        </>
      ) : (
        <div className="newsletter-success">
          <h4>Welcome Aboard!</h4>
          <p>Check your inbox for your welcome code.</p>
        </div>
      )}
    </div>
  );
}

export function InfoModal({ isOpen, title, content, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="info-modal-overlay fade-in" onClick={onClose}>
      <div className="info-modal-card" onClick={e => e.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose}>✕</button>
        <h3 className="info-modal-title">{title}</h3>
        <p className="info-modal-body">{content}</p>
      </div>
    </div>
  );
}

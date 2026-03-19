import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <Logo className="footer-logo-svg" />
          <p>Paris, France</p>
          <p>hello@becaneparis.com</p>
        </div>
        <div className="footer-links">
          <h4>SHOP</h4>
          <ul>
            <li><a href="#">Jackets</a></li>
            <li><a href="#">Trousers</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>ASSISTANCE</h4>
          <ul>
            <li key="shipping"><Link to="/shipping">Shipping</Link></li>
            <li key="returns"><Link to="/returns">Returns</Link></li>
            <li key="size-guide"><Link to="/size-guide">Size Guide</Link></li>
            <li key="services"><Link to="/services">Our Promises</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>SOCIAL</h4>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; 2026 BÉCANE PARIS. ALL RIGHTS RESERVED. DESIGNED FOR THE FREE.</p>
      </div>
    </footer>
  );
}

export default Footer;

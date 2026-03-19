import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Navbar({ cartCount, onOpenCart, onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (target) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + target);
    } else {
      const id = target.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar fade-in">
      <div className="nav-left">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ position: 'relative', zIndex: 1001 }}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}><span></span></div>
        </button>
        <Link to="/" className="brand-link" onClick={() => setIsMenuOpen(false)}>
          <Logo className="navbar-logo" />
        </Link>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <span className="nav-link" onClick={() => handleNav('#collection')}>Collection</span>
        <span className="nav-link" onClick={() => handleNav('#stories')}>Stories</span>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Atelier</Link>
        <Link to="/wishlist" className="nav-link mobile-only" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
        <Link to="/orders" className="nav-link mobile-only" onClick={() => setIsMenuOpen(false)}>Orders</Link>
      </div>

      <div className="nav-actions">
        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
            onBlur={() => !isSearchOpen && setIsSearchOpen(false)}
          />
          <button className="search-trigger" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div className="nav-link cart-trigger" onClick={onOpenCart}>
          Cart ({cartCount})
        </div>
        <Link to="/wishlist" className="nav-link desktop-only" style={{ fontSize: '1.2rem', lineHeight: 1 }}>♡</Link>
        <Link to="/orders" className="nav-link desktop-only" style={{ fontSize: '1.2rem', lineHeight: 1 }}>📦</Link>
      </div>
    </nav>
  );
}

export default Navbar;

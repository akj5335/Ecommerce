import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';

const products = [
  { id: 1, name: 'Technical Jacket 01', category: 'Ride', price: 40500, description: 'Technical, protective and unapologetically feminine. This jacket is designed for high-performance use without compromising on style. Features integrated pocket systems and abrasion-resistant fabrics.', image: '/assets/jacket.png' },
  { id: 2, name: 'Protective Denim', category: 'City', price: 25200, description: 'Heavyweight denim reinforced with technical fibers. Built to look like your favorite pair of vintage jeans but performs like professional gear. High waist and ergonomic fit for comfort in any setting.', image: '/assets/denim.png' },
  { id: 3, name: 'Urban Tech Boot', category: 'Footwear', price: 28800, description: 'Functional urban boots with reinforced soles and weather protection. Waterproof membrane and non-slip soles ensure safety in all conditions. Handmade in Portugal using premium Italian leather.', image: '/assets/boot.png' },
  { id: 4, name: 'Performance Backpack', category: 'Safety', price: 25200, description: 'Weatherproof technical backpack with an aerodynamic profile. Engineered for maximum airflow and carrying comfort during active use.', image: '/assets/helmet.png' },
  { id: 5, name: 'City Rider Gloves', category: 'City', price: 10800, description: 'Sleek, touch-screen compatible leather gloves for the urban commuter.', image: '/assets/gloves.png' },
  { id: 6, name: 'Adventure Pant', category: 'Ride', price: 31500, description: 'All-terrain protection with maximum flexibility.', image: '/assets/pant.png' },
  { id: 7, name: 'Heritage Vest', category: 'Ride', price: 21600, description: 'Waxed canvas vest with internal pockets. Perfect for layering over a hoodie or under a jacket.', image: '/assets/jacket.png' },
  { id: 8, name: 'Vintage Goggles', category: 'Safety', price: 7650, description: 'Classic goggles with anti-fog treated lenses and triple-layer foam.', image: '/assets/gloves.png' },
  { id: 9, name: 'Technical Silk Scarf', category: 'City', price: 5850, description: 'Windproof silk blend scarf. A touch of elegance with technical performance.', image: '/assets/denim.png' },
  { id: 10, name: 'Pro Performance Sneaker', category: 'Footwear', price: 18900, description: 'High-performance technical sneakers with reinforced composite soles and breathable mesh.', image: '/assets/boot.png' },
  { id: 11, name: 'Technical Overshirt 01', category: 'City', price: 22500, description: 'A lightweight armored overshirt designed for the urban rider. Blends high-strength technical fibers with a classic silhouette. Features discreet reinforced elbows and shoulders.', image: '/assets/jacket.png' },
  { id: 12, name: 'Precision Tailored Trouser', category: 'Ride', price: 26100, description: 'High-performance trousers with integrated stretch panels and hidden impact protection. Tailored for an elegant fit that moves as you do.', image: '/assets/pant.png' },
  { id: 13, name: 'Stealth Urban Hoodie', category: 'City', price: 18900, description: 'Minimalist riding hoodie with a technical knit exterior and internal safety linings. Features a streamlined profile and reflective accents.', image: '/assets/jacket.png' },
  { id: 14, name: 'Commuter Trench Coat', category: 'City', price: 44100, description: 'Weather-resistant, refined trench coat engineered for city movement. Integrated windproof membrane and subtle safety details.', image: '/assets/jacket.png' },
  { id: 15, name: 'Urban Shell Glove 01', category: 'City', price: 12600, description: 'Minimalist leather riding gloves with hidden knuckle protection and touch-screen compatibility. Lean, elegant, and durable.', image: '/assets/gloves.png' },
  { id: 16, name: 'City Chelsea Boot', category: 'Footwear', price: 29700, description: 'Protective Chelsea boots in matte black leather. Integrated ankle armor and reinforced toe box with a minimalist silhouette.', image: '/assets/boot.png' },
  { id: 17, name: 'Modular Sling Bag', category: 'Safety', price: 14400, description: 'Matte black modular sling bag with reflective trim and aerodynamic profile. Designed for secure, urban carry.', image: '/assets/helmet.png' },
  { id: 18, name: 'Reflective Neck Protector', category: 'Safety', price: 6300, description: 'Windproof technical neck guard with integrated reflective detailing for low-light visibility.', image: '/assets/denim.png' },
];

const Logo = ({ className }) => (
  <svg className={`logo-svg ${className}`} viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10H45C55 10 60 15 60 22C60 29 55 33 48 34C56 35 62 40 62 48C62 56 56 60 45 60H15V10Z" fill="currentColor" />
    <path d="M30 20V30H42C46 30 48 28 48 25C48 22 46 20 42 20H30Z" fill="white" />
    <path d="M30 38V50H44C49 50 51 47 51 44C51 41 49 38 44 38H30Z" fill="white" />
    <text x="75" y="45" fontFamily="var(--font-heading)" fontWeight="900" fontSize="32" letterSpacing="0.1em" fill="currentColor">BÉCANE</text>
    <text x="215" y="45" fontFamily="var(--font-heading)" fontWeight="300" fontSize="14" letterSpacing="0.4em" fill="currentColor">PARIS</text>
  </svg>
);

function ScrollToTop() {
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

function ProductImage({ src, alt }) {
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
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
        <Link to="/wishlist" className="nav-link" style={{ fontSize: '1.2rem', lineHeight: 1 }}>♡</Link>
        <Link to="/orders" className="nav-link" style={{ fontSize: '1.2rem', lineHeight: 1 }}>📦</Link>
      </div>
    </nav>
  );
}

function Toast({ message, isVisible, onClose }) {
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

function CartDrawer({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <p className="empty-msg">Your cart is empty.</p>
              <button className="btn-discover" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <h4>{item.name}</h4>
                    <button className="remove-btn" onClick={() => onRemove(index)}>✕</button>
                  </div>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

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

function NewsletterPopup() {
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

function Wishlist({ items, onRemove }) {
  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">♡</div>
            <p>Your wishlist is empty.</p>
            <Link to="/" className="btn-discover">Explore Collection</Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map(product => (
              <div key={product.id} className="product-card fade-in">
                <Link to={`/product/${product.id}`} className="product-image">
                  <ProductImage src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(product.id)} style={{ fontSize: '1.2rem' }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductReviews() {
  const reviews = [
    { name: 'Sarah M.', date: 'Oct 12, 2025', rating: 5, comment: 'Absolutely in love with the fit. The protection feels substantial but not bulky. 100% worth the investment.' },
    { name: 'Elena R.', date: 'Sep 28, 2025', rating: 5, comment: 'Rode 500km in this jacket last weekend. Breathability is unmatched. The design turns heads everywhere.' },
    { name: 'Claire T.', date: 'Sep 15, 2025', rating: 4, comment: 'Great quality materials. The sizing runs slightly small, glad I used the fit guarantee to swap it.' },
  ];

  return (
    <div className="reviews-section fade-in">
      <h3 className="section-title" style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '2rem' }}>Client Reviews (4.8/5)</h3>
      <div className="reviews-list">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <span className="review-meta">{r.name} • {r.date}</span>
            </div>
            <p className="review-text">"{r.comment}"</p>
          </div>
        ))}
      </div>
      <button className="btn-discover dark-btn" style={{ marginTop: '2rem' }}>Read All 48 Reviews</button>
    </div>
  );
}

function InfoModal({ isOpen, title, content, onClose }) {
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

function TrustBadges() {
  const badges = [
    { icon: '🛡️', label: 'Crash Replacement', tooltip: '50% off if damaged in an accident.' },
    { icon: '📏', label: 'Fit Guarantee', tooltip: 'Free size exchanges until it fits.' },
    { icon: '♾️', label: 'Lifetime Repair', tooltip: 'Professional repair service available.' },
  ];

  return (
    <div className="trust-badges">
      {badges.map((b, i) => (
        <div key={i} className="trust-badge" title={b.tooltip}>
          <span className="trust-badge-icon">{b.icon}</span>
          <span className="trust-badge-label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function USPSection() {
  const [modalInfo, setModalInfo] = useState(null);

  const usps = [
    { title: 'Perfect Fit', desc: 'Free size exchanges until it fits perfectly.', detailedDesc: 'We know buying gear online can be tricky. That’s why we offer unlimited free size exchanges until you get the perfect fit. We cover the shipping both ways.', icon: '📏' },
    { title: 'Crash Replacement', desc: '50% off a new item if damaged in an accident.', detailedDesc: 'If you damage your Bécane gear in an accident, send it back to us and we will give you 50% off a replacement. We want you protected, always.', icon: '🛡️' },
    { title: 'Atelier Repair', desc: 'Professional repair service for wear and tear.', detailedDesc: 'We build products to last a lifetime. If you need a zipper replaced or a seam fixed, our Paris atelier offers repair services to keep your gear on the road.', icon: '♾️' },
    { title: 'Rider Tested', desc: 'Road-tested for 1000km before release.', detailedDesc: 'Every product is rigorously tested on the road for at least 1000km by real riders before it goes into production.', icon: '🏍️' },
    { title: 'Parisian Design', desc: 'Crafted in the heart of Paris.', detailedDesc: 'Designed in our Paris studio, blending high fashion heritage with modern technical needs.', icon: '🇫🇷' },
    { title: 'European Quality', desc: 'Small batch production in Portugal.', detailedDesc: 'We partner with family-owned factories in Portugal known for their exceptional craftsmanship and ethical standards.', icon: '💎' },
    { title: 'Weather Proof', desc: 'Advanced membranes for all elements.', detailedDesc: 'Our proprietary membranes are waterproof and breathable, keeping you dry in the rain and cool in the heat.', icon: '⛈️' },
    { title: 'Global Delivery', desc: 'Worldwide shipping available.', detailedDesc: 'We ship to over 50 countries worldwide with tracked, express options.', icon: '🚚' },
  ];

  return (
    <>
      <section className="usp-section container fade-in">
        <div className="usp-grid">
          {usps.map((usp, idx) => (
            <div key={idx} className="usp-item" onClick={() => setModalInfo(usp)}>
              <div className="usp-icon">{usp.icon}</div>
              <h3 className="usp-title">{usp.title}</h3>
              <p className="usp-desc">{usp.desc}</p>
              <button className="usp-learn-more">Learn More</button>
            </div>
          ))}
        </div>
      </section>
      <InfoModal
        isOpen={!!modalInfo}
        title={modalInfo?.title}
        content={modalInfo?.detailedDesc}
        onClose={() => setModalInfo(null)}
      />
    </>
  );
}

function RelatedProducts({ currentCategory, currentId }) {
  const related = products
    .filter(p => p.category !== currentCategory && p.id !== currentId) // Suggest different categories
    .slice(0, 3); // Take top 3

  if (related.length === 0) return null;

  return (
    <div className="section container fade-in" style={{ marginTop: '4rem' }}>
      <h3 className="section-title" style={{ textAlign: 'left', fontSize: '1.5rem', marginBottom: '2rem' }}>Complete the Look</h3>
      <div className="product-grid">
        {related.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-image">
              <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <div>
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
              </div>
              <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MyOrders({ orders }) {
  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">My Orders</h1>
        {orders.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📦</div>
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className="btn-discover">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, i) => (
              <div key={i} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="order-items">
                  {order.items.map((item, j) => (
                    <div key={j} className="order-item-row">
                      <span>{item.quantity}x {item.name} ({item.size})</span>
                      <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <span>Total</span>
                  <span className="order-total">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Skeleton({ type }) {
  return <div className={`skeleton ${type}`}></div>;
}

function Home({ searchResults, toggleWishlist, wishlist }) {
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getFilteredProducts = () => {
    let items = products;
    if (searchResults.length > 0) {
      items = searchResults;
    }
    if (filter !== 'All') {
      items = items.filter(p => p.category === filter);
    }
    return items;
  };

  const finalProducts = getFilteredProducts();

  return (
    <>
      <Helmet>
        <title>Bécane Paris | Couture Armor for Women</title>
        <meta name="description" content="Redefining protective wear for women. Bécane Paris merges technical performance with urban sophistication. Discover our collection of technical jackets, protective denim, and performance footwear." />
        <meta name="keywords" content="protective wear, women fashion, technical clothing, paris fashion, motorcycle gear women" />
      </Helmet>
      <section className="hero" style={{ backgroundImage: `url('/assets/jacket.png')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <p className="hero-tagline">COLLECTION 01 / 01</p>
          <h1 className="hero-title">BORN ON THE ROAD, MADE FOR THE CITY.</h1>
          <a href="#collection" className="btn-discover">Discover</a>
        </div>
      </section>

      <USPSection />

      <section id="collection" className="section container">
        <h2 className="section-title fade-in">The Collection</h2>

        <div className="filter-bar fade-in">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => {
                setFilter(cat);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton type="image" />
                <div className="product-info">
                  <div>
                    <Skeleton type="text-short" />
                    <Skeleton type="text-long" />
                  </div>
                  <Skeleton type="text-short" />
                </div>
              </div>
            ))
          ) : finalProducts.length > 0 ? (
            finalProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card fade-in">
                <button
                  className={`wishlist-heart ${wishlist.some(i => i.id === product.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                >
                  {wishlist.some(i => i.id === product.id) ? '♥' : '♡'}
                </button>
                <div className="product-image">
                  <ProductImage src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results fade-in">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>We couldn't find any products matching your selection.</p>
              <button className="btn-discover" onClick={() => setFilter('All')}>View All Products</button>
            </div>
          )}
        </div>
      </section>


      <section id="stories" className="section story-parallax-container">
        <div className="story-parallax-bg" style={{ backgroundImage: `url('/assets/jacket.png')` }}></div>
        <div className="story-overlay"></div>
        <div className="container story-content-wrapper fade-in">
          <div className="story-grid-layout">
            <div className="story-visual">
              <div className="story-image-frame">
                <img src="/assets/denim.png" alt="Bécane Atelier" />
              </div>
            </div>
            <div className="story-text-content">
              <h2 className="section-title text-left">The Atelier</h2>
              <p className="story-lead">Born on the road. Made for the city.</p>
              <p>
                Bécane Paris is a hybrid fashion brand redefining protective wear for women. We design modern essentials that merge technical performance with urban sophistication.
              </p>
              <p>
                Each piece is <strong>couture armor</strong> — designed by women, for women. We refuse to compromise between safety and style. Our garments integrate flexible materials, reflective elements, and discreet technical inserts.
              </p>
              <div className="story-quote">
                "No compromise. No concession."
              </div>
              <p className="story-founder">— Akshay Jain, Founder</p>
              <a href="#" className="btn-discover dark-btn">Read the Journal</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="section container">Product not found.</div>;

  return (
    <div className="product-detail fade-in">
      <Helmet>
        <title>{product.name} | Bécane Paris</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="detail-container container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-content">
          <p className="product-category">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="detail-description">
            <p>{product.description}</p>
          </div>
          <div className="detail-options">
            <div className="option-group">
              <label>Size</label>
              <div className="size-selector">
                {['XS', 'S', 'M', 'L'].map(size => (
                  <button
                    key={size}
                    className={selectedSize === size ? 'active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="option-group">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>
          <button
            className="btn-add-to-cart"
            onClick={() => onAddToCart({ ...product, size: selectedSize, quantity })}
          >
            Add to Cart
          </button>
          <TrustBadges />
        </div>
      </div>
      <div className="container" style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid #eee' }}>
        <RelatedProducts currentCategory={product.category} currentId={product.id} />
        <div style={{ margin: '4rem 0', borderTop: '1px solid #eee' }}></div>
        <ProductReviews />
      </div>
    </div>
  );
}

const initialFormState = {
  firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
  cardNumber: '', expiry: '', cvc: ''
};

function Checkout({ cartItems, clearCart, onOrderPlaced }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const [step, setStep] = useState(1); // 1=Shipping, 2=Payment, 3=Processing, 4=Success
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zip || !/^\d{5,6}$/.test(formData.zip)) newErrors.zip = 'Valid ZIP code required';
    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Valid 16-digit card number required';
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'MM/YY format required';
    if (!formData.cvc || !/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = 'Valid CVC required';
    return newErrors;
  };

  const traverseToPayment = (e) => {
    e.preventDefault();
    const shippingErrors = validateShipping();
    if (Object.keys(shippingErrors).length > 0) {
      setErrors(shippingErrors);
      return;
    }
    setErrors({});
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const paymentErrors = validatePayment();
    if (Object.keys(paymentErrors).length > 0) {
      setErrors(paymentErrors);
      return;
    }

    setStep(3); // Processing
    setTimeout(() => {
      const newOrder = {
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        items: cartItems,
        total: total,
        customer: formData
      };

      const existingOrders = JSON.parse(localStorage.getItem('becane_orders') || '[]');
      localStorage.setItem('becane_orders', JSON.stringify([newOrder, ...existingOrders]));

      if (onOrderPlaced) onOrderPlaced();
      clearCart();
      setStep(4); // Success
      window.scrollTo(0, 0);
    }, 2500);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="section container" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn-discover" style={{ marginTop: '2rem' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page section container fade-in">
      {step === 3 && (
        <div className="processing-overlay">
          <div className="spinner"></div>
          <h2>Processing Payment...</h2>
          <p>Please do not close this window.</p>
        </div>
      )}

      {step < 4 ? (
        <div className="checkout-container">
          <div className="checkout-form-side">
            <h1 className="detail-title">{step === 1 ? 'Shipping Information' : 'Payment Details'}</h1>

            {step === 1 ? (
              <form className="checkout-form" onSubmit={traverseToPayment}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className={errors.firstName ? 'error' : ''} />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className={errors.lastName ? 'error' : ''} />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} type="text" className={errors.address ? 'error' : ''} />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input name="city" value={formData.city} onChange={handleChange} type="text" className={errors.city ? 'error' : ''} />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input name="zip" value={formData.zip} onChange={handleChange} type="text" className={errors.zip ? 'error' : ''} />
                    {errors.zip && <span className="error-text">{errors.zip}</span>}
                  </div>
                </div>
                <button type="submit" className="btn-add-to-cart" style={{ maxWidth: 'none', marginTop: '2rem' }}>
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form className="checkout-form payment-form" onSubmit={handleFinalSubmit}>
                <div className="form-group" style={{ position: 'relative' }}>
                  <label>Card Number</label>
                  <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} type="text" placeholder="0000 0000 0000 0000" maxLength="19" className={errors.cardNumber ? 'error' : ''} />
                  <span className="card-icon">💳</span>
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input name="expiry" value={formData.expiry} onChange={handleChange} type="text" placeholder="MM/YY" maxLength="5" className={errors.expiry ? 'error' : ''} />
                    {errors.expiry && <span className="error-text">{errors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input name="cvc" value={formData.cvc} onChange={handleChange} type="text" placeholder="123" maxLength="4" className={errors.cvc ? 'error' : ''} />
                    {errors.cvc && <span className="error-text">{errors.cvc}</span>}
                  </div>
                </div>
                <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-discover" style={{ border: '1px solid #ddd' }}>Back</button>
                  <button type="submit" className="btn-add-to-cart" style={{ maxWidth: 'none', flex: 1 }}>
                    Pay ₹{total.toLocaleString('en-IN')}
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="checkout-summary-side">
            <h2>Order Summary</h2>
            <div className="summary-list">
              {cartItems.map((item, index) => (
                <div key={index} className="summary-item">
                  <span>{item.name} ({item.size})</span>
                  <span>₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="order-success" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>📦</div>
          <h1 className="detail-title">Order Confirmed</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
            Thank you for your order, {formData.firstName}. <br />
            We have sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
          <button onClick={() => navigate('/')} className="btn-discover">Back to Collection</button>
        </div>
      )}
    </div>
  );
}

function Shipping() {
  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">Shipping Information</h1>
        <div className="info-content">
          <p>Bécane Paris offers worldwide shipping for our global community. Each piece is carefully packaged and dispatched from our atelier.</p>
          <h3>Delivery Times</h3>
          <ul>
            <li><strong>France:</strong> 2-3 business days</li>
            <li><strong>Europe:</strong> 3-5 business days</li>
            <li><strong>International:</strong> 7-10 business days</li>
          </ul>
          <h3>Shipping Costs</h3>
          <p>Shipping costs are calculated at checkout based on your delivery address and order weight. Free shipping is available on orders over ₹45,000.</p>
        </div>
      </div>
    </div>
  );
}

function Returns() {
  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">Returns & Exchanges</h1>
        <div className="info-content">
          <p>We want you to be completely satisfied with your Bécane Paris purchase. If for any reason you are not, we offer a 14-day return policy.</p>
          <h3>How to Return</h3>
          <ol>
            <li>Ensure the item is in its original condition with all tags attached.</li>
            <li>Email hello@becaneparis.com to request a return authorization.</li>
            <li>Ship the item back to our atelier using a tracked service.</li>
          </ol>
          <p>Once received and inspected, we will process your refund within 5 business days.</p>
        </div>
      </div>
    </div>
  );
}

function SizeGuide() {
  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">Size Guide</h1>
        <div className="info-content">
          <p>Our garments are engineered for a precise, technical fit. Use the guide below to find your perfect size.</p>
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (cm)</th>
                <th>Waist (cm)</th>
                <th>Hip (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>XS</td><td>80-84</td><td>62-66</td><td>88-92</td></tr>
              <tr><td>S</td><td>84-88</td><td>66-70</td><td>92-96</td></tr>
              <tr><td>M</td><td>88-92</td><td>70-74</td><td>96-100</td></tr>
              <tr><td>L</td><td>92-96</td><td>74-78</td><td>100-104</td></tr>
            </tbody>
          </table>
          <p style={{ marginTop: '2rem' }}>If you are between sizes, we recommend choosing the larger size for a more comfortable riding experience.</p>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { title: 'Perfect Fit Guarantee', icon: '📏', desc: 'We know buying gear online can be tricky. That’s why we offer unlimited free size exchanges until you get the perfect fit. We cover the shipping both ways.' },
    { title: 'Crash Replacement', icon: '🛡️', desc: 'If you damage your Bécane gear in an accident, send it back to us and we will give you 50% off a replacement. We want you protected, always.' },
    { title: 'Atelier Repair Service', icon: '♾️', desc: 'We build products to last a lifetime. If you need a zipper replaced or a seam fixed, our Paris atelier offers repair services to keep your gear on the road.' },
    { title: 'Rider Tested', icon: '🏍️', desc: 'Every product is rigorously tested on the road for at least 1000km by real riders before it goes into production.' },
  ];

  return (
    <div className="section container fade-in info-page">
      <div className="info-wrap">
        <h1 className="detail-title">Our Promises</h1>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('becane_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    localStorage.setItem('becane_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('becane_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('becane_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('becane_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Listen for localstorage changes to update orders in real-time if needed, 
  // but mostly we just need it on mount or when checkout completes.
  // Actually, handleFinalSubmit in Checkout updates localStorage directly. 
  // We can force a refresh or pass a handler. 
  // For simplicity, let's read distinct from App state or validly update it.
  // A better way is to pass `onCheckoutSuccess` to Checkout.

  const refreshOrders = () => {
    const saved = localStorage.getItem('becane_orders');
    if (saved) setOrders(JSON.parse(saved));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        setToast({ message: 'Removed from wishlist.', isVisible: true });
        return prev.filter(p => p.id !== product.id);
      }
      setToast({ message: 'Added to wishlist.', isVisible: true });
      return [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === product.size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: (newItems[existingItemIndex].quantity || 1) + (product.quantity || 1)
        };
        return newItems;
      }

      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
    setToast({ message: `Added ${product.name} to cart.`, isVisible: true });
  };

  const removeFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={(query) => {
            const results = products.filter(p =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(query.trim() === '' ? [] : results);
          }}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} onOrderPlaced={refreshOrders} />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/services" element={<Services />} />
            <Route path="/wishlist" element={<Wishlist items={wishlist} onRemove={id => toggleWishlist({ id })} />} />
            <Route path="/orders" element={<MyOrders orders={orders} />} />
          </Routes>
        </main>
        <NewsletterPopup />
        <Footer />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={(index, newQuantity) => {
            if (newQuantity < 1) {
              removeFromCart(index);
            } else {
              const newItems = [...cartItems];
              newItems[index] = { ...newItems[index], quantity: newQuantity };
              setCartItems(newItems);
            }
          }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>
    </Router>
  );
}

export default App;

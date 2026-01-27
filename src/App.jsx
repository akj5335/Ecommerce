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
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
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

function USPSection() {
  const usps = [
    { title: 'Parisian Design', desc: 'Crafted in the heart of Paris for a unique aesthetic.', icon: '🇫🇷' },
    { title: 'Performance Built', desc: 'High-tech abrasion-resistant and technical fabrics.', icon: '🛡️' },
    { title: 'European Quality', desc: 'Small batch production in Portugal for premium results.', icon: '💎' },
    { title: 'Weather Proof', desc: 'Advanced membranes protecting you from every element.', icon: '⛈️' },
    { title: 'Shock Absorption', desc: 'Integrated impact protection for high-performance use.', icon: '⚡' },
    { title: 'Eco-Conscious', desc: 'Sustainable manufacturing and responsibly sourced materials.', icon: '🌱' },
    { title: 'Global Delivery', desc: 'Specialized worldwide shipping for our global community.', icon: '🚚' },
    { title: 'Versatile Fit', desc: 'Engineered for seamless movement from road to city.', icon: '🌀' },
  ];

  return (
    <section className="usp-section container fade-in">
      <div className="usp-grid">
        {usps.map((usp, idx) => (
          <div key={idx} className="usp-item">
            <div className="usp-icon">{usp.icon}</div>
            <h3 className="usp-title">{usp.title}</h3>
            <p className="usp-desc">{usp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skeleton({ type }) {
  return <div className={`skeleton ${type}`}></div>;
}

function Home({ searchResults }) {
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


      <section id="stories" className="section container story-section">
        <div className="fade-in story-content">
          <h2 className="section-title">OUR STORY</h2>
          <div className="story-paragraphs">
            <p className="story-lead">Born on the road. Made for the city.</p>
            <p>
              Bécane Paris is a hybrid fashion brand redefining protective wear for women. We design modern essentials that merge technical performance with urban sophistication, created for movement across both city streets and open roads.
            </p>
            <p>
              Each piece is designed by women, for women, with a precise focus on fit, mobility, and understated protection. Our garments integrate flexible materials, reflective elements, and discreet technical inserts — engineered to perform while maintaining a refined, minimal aesthetic.
            </p>
            <p>
              We approach protection differently. Not as an add-on, but as part of the design itself. This philosophy shapes what we call <strong>couture armor</strong> — clothing that supports confidence, safety, and freedom without compromising style.
            </p>
            <p>
              Bécane Paris stands for women who move with intention. Who define their own direction. Who expect performance, elegance, and purpose in everything they wear.
            </p>
            <p className="story-motto">No compromise. No concession.</p>
            <p className="story-founder">— Founded by Akshay Jain</p>
          </div>
          <a href="#" className="btn-discover" style={{ marginTop: '2rem' }}>Read More</a>
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
        </div>
      </div>
    </div>
  );
}

function Checkout({ cartItems, clearCart }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      clearCart();
    }, 500);
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
      {step === 1 ? (
        <div className="checkout-container">
          <div className="checkout-form-side">
            <h1 className="detail-title">Shipping Information</h1>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" required placeholder="Jane" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" required placeholder="Doe" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."
                />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <input type="text" required placeholder="123 Street Name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" required placeholder="Paris" />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    required
                    placeholder="75000"
                    pattern="^[0-9]{5,6}$"
                    title="Please enter a valid zip code (5-6 digits)."
                  />
                </div>
              </div>
              <button type="submit" className="btn-add-to-cart" style={{ maxWidth: 'none', marginTop: '2rem' }}>
                Place Order • ₹{total.toLocaleString('en-IN')}
              </button>
            </form>
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
            Thank you for your order. We've sent a confirmation email to you. <br />
            Your order is being prepared for delivery.
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
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
          </Routes>
        </main>
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

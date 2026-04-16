import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrustBadges } from '../components/USPSection';
import { ProductImage } from '../components/Common';

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

function RelatedProducts({ products = [], currentCategory, currentId }) {
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

function ProductDetail({ products = [], onAddToCart, userInfo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  const handleOrderNow = () => {
    onAddToCart({ ...product, size: selectedSize, quantity });
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  if (products.length === 0) {
    return (
      <div className="section container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn-add-to-cart"
              onClick={() => onAddToCart({ ...product, size: selectedSize, quantity })}
              style={{ flex: 1 }}
            >
              Add to Cart
            </button>
            <button
              className="btn-add-to-cart"
              onClick={handleOrderNow}
              style={{ flex: 1, backgroundColor: '#111', color: '#fff' }}
            >
              Order Now
            </button>
          </div>
          <TrustBadges />
        </div>
      </div>
      <div className="container" style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid #eee' }}>
        <RelatedProducts products={products} currentCategory={product.category} currentId={product.id} />
        <div style={{ margin: '4rem 0', borderTop: '1px solid #eee' }}></div>
        <ProductReviews />
      </div>
    </div>
  );
}

export default ProductDetail;

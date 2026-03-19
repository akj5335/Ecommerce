import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../components/Common';

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

export default Wishlist;

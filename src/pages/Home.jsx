import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import { ProductImage, Skeleton } from '../components/Common';
import { USPSection } from '../components/USPSection';

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

export default Home;

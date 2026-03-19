import React from 'react';

export function Shipping() {
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

export function Returns() {
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

export function SizeGuide() {
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

export function Services() {
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

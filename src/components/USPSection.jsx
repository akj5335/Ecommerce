import React, { useState } from 'react';
import { InfoModal } from './Common';

export function TrustBadges() {
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

export function USPSection() {
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

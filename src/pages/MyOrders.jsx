import React from 'react';
import { Link } from 'react-router-dom';

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

export default MyOrders;

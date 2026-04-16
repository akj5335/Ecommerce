import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, userInfo }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
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

export default CartDrawer;

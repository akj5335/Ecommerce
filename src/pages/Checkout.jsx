import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

export default Checkout;

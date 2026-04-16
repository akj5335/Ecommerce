import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Login({ setUserInfo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('becane_userInfo', JSON.stringify(data));
        setUserInfo(data);
        navigate('/');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Server Error. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="section container fade-in" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Helmet>
        <title>Login | Bécane Paris</title>
      </Helmet>
      <div className="checkout-form-side" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', border: '1px solid #111', padding: '3rem', backgroundColor: '#faf9f5' }}>
        <h1 className="detail-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h1>
        {error && <div className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form className="checkout-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-add-to-cart" style={{ maxWidth: 'none', marginTop: '2rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>New Customer? <Link to="/register" style={{ textDecoration: 'underline' }}>Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

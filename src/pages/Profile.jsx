import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { supabase } from '../supabaseClient';

function Profile({ userInfo, setUserInfo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const name = userInfo?.user_metadata?.name || userInfo?.name;

  if (!userInfo) return null;

  return (
    <div className="section container fade-in" style={{ minHeight: '60vh', marginTop: '4rem' }}>
      <Helmet>
        <title>My Profile | Bécane Paris</title>
      </Helmet>
      <div className="checkout-container">
        <div className="checkout-summary-side" style={{ flex: 1, backgroundColor: '#faf9f5', border: '1px solid #eee', padding: '3rem' }}>
          <h1 className="detail-title">My Profile</h1>
          <div style={{ marginTop: '2rem' }}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            {userInfo.app_metadata?.is_admin && <p><strong>Status:</strong> Administrator</p>}
          </div>
          <button 
            className="btn-discover dark-btn" 
            style={{ marginTop: '3rem' }} 
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        
        <div className="checkout-form-side" style={{ flex: 2 }}>
          <h2 className="section-title" style={{ textAlign: 'left' }}>Order History</h2>
          <p>Please click on the "Orders" tab in the navigation menu to view your past purchases.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

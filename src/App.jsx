import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { ScrollToTop, Toast, NewsletterPopup } from './components/Common';
import { supabase } from './supabaseClient';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Shipping, Returns, SizeGuide, Services } from './pages/InfoPages';

function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem('becane_userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('becane_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    // Get session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('becane_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('becane_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('becane_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('becane_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const refreshOrders = () => {
    const saved = localStorage.getItem('becane_orders');
    if (saved) setOrders(JSON.parse(saved));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        setToast({ message: 'Removed from wishlist.', isVisible: true });
        return prev.filter(p => p.id !== product.id);
      }
      setToast({ message: 'Added to wishlist.', isVisible: true });
      return [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === product.size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: (newItems[existingItemIndex].quantity || 1) + (product.quantity || 1)
        };
        return newItems;
      }

      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
    setToast({ message: `Added ${product.name} to cart.`, isVisible: true });
  };

  const removeFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={(query) => {
            const results = products.filter(p =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(query.trim() === '' ? [] : results);
          }}
          userInfo={userInfo}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home products={products} searchResults={searchResults} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} onAddToCart={addToCart} userInfo={userInfo} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} onOrderPlaced={refreshOrders} userInfo={userInfo} />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/services" element={<Services />} />
            <Route path="/wishlist" element={<Wishlist items={wishlist} onRemove={id => toggleWishlist({ id })} />} />
            <Route path="/orders" element={<MyOrders orders={orders} />} />
            <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
            <Route path="/register" element={<Register setUserInfo={setUserInfo} />} />
            <Route path="/profile" element={<Profile userInfo={userInfo} setUserInfo={setUserInfo} />} />
          </Routes>
        </main>
        <NewsletterPopup />
        <Footer />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemove={removeFromCart}
          userInfo={userInfo}
          onUpdateQuantity={(index, newQuantity) => {
            if (newQuantity < 1) {
              removeFromCart(index);
            } else {
              const newItems = [...cartItems];
              newItems[index] = { ...newItems[index], quantity: newQuantity };
              setCartItems(newItems);
            }
          }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>
    </Router>
  );
}

export default App;

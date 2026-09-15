import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('buynest_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('buynest_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // Sync with server if logged in
  useEffect(() => {
    if (user) {
      fetchServerWishlist();
    }
  }, [user]);

  const fetchServerWishlist = async () => {
    try {
      const res = await api.get('/wishlist');
      if (res.data && res.data.items) {
        setWishlist(res.data.items);
      }
    } catch (err) {
      console.warn('Server wishlist fetch failed, using local wishlist:', err.message);
    }
  };

  const addToWishlist = async (product) => {
    if (!product) return;
    if (wishlist.some(item => item.product_id === product.product_id)) return;

    setWishlist(prev => [product, ...prev]);

    if (user) {
      try {
        await api.post('/wishlist', { product_id: product.product_id });
      } catch (err) {
        console.warn('Server wishlist sync error:', err.message);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlist(prev => prev.filter(item => item.product_id !== productId));

    if (user) {
      try {
        await api.delete(`/wishlist/${productId}`);
      } catch (err) {
        console.warn('Server wishlist remove error:', err.message);
      }
    }
  };

  const toggleWishlist = (product) => {
    if (isWishlisted(product.product_id)) {
      removeFromWishlist(product.product_id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

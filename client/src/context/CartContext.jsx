import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.id ? null : prev));
    }, 4000);
  };

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      setSubtotal(0);
      setTotalItems(0);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/cart');
      setItems(res.data.items || []);
      setSubtotal(res.data.subtotal || 0);
      setTotalItems(res.data.totalItems || 0);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      showToast('Please log in to add items to your cart.', 'info');
      return { success: false, requireAuth: true };
    }
    try {
      const res = await api.post('/cart', { product_id: productId, quantity });
      setItems(res.data.items || []);
      setSubtotal(res.data.subtotal || 0);
      setTotalItems(res.data.totalItems || 0);
      showToast('Added to cart successfully!', 'success');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add item to cart.';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      const res = await api.put(`/cart/${cartId}`, { quantity });
      setItems(res.data.items || []);
      setSubtotal(res.data.subtotal || 0);
      setTotalItems(res.data.totalItems || 0);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update quantity.';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const res = await api.delete(`/cart/${cartId}`);
      setItems(res.data.items || []);
      setSubtotal(res.data.subtotal || 0);
      setTotalItems(res.data.totalItems || 0);
      showToast('Item removed from cart', 'info');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to remove item.';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setItems([]);
      setSubtotal(0);
      setTotalItems(0);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const value = {
    items,
    subtotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    toastMessage,
    showToast,
    clearToast: () => setToastMessage(null),
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

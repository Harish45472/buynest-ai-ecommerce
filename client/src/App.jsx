import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import AiAssistant from './components/AiAssistant';
import AuthModal from './components/AuthModal';
import NotificationToast from './components/NotificationToast';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboard from './pages/AdminDashboard';

function MainLayout() {
  const { user, isAdmin } = useAuth();

  // Navigation and Modal States
  const [activeView, setActiveView] = useState('home'); // 'home', 'checkout', 'orders', 'admin'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [highlightOrderId, setHighlightOrderId] = useState(null);

  const handleOrderComplete = (orderId) => {
    setHighlightOrderId(orderId);
    setActiveView('orders');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Universal Floating Toast Notifications */}
      <NotificationToast />

      {/* Global Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          if (activeView !== 'home') setActiveView('home');
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          if (activeView !== 'home') setActiveView('home');
        }}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setActiveView('checkout')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* AI Assistant Chat Widget / Modal */}
      <AiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Sign-In / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Main Content Area based on active view */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenAiAssistant={() => setIsAiOpen(true)}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutPage
            onBackToShopping={() => setActiveView('home')}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {activeView === 'orders' && (
          <OrderHistoryPage
            onBackToShopping={() => setActiveView('home')}
            onSelectProduct={(p) => setSelectedProduct(p)}
            highlightOrderId={highlightOrderId}
          />
        )}

        {activeView === 'admin' && (
          isAdmin ? (
            <AdminDashboard onBackToShopping={() => setActiveView('home')} />
          ) : (
            <div className="max-w-md mx-auto py-24 text-center px-4">
              <h2 className="text-xl font-bold text-slate-800">Access Restricted</h2>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                You need Administrator credentials to view the store management console.
              </p>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Sign In with Admin Account
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">AuraMart</span>
            <span>• Next-Gen AI Shopping Assistant Platform</span>
          </div>
          <p>© 2026 AuraMart Inc. All rights reserved. Stock validated atomically with SQLite & React.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </AuthProvider>
  );
}

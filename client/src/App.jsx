import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import ProductComparisonModal from './components/ProductComparisonModal';
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
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [highlightOrderId, setHighlightOrderId] = useState(null);

  // When user logs in, prioritize clothes immediately
  const prevUserRef = React.useRef(user);
  React.useEffect(() => {
    if (user && !prevUserRef.current) {
      setSelectedCategory('Men');
      setSelectedSubCategory('all');
      setActiveView('home');
    }
    prevUserRef.current = user;
  }, [user]);

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
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setActiveView('checkout')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Product Comparison Modal */}
      <ProductComparisonModal />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* AI Assistant Chat Sidebar / Widget */}
      <AiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsAiOpen(false);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenAiAssistant={() => setIsAiOpen(true)}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutPage
            onOrderSuccess={handleOrderComplete}
            onContinueShopping={() => setActiveView('home')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeView === 'orders' && (
          <OrderHistoryPage
            highlightOrderId={highlightOrderId}
            onShopMore={() => setActiveView('home')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeView === 'admin' && (
          isAdmin ? (
            <AdminDashboard />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl shadow-sm text-center border border-slate-100">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ⚠️
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Admin Access Required</h2>
              <p className="text-sm text-slate-500 mb-6">
                You must be logged in as an administrator to manage BUYNEST catalog, categories, and fulfill orders.
              </p>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition"
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
            <span className="font-bold text-white text-sm">BUYNEST</span>
            <span>• India's AI-Powered Smart Lifestyle Marketplace</span>
          </div>
          <p>© 2026 BUYNEST India Ltd. All rights reserved. 680+ Products across 7 Core Categories with Razorpay & Real UPI.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <MainLayout />
          </ComparisonProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

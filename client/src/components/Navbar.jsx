import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, User, LogOut, ShieldCheck, ClipboardList, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories = [],
  onOpenAiAssistant,
  onOpenAuth,
  activeView,
  setActiveView
}) {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Aura<span className="text-emerald-600">Mart</span>
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-emerald-600 uppercase tracking-widest -mt-1">
                  AI-Powered Shopping
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products, brands, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 font-semibold text-xs sm:text-sm shadow-sm transition hover:shadow group"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span className="hidden xs:inline">Ask AI</span>
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                AI
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account / Navigation */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition text-sm font-medium text-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveView('orders')}
                      className="w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4 text-slate-400" />
                      My Orders & Tracking
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => setActiveView('admin')}
                        className="w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition shadow-sm"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 animate-fade-in">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, User, LogOut, ShieldCheck, ClipboardList, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Mega Menu Department & Subcategory Structure inspired by Myntra
export const MEGA_MENU_DATA = {
  'Men': {
    accent: 'text-rose-600',
    border: 'border-b-2 border-rose-500',
    columns: [
      {
        title: 'Topwear',
        items: ['All Topwear', 'Casual Shirts', 'Formal Shirts', 'T-Shirts', 'Jackets']
      },
      {
        title: 'Indian & Festive Wear',
        items: ['All Indian Wear', 'Kurtas & Kurta Sets', 'Nehru Jackets']
      },
      {
        title: 'Bottomwear',
        items: ['All Bottomwear', 'Jeans', 'Casual Trousers', 'Joggers']
      },
      {
        title: 'Footwear',
        items: ['All Footwear', 'Sneakers', 'Casual Shoes', 'Formal Shoes']
      },
      {
        title: 'Fashion Accessories',
        items: ['Watches', 'Wallets', 'Belts', 'Sunglasses']
      }
    ]
  },
  'Women': {
    accent: 'text-pink-600',
    border: 'border-b-2 border-pink-500',
    columns: [
      {
        title: 'Ethnic & Fusion Wear',
        items: ['All Ethnic Wear', 'Kurtas & Suits', 'Sarees', 'Anarkali Suits']
      },
      {
        title: 'Western Wear',
        items: ['All Western Wear', 'Dresses & Maxis', 'Tops & Tunics', 'Jeggings & Jeans']
      },
      {
        title: 'Footwear',
        items: ['All Footwear', 'Block Heels', 'Comfort Flats', 'Casual Sneakers']
      },
      {
        title: 'Bags & Accessories',
        items: ['Handbags & Totes', 'Wallets & Clutches', 'Jewellery']
      }
    ]
  },
  'Kids': {
    accent: 'text-orange-600',
    border: 'border-b-2 border-orange-500',
    columns: [
      {
        title: 'Boys Clothing',
        items: ['Graphic T-Shirts', 'Denim Shorts', 'Hoodies']
      },
      {
        title: 'Girls Clothing',
        items: ['Floral Frocks', 'Party Dresses', 'Leggings']
      },
      {
        title: 'Footwear & Toys',
        items: ['LED Light-Up Sneakers', 'Sandals', 'Essentials']
      }
    ]
  },
  'Home & Living': {
    accent: 'text-amber-600',
    border: 'border-b-2 border-amber-500',
    columns: [
      {
        title: 'Kitchen & Dining',
        items: ['Ceramic Dinner Sets', 'Pour-Over Coffee Brewers', 'Insulated Flasks']
      },
      {
        title: 'Home Decor & Fragrance',
        items: ['Aroma Diffusers', 'Ambient Lamps', 'Wall Art']
      },
      {
        title: 'Bedding & Furnishing',
        items: ['Egyptian Cotton Bedsheets', 'Cushions & Throws']
      },
      {
        title: 'Sports & Active',
        items: ['Natural Cork Yoga Mats', 'Fitness Flasks']
      }
    ]
  },
  'Beauty & Grooming': {
    accent: 'text-teal-600',
    border: 'border-b-2 border-teal-500',
    columns: [
      {
        title: 'Skincare',
        items: ['Vitamin C Glow Serums', 'Hyaluronic Sunscreens SPF 50', 'Moisturizers']
      },
      {
        title: 'Fragrances',
        items: ['Luxury Eau De Parfum', 'Bergamot Fragrances', 'Body Mists']
      },
      {
        title: 'Grooming Tools',
        items: ['Beard & Body Trimmers', 'Hair Styling Tools']
      }
    ]
  },
  'Gadgets & Tech': {
    accent: 'text-indigo-600',
    border: 'border-b-2 border-indigo-500',
    columns: [
      {
        title: 'Smart Wearables',
        items: ['AMOLED Smartwatches', 'Fitness Trackers']
      },
      {
        title: 'Audio & Headphones',
        items: ['Active Noise Cancelling (ANC)', 'True Wireless Earbuds (TWS)', 'Bluetooth Speakers']
      },
      {
        title: 'Computers & Laptops',
        items: ['Thin & Light Laptops', 'Tech Accessories']
      }
    ]
  }
};

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  onOpenAiAssistant,
  onOpenAuth,
  activeView,
  setActiveView
}) {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);

  const handleSubCategoryClick = (categoryName, subItem) => {
    setSelectedCategory(categoryName);
    if (subItem.startsWith('All ')) {
      setSelectedSubCategory('all');
    } else {
      setSelectedSubCategory(subItem);
    }
    setActiveMegaCategory(null);
    if (activeView !== 'home') setActiveView('home');
  };

  const handleMainCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory('all');
    setActiveMegaCategory(null);
    if (activeView !== 'home') setActiveView('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 text-center font-semibold tracking-wide flex items-center justify-center gap-2">
        <span>🇮🇳 <strong>FESTIVE SALE LIVE</strong>: Free Express Delivery on orders above ₹999 + Instant AI Shopping Guide</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          {/* Logo */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubCategory('all');
              setActiveView('home');
            }}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Aura<span className="text-emerald-600">Mart</span>
              </span>
              <span className="hidden sm:block text-[9px] font-black text-emerald-600 uppercase tracking-widest -mt-1">
                AI Smart E-Commerce
              </span>
            </div>
          </button>

          {/* Desktop Mega-Menu Nav Links (Myntra-style) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full">
            {Object.keys(MEGA_MENU_DATA).map((catName) => {
              const isActive = selectedCategory === catName;
              const isHovered = activeMegaCategory === catName;
              return (
                <div
                  key={catName}
                  className="h-full flex items-center"
                  onMouseEnter={() => setActiveMegaCategory(catName)}
                >
                  <button
                    onClick={() => handleMainCategoryClick(catName)}
                    className={`h-full px-3 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1 ${
                      isActive || isHovered
                        ? `${MEGA_MENU_DATA[catName].accent} border-b-2 border-current font-extrabold`
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {catName}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/90 border-none rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Trigger with badge */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Ask AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-slate-700 hover:text-emerald-600 hover:bg-slate-100 rounded-2xl transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 bg-emerald-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account / Navigation */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 transition text-sm font-medium text-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline text-xs font-bold max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${isAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveView('orders')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4 text-slate-400" />
                      My Orders & Tracking
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => setActiveView('admin')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
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
                className="px-4 py-2 text-xs font-black text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 animate-fade-in space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>
            {/* Mobile categories accordion */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {Object.keys(MEGA_MENU_DATA).map(catName => (
                <button
                  key={catName}
                  onClick={() => {
                    handleMainCategoryClick(catName);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold border transition ${
                    selectedCategory === catName
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Desktop Mega Menu Panel (Myntra-style Multi-column Drawer) */}
      {activeMegaCategory && MEGA_MENU_DATA[activeMegaCategory] && (
        <div
          onMouseEnter={() => setActiveMegaCategory(activeMegaCategory)}
          onMouseLeave={() => setActiveMegaCategory(null)}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black uppercase tracking-widest ${MEGA_MENU_DATA[activeMegaCategory].accent}`}>
                  {activeMegaCategory} Department
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400 font-medium">Click any subcategory to browse</span>
              </div>
              <button
                onClick={() => handleMainCategoryClick(activeMegaCategory)}
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 underline"
              >
                View All {activeMegaCategory} Items &rarr;
              </button>
            </div>

            <div className="grid grid-cols-5 gap-8">
              {MEGA_MENU_DATA[activeMegaCategory].columns.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className={`text-xs font-black uppercase tracking-wider border-b border-slate-100 pb-1.5 ${MEGA_MENU_DATA[activeMegaCategory].accent}`}>
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <button
                          onClick={() => handleSubCategoryClick(activeMegaCategory, item)}
                          className="text-xs text-slate-600 hover:text-slate-950 hover:font-bold transition-all text-left w-full hover:translate-x-1"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

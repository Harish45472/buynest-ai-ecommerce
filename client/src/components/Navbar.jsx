import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, User, LogOut, ShieldCheck, ClipboardList, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchSuggestions from './SearchSuggestions';

// Mega Menu Department & Subcategory Structure for BUYNEST (All 76 Subcategories)
export const MEGA_MENU_DATA = {
  'Men': {
    accent: 'text-rose-600',
    border: 'border-b-2 border-rose-500',
    columns: [
      {
        title: 'Casual & Outerwear',
        items: ['All Men', 'T-shirts', 'Shirts', 'Jeans', 'Trousers', 'Hoodies', 'Jackets', 'Sweatshirts', 'Shorts']
      },
      {
        title: 'Ethnic & Formal',
        items: ['Ethnic wear', 'Kurtas', 'Formal wear', 'Blazers', 'Suits', 'Innerwear']
      },
      {
        title: 'Footwear & Accessories',
        items: ['Shoes', 'Sneakers', 'Sandals', 'Watches', 'Wallets', 'Belts', 'Sunglasses', 'Bags']
      }
    ]
  },
  'Women': {
    accent: 'text-pink-600',
    border: 'border-b-2 border-pink-500',
    columns: [
      {
        title: 'Ethnic & Festive',
        items: ['All Women', 'Kurtis', 'Sarees', 'Lehengas', 'Salwar suits', 'Ethnic wear']
      },
      {
        title: 'Western & Casual',
        items: ['T-shirts', 'Shirts', 'Dresses', 'Tops', 'Jeans', 'Trousers', 'Skirts', 'Leggings', 'Jackets', 'Western wear']
      },
      {
        title: 'Footwear & Jewellery',
        items: ['Heels', 'Sneakers', 'Sandals', 'Handbags', 'Watches', 'Jewellery', 'Sunglasses']
      }
    ]
  },
  'Electronics': {
    accent: 'text-blue-600',
    border: 'border-b-2 border-blue-500',
    columns: [
      {
        title: 'Devices & Computing',
        items: ['All Electronics', 'Smartphones', 'Laptops', 'Tablets', 'Monitors', 'Printers', 'Smart TVs', 'Cameras']
      },
      {
        title: 'Audio & Wearables',
        items: ['Headphones', 'Earbuds', 'Smartwatches', 'Speakers']
      },
      {
        title: 'Gaming & Peripherals',
        items: ['Gaming accessories', 'Keyboards', 'Mice', 'Power banks', 'Chargers', 'Computer accessories']
      }
    ]
  },
  'Home & Kitchen': {
    accent: 'text-amber-600',
    border: 'border-b-2 border-amber-500',
    columns: [
      {
        title: 'Living & Furniture',
        items: ['All Home & Kitchen', 'Furniture', 'Beds', 'Sofas', 'Tables', 'Chairs', 'Mattresses']
      },
      {
        title: 'Kitchen & Dining',
        items: ['Kitchen appliances', 'Cookware', 'Storage products']
      },
      {
        title: 'Decor & Essentials',
        items: ['Bedsheets', 'Curtains', 'Home decor', 'Lighting', 'Cleaning products']
      }
    ]
  },
  'Beauty & Personal Care': {
    accent: 'text-teal-600',
    border: 'border-b-2 border-teal-500',
    columns: [
      {
        title: 'Skincare & Cosmetics',
        items: ['All Beauty & Personal Care', 'Skincare', 'Makeup', 'Perfumes', 'Fragrances']
      },
      {
        title: 'Hair & Personal Care',
        items: ['Hair care', 'Hair Styling', 'Bath & Body', 'Oral Care', 'Grooming products', 'Personal hygiene']
      }
    ]
  },
  'Grocery': {
    accent: 'text-green-600',
    border: 'border-b-2 border-green-500',
    columns: [
      {
        title: 'Daily Staples & Kitchen',
        items: ['All Grocery', 'Rice', 'Atta', 'Pulses', 'Cooking Oil', 'Spices']
      },
      {
        title: 'Snacks & Beverages',
        items: ['Snacks', 'Beverages', 'Breakfast Foods', 'Chocolates', 'Dry Fruits']
      }
    ]
  },
  'Sports & Fitness': {
    accent: 'text-emerald-600',
    border: 'border-b-2 border-emerald-500',
    columns: [
      {
        title: 'Activewear & Shoes',
        items: ['All Sports & Fitness', 'Sports shoes', 'T-shirts', 'Track pants']
      },
      {
        title: 'Equipment & Sports Gear',
        items: ['Gym equipment', 'Fitness accessories', 'Cricket products', 'Football products', 'Badminton racquets', 'Yoga mats']
      }
    ]
  },
  'Books': {
    accent: 'text-indigo-600',
    border: 'border-b-2 border-indigo-500',
    columns: [
      {
        title: 'Literature & General',
        items: ['All Books', 'Fiction', 'Non-fiction', 'Children\'s Books']
      },
      {
        title: 'Academic & Tech',
        items: ['Programming', 'Engineering', 'Competitive Exams']
      }
    ]
  },
  'Toys & Baby': {
    accent: 'text-orange-600',
    border: 'border-b-2 border-orange-500',
    columns: [
      {
        title: 'Toys & STEM Games',
        items: ['All Toys & Baby', 'Toys', 'Games', 'Educational Toys']
      },
      {
        title: 'Baby & Kids Apparel',
        items: ['Baby Care', 'Baby Clothing', 'Boys Clothing', 'Girls Clothing', 'Kids Shoes']
      }
    ]
  },
  'Automotive': {
    accent: 'text-red-600',
    border: 'border-b-2 border-red-500',
    columns: [
      {
        title: 'Riding Gear & Safety',
        items: ['All Automotive', 'Helmets', 'Riding Gear']
      },
      {
        title: 'Vehicle Accessories & Care',
        items: ['Car Accessories', 'Bike Accessories', 'Car Care']
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
  onOpenWishlist,
  onOpenAuth,
  activeView,
  setActiveView,
  onSelectProduct
}) {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubCategoryClick = (categoryName, subItem) => {
    setSelectedCategory(categoryName);
    if (subItem.startsWith('All ')) {
      setSelectedSubCategory('all');
    } else {
      setSelectedSubCategory(subItem);
    }
    setActiveMegaCategory(null);
  };

  const handleMainCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory('all');
    setActiveMegaCategory(null);
    if (activeView !== 'home') setActiveView('home');
  };

  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);

  const handlePerformSearch = (term) => {
    const finalTerm = (term !== undefined ? term : searchTerm).trim();
    if (finalTerm) {
      setSearchTerm(finalTerm);
      setShowSuggestions(false);
      setShowMobileSuggestions(false);
      if (activeView !== 'home') setActiveView('home');
      try {
        const stored = JSON.parse(localStorage.getItem('buynest_recent_searches') || '[]');
        const updated = [finalTerm, ...stored.filter(s => s.toLowerCase() !== finalTerm.toLowerCase())].slice(0, 8);
        localStorage.setItem('buynest_recent_searches', JSON.stringify(updated));
      } catch (err) {}
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      {/* Top Banner for Express Indian Delivery & Cancellation */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-white/5">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>✨ <strong>BUYNEST FESTIVE 2026:</strong> Free Express Delivery across India &bull; 1-Click Order Cancellation &bull; Instant Razorpay UPI Refunds</span>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                setActiveView('home');
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setSearchTerm('');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                  BUY<span className="text-emerald-600">NEST</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block ml-1"></span>
                </span>
                <span className="hidden sm:block text-[9px] font-extrabold text-slate-400 -mt-1 tracking-widest uppercase">
                  INDIA’S PREMIER AI STORE
                </span>
              </div>
            </button>
          </div>

          {/* CENTERPIECE: VERY LARGE & PROMINENT DESKTOP SEARCH BAR (45% - 55% width) */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8 hidden md:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePerformSearch();
              }}
              className="relative w-full group"
            >
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                  if (activeView !== 'home') setActiveView('home');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handlePerformSearch();
                  }
                }}
                placeholder="Search for products, brands and more..."
                className="w-full h-[50px] pl-12 pr-28 text-[15px] bg-slate-100/90 hover:bg-slate-200/60 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium rounded-full border-2 border-slate-200/90 focus:border-emerald-500 focus:outline-none transition-all shadow-inner focus:shadow-xl"
              />
              
              {/* Clear button */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold w-6 h-6 rounded-full hover:bg-slate-200/70 flex items-center justify-center transition"
                  title="Clear search"
                >
                  ✕
                </button>
              )}

              {/* Prominent Search Action Button */}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Search</span>
              </button>

              <SearchSuggestions
                searchTerm={searchTerm}
                isVisible={showSuggestions}
                onClose={() => setShowSuggestions(false)}
                onSelectSuggestion={(sub) => handlePerformSearch(sub)}
                onPerformSearch={(query) => handlePerformSearch(query)}
                onSelectProduct={(prod) => {
                  if (onSelectProduct) onSelectProduct(prod);
                  setShowSuggestions(false);
                }}
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition"
              title="My Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-emerald-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 p-1.5 rounded-2xl hover:bg-slate-100 transition text-sm font-medium text-slate-700"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* PROMINENT MOBILE SEARCH BAR (100% full width, 48px height) */}
        <div className="md:hidden pb-3 pt-0.5 relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePerformSearch();
            }}
            className="relative w-full"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onFocus={() => setShowMobileSuggestions(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowMobileSuggestions(true);
                if (activeView !== 'home') setActiveView('home');
              }}
              placeholder="Search for products, brands and more..."
              className="w-full h-[46px] pl-10 pr-20 text-sm bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium rounded-2xl border border-slate-200 focus:border-emerald-500 focus:outline-none transition shadow-inner"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setShowMobileSuggestions(false);
                }}
                className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Search
            </button>

            <SearchSuggestions
              searchTerm={searchTerm}
              isVisible={showMobileSuggestions}
              onClose={() => setShowMobileSuggestions(false)}
              onSelectSuggestion={(sub) => handlePerformSearch(sub)}
              onPerformSearch={(query) => handlePerformSearch(query)}
              onSelectProduct={(prod) => {
                if (onSelectProduct) onSelectProduct(prod);
                setShowMobileSuggestions(false);
              }}
            />
          </form>
        </div>
      </div>

      {/* SECOND ROW: DESKTOP DEPARTMENT & CATEGORY NAVIGATION STRIP */}
      <div className="hidden md:block bg-slate-50/90 border-t border-slate-200/70 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-10">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setActiveMegaCategory(null);
                if (activeView !== 'home') setActiveView('home');
              }}
              className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              All Categories
            </button>

            {Object.keys(MEGA_MENU_DATA).map((catName) => {
              const isActive = selectedCategory === catName;
              const isHovered = activeMegaCategory === catName;
              return (
                <div
                  key={catName}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaCategory(catName)}
                >
                  <button
                    onClick={() => handleMainCategoryClick(catName)}
                    className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-wider transition rounded-lg flex items-center gap-0.5 ${
                      isActive
                        ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                        : isHovered
                        ? 'text-emerald-700 bg-emerald-50 font-bold'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                    }`}
                  >
                    <span>{catName}</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] font-semibold text-slate-500 hidden lg:flex items-center gap-3">
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              ⚡ 950+ Authentic Products
            </span>
            <span>•</span>
            <span>Free Express Delivery</span>
            <span>•</span>
            <span>100% Genuine Brands</span>
          </div>
        </div>
      </div>

      {/* Desktop Mega-Menu Hover Dropdown Box */}
      {activeMegaCategory && MEGA_MENU_DATA[activeMegaCategory] && (
        <div
          onMouseEnter={() => setActiveMegaCategory(activeMegaCategory)}
          onMouseLeave={() => setActiveMegaCategory(null)}
          className="hidden xl:block absolute left-0 right-0 bg-white shadow-2xl border-b border-slate-200 py-6 px-8 z-50 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <span className={`text-sm font-black uppercase tracking-wider ${MEGA_MENU_DATA[activeMegaCategory].accent}`}>
                Explore {activeMegaCategory}
              </span>
              <button
                onClick={() => handleMainCategoryClick(activeMegaCategory)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
              >
                View Entire Collection →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {MEGA_MENU_DATA[activeMegaCategory].columns.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1.5">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item, itemIdx) => {
                      const isCurrent = selectedSubCategory === item || (item.startsWith('All ') && selectedSubCategory === 'all' && selectedCategory === activeMegaCategory);
                      return (
                        <li key={itemIdx}>
                          <button
                            onClick={() => handleSubCategoryClick(activeMegaCategory, item)}
                            className={`text-xs block text-left transition-colors ${
                              isCurrent
                                ? 'font-black text-emerald-600'
                                : 'text-slate-600 hover:text-slate-900 font-medium'
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (activeView !== 'home') setActiveView('home');
              }}
              placeholder="Search products or brands..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 rounded-xl focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Departments
            </span>
            {Object.keys(MEGA_MENU_DATA).map((catName) => (
              <div key={catName} className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => {
                    handleMainCategoryClick(catName);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-1 text-xs font-black uppercase tracking-wide flex justify-between items-center text-slate-800"
                >
                  <span>{catName}</span>
                  <span className="text-[10px] text-slate-400">View All</span>
                </button>
                <div className="flex flex-wrap gap-1 mt-1">
                  {MEGA_MENU_DATA[catName].columns.flatMap(c => c.items.filter(i => !i.startsWith('All '))).map((subItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleSubCategoryClick(catName, subItem);
                        setMobileMenuOpen(false);
                      }}
                      className="px-2 py-0.5 bg-slate-100 text-[10px] font-medium text-slate-700 rounded-md hover:bg-slate-200"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

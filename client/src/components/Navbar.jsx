import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, User, LogOut, ShieldCheck, ClipboardList, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Mega Menu Department & Subcategory Structure for BUYNEST
export const MEGA_MENU_DATA = {
  'Men': {
    accent: 'text-rose-600',
    border: 'border-b-2 border-rose-500',
    columns: [
      {
        title: 'Apparel',
        items: ['All Men', 'T-shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets']
      },
      {
        title: 'Footwear & Accessories',
        items: ['Shoes', 'Watches', 'Wallets', 'Bags', 'Sunglasses']
      }
    ]
  },
  'Women': {
    accent: 'text-pink-600',
    border: 'border-b-2 border-pink-500',
    columns: [
      {
        title: 'Clothing',
        items: ['All Women', 'Dresses', 'Tops', 'Kurtis', 'Sarees', 'Jeans', 'Trousers']
      },
      {
        title: 'Footwear & Accessories',
        items: ['Handbags', 'Shoes', 'Watches', 'Jewellery', 'Sunglasses']
      }
    ]
  },
  'Electronics': {
    accent: 'text-blue-600',
    border: 'border-b-2 border-blue-500',
    columns: [
      {
        title: 'Devices & Computing',
        items: ['All Electronics', 'Smartphones', 'Laptops', 'Tablets', 'Cameras']
      },
      {
        title: 'Audio & Wearables',
        items: ['Headphones', 'Earbuds', 'Smartwatches', 'Speakers']
      },
      {
        title: 'Power & Accessories',
        items: ['Power banks', 'Chargers']
      }
    ]
  },
  'Home & Kitchen': {
    accent: 'text-amber-600',
    border: 'border-b-2 border-amber-500',
    columns: [
      {
        title: 'Living & Decor',
        items: ['All Home & Kitchen', 'Furniture', 'Home decor', 'Lighting', 'Curtains', 'Bedsheets']
      },
      {
        title: 'Kitchen & Appliances',
        items: ['Kitchen appliances', 'Cookware', 'Storage products']
      }
    ]
  },
  'Beauty & Personal Care': {
    accent: 'text-teal-600',
    border: 'border-b-2 border-teal-500',
    columns: [
      {
        title: 'Skincare & Makeup',
        items: ['All Beauty & Personal Care', 'Skincare', 'Makeup']
      },
      {
        title: 'Grooming & Fragrance',
        items: ['Perfumes', 'Hair care', 'Grooming products']
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
        title: 'Equipment & Sports',
        items: ['Gym equipment', 'Fitness accessories', 'Cricket products', 'Football products']
      }
    ]
  },
  'Kids': {
    accent: 'text-orange-600',
    border: 'border-b-2 border-orange-500',
    columns: [
      {
        title: 'Clothing & Footwear',
        items: ['All Kids', 'Boys clothing', 'Girls clothing', 'Kids shoes']
      },
      {
        title: 'Toys & School',
        items: ['Toys', 'School accessories']
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
  setActiveView
}) {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();
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
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 text-center font-semibold tracking-wide flex items-center justify-center gap-2">
        <span>🇮🇳 <strong>BUYNEST MEGA DEALS</strong>: Free Express Delivery on orders above ₹999 + Instant AI Personal Shopper</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-2 sm:gap-4">
          {/* Logo */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubCategory('all');
              setActiveView('home');
            }}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                BUY<span className="text-emerald-600">NEST</span>
              </span>
              <span className="hidden sm:block text-[9px] font-black text-emerald-600 uppercase tracking-widest -mt-1">
                AI Smart Marketplace
              </span>
            </div>
          </button>

          {/* Desktop Mega-Menu Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
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
                    className={`h-full px-2.5 text-[11px] font-black uppercase tracking-wider transition-colors flex items-center gap-0.5 ${
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

          {/* Live Search Bar */}
          <div className="flex-1 max-w-xs md:max-w-md relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (activeView !== 'home') setActiveView('home');
                }}
                placeholder="Search products, brands (boAt, Puma, Levis), categories..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-slate-300 rounded-full focus:outline-none transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
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
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl xl:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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

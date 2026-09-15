import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpDown, RefreshCw, Zap, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../api/client';
import { MEGA_MENU_DATA } from '../components/Navbar';

export default function HomePage({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory = 'all',
  setSelectedSubCategory,
  onSelectProduct,
  onOpenAiAssistant
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedSubCategory, inStockOnly, priceRange, sortBy]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.q = searchTerm;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedSubCategory && selectedSubCategory !== 'all') params.sub_category = selectedSubCategory;
      if (inStockOnly) params.inStock = 'true';
      if (sortBy) params.sortBy = sortBy;

      // INR Price bounds
      if (priceRange === 'under999') {
        params.maxPrice = 999;
      } else if (priceRange === '1000to2499') {
        params.minPrice = 1000;
        params.maxPrice = 2499;
      } else if (priceRange === '2500to5000') {
        params.minPrice = 2500;
        params.maxPrice = 5000;
      } else if (priceRange === 'over5000') {
        params.minPrice = 5000;
      }

      const res = await api.get('/products', { params });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    if (setSelectedSubCategory) setSelectedSubCategory('all');
    setInStockOnly(false);
    setPriceRange('all');
    setSortBy('featured');
  };

  // Get active subcategories list for currently selected category
  const activeSubCategories = selectedCategory !== 'all' && MEGA_MENU_DATA[selectedCategory]
    ? MEGA_MENU_DATA[selectedCategory].columns.flatMap(col => col.items.filter(i => !i.startsWith('All ')))
    : [];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen AI Shopping Assistant
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            India's Smartest Lifestyle Store, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Powered by AI Discovery.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover curated fashion, tech, home essentials, and grooming. Need personalized suggestions? Chat with Aura for instant recommendations in Indian Rupees.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAiAssistant}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Ask Aura AI Assistant
            </button>
            <a
              href="#catalog"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition backdrop-blur-sm"
            >
              Explore Products
            </a>
          </div>

          {/* Value Badges */}
          <div className="pt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-slate-800 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center justify-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Free Delivery &gt; ₹999</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>100% Authentic Brands</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant AI Product Matching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue & Filters Section */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory('all');
              if (setSelectedSubCategory) setSelectedSubCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Departments
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              onClick={() => {
                setSelectedCategory(cat.name);
                if (setSelectedSubCategory) setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories Filter Chips (if main category selected) */}
        {activeSubCategories.length > 0 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none animate-fade-in">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1 shrink-0">
              {selectedCategory}:
            </span>
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                selectedSubCategory === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All {selectedCategory}
            </button>
            {activeSubCategories.slice(0, 10).map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                  selectedSubCategory === sub
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Filter Controls Toolbar */}
        <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* INR Budget Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1">
              Budget:
            </span>
            {[
              { label: 'All Prices', val: 'all' },
              { label: 'Under ₹999', val: 'under999' },
              { label: '₹1,000 - ₹2,499', val: '1000to2499' },
              { label: '₹2,500 - ₹5,000', val: '2500to5000' },
              { label: 'Above ₹5,000', val: 'over5000' },
            ].map(p => (
              <button
                key={p.val}
                onClick={() => setPriceRange(p.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  priceRange === p.val
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Right Toolbar: Stock Check & Sorting */}
          <div className="flex items-center gap-4 ml-auto">
            {/* In-Stock Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Additions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info & Active Filters Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-black">{products.length}</strong> items
            {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
            {selectedCategory !== 'all' && <span> in <strong>{selectedCategory}</strong></span>}
            {selectedSubCategory && selectedSubCategory !== 'all' && <span> &gt; <strong>{selectedSubCategory}</strong></span>}
          </span>

          {(searchTerm || selectedCategory !== 'all' || (selectedSubCategory && selectedSubCategory !== 'all') || inStockOnly || priceRange !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-500">Curating catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 mt-6 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">No items found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              We couldn't find items matching your filters. Try clearing filters or ask Aura for suggestions!
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenAiAssistant}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Aura AI
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating AI Shopping Assistant Launcher FAB */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenAiAssistant}
          className="relative group p-4 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="font-bold text-sm pr-1 hidden sm:inline">Ask AI Assistant</span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
          </span>
        </button>
      </div>
    </div>
  );
}

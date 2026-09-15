import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Check, RefreshCw, Layers, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../api/client';

export default function HomePage({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
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
  }, [searchTerm, selectedCategory, inStockOnly, priceRange, sortBy]);

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
      if (inStockOnly) params.inStock = 'true';
      if (sortBy) params.sortBy = sortBy;

      if (priceRange === 'under50') {
        params.maxPrice = 50;
      } else if (priceRange === '50to150') {
        params.minPrice = 50;
        params.maxPrice = 150;
      } else if (priceRange === '150to500') {
        params.minPrice = 150;
        params.maxPrice = 500;
      } else if (priceRange === 'over500') {
        params.minPrice = 500;
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
    setInStockOnly(false);
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Enhanced Smart Commerce
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Discover What You Love, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Guided by Intelligence.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Browse premium gadgets, apparel, and home essentials. Need guidance or a custom recommendation? Our built-in AI assistant finds the exact match for your taste and budget.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAiAssistant}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/25 flex items-center gap-2 group hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Ask Aura AI Assistant
            </button>
            <a
              href="#catalog"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition backdrop-blur-sm"
            >
              Browse Catalogue
            </a>
          </div>

          {/* Value Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Stock Tracking</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Contextual AI Recommendations</span>
            </div>
            <div className="hidden sm:flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Free Shipping on Orders &gt; $50</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue & Filters Section */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Controls Toolbar */}
        <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Price Range Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Budget:
            </span>
            {[
              { label: 'Any Price', val: 'all' },
              { label: '< $50', val: 'under50' },
              { label: '$50 - $150', val: '50to150' },
              { label: '$150 - $500', val: '150to500' },
              { label: '> $500', val: 'over500' },
            ].map(p => (
              <button
                key={p.val}
                onClick={() => setPriceRange(p.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  priceRange === p.val
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold'
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
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
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
            Showing <strong className="text-slate-800">{products.length}</strong> products
            {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
            {selectedCategory !== 'all' && <span> in <strong>{selectedCategory}</strong></span>}
          </span>

          {(searchTerm || selectedCategory !== 'all' || inStockOnly || priceRange !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-500">Loading catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 mt-6 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">No products found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              We couldn't find items matching your criteria. Try adjusting your filters or ask Aura for alternative suggestions!
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
          {/* Pulsing indicator badge */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
          </span>
        </button>
      </div>
    </div>
  );
}

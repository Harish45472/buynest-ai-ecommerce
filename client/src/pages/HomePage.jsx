import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowUpDown, RefreshCw, Zap, ShieldCheck, Truck, ChevronRight, Filter, X, Star, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productService from '../api/productService';
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
  const [facets, setFacets] = useState({ brands: [], subCategories: [], priceRange: { min: 0, max: 100000 } });
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [minRating, setMinRating] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch dynamic facets whenever category changes
  useEffect(() => {
    fetchFacets();
  }, [selectedCategory]);

  // Fetch products whenever any filter or sort changes
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedSubCategory, selectedBrands, minRating, priceRange, selectedGender, inStockOnly, sortBy]);

  const fetchFacets = async () => {
    try {
      const data = await productService.getFacets(selectedCategory);
      setFacets(data);
    } catch (err) {
      console.warn('Failed to load filter facets:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.q = searchTerm;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedSubCategory && selectedSubCategory !== 'all') params.sub_category = selectedSubCategory;
      if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
      if (minRating !== 'all') params.minRating = minRating;
      if (selectedGender !== 'all') params.gender = selectedGender;
      if (inStockOnly) params.inStock = 'true';
      if (sortBy) params.sortBy = sortBy;

      // Price bounds
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

      const res = await productService.getProducts(params);
      setProducts(res.products);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    if (setSelectedSubCategory) setSelectedSubCategory('all');
    setSelectedBrands([]);
    setMinRating('all');
    setPriceRange('all');
    setSelectedGender('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered list of brands matching brand search box
  const visibleBrands = useMemo(() => {
    if (!facets.brands) return [];
    if (!brandSearch.trim()) return facets.brands.slice(0, 10);
    return facets.brands.filter(b => b.brand.toLowerCase().includes(brandSearch.toLowerCase().trim()));
  }, [facets.brands, brandSearch]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (minRating !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Smart Shopping
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">BUYNEST</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore 200+ authentic fashion, electronics, home, beauty, and fitness essentials. All priced in Indian Rupees (₹) with free delivery above ₹999.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Ask AI Shopper</span>
            </button>
            <button
              onClick={() => { setSelectedCategory('Electronics'); setSelectedSubCategory('all'); }}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition"
            >
              Explore Top Electronics →
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar + Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {selectedCategory !== 'all' ? selectedCategory : 'All Products'}
              {selectedSubCategory !== 'all' && <span className="text-emerald-600"> • {selectedSubCategory}</span>}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {products.length} items matching your criteria
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 shadow-2xs text-slate-700"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="popular">Popularity</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated (★)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }} />
              </span>
            )}
            {selectedSubCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold">
                Sub: {selectedSubCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubCategory('all')} />
              </span>
            )}
            {selectedBrands.map(b => (
              <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold">
                Brand: {b}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(b)} />
              </span>
            ))}
            {minRating !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                {minRating}★ & above
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating('all')} />
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold">
                Price Filter Active
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange('all')} />
              </span>
            )}
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold">
                Gender: {selectedGender}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGender('all')} />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-rose-600 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout Grid: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" /> Filter Store
                </span>
                {activeFiltersCount > 0 && (
                  <button onClick={resetAllFilters} className="text-[11px] font-bold text-rose-600 hover:underline">
                    Reset
                  </button>
                )}
              </div>

              {/* In-Stock Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500"
                />
              </div>

              {/* Price Range Filter */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Price Range
                </span>
                <div className="space-y-1.5 text-xs font-medium text-slate-700">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under ₹999', val: 'under999' },
                    { label: '₹1,000 - ₹2,499', val: '1000to2499' },
                    { label: '₹2,500 - ₹5,000', val: '2500to5000' },
                    { label: 'Above ₹5,000', val: 'over5000' }
                  ].map(p => (
                    <label key={p.val} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                      <input
                        type="radio"
                        name="priceFilter"
                        checked={priceRange === p.val}
                        onChange={() => setPriceRange(p.val)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Customer Rating
                </span>
                <div className="space-y-1.5 text-xs font-medium text-slate-700">
                  {[
                    { label: 'All Ratings', val: 'all' },
                    { label: '4★ & above', val: '4' },
                    { label: '3★ & above', val: '3' }
                  ].map(r => (
                    <label key={r.val} className="flex items-center gap-2 cursor-pointer hover:text-amber-600">
                      <input
                        type="radio"
                        name="ratingFilter"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="text-amber-500 focus:ring-amber-400"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {facets.brands && facets.brands.length > 0 && (
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-1.5">
                    Brand
                  </span>
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brands..."
                    className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg mb-2 focus:outline-none focus:border-emerald-500"
                  />
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                    {visibleBrands.map(b => (
                      <label key={b.brand} className="flex items-center justify-between cursor-pointer hover:text-indigo-600">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(b.brand)}
                            onChange={() => toggleBrand(b.brand)}
                            className="w-3.5 h-3.5 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500"
                          />
                          <span className="font-semibold">{b.brand}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">({b.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Gender Filter */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Gender
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Men', 'Women', 'Unisex', 'Kids'].map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                        selectedGender === g
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {g === 'all' ? 'All' : g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-xs font-bold text-slate-500">Loading BUYNEST catalog...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl font-bold">
                  🔍
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    We couldn't find anything matching your current filters or search terms. Try clearing some filters.
                  </p>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCard
                    key={product.product_id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-black text-slate-900">Filters</span>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Price Filter */}
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">Price</span>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: 'All Prices', val: 'all' },
                      { label: 'Under ₹999', val: 'under999' },
                      { label: '₹1,000 - ₹2,499', val: '1000to2499' },
                      { label: '₹2,500 - ₹5,000', val: '2500to5000' },
                      { label: 'Above ₹5,000', val: 'over5000' }
                    ].map(p => (
                      <label key={p.val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobilePrice"
                          checked={priceRange === p.val}
                          onChange={() => setPriceRange(p.val)}
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">Rating</span>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: 'All', val: 'all' },
                      { label: '4★ & above', val: '4' },
                      { label: '3★ & above', val: '3' }
                    ].map(r => (
                      <label key={r.val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileRating"
                          checked={minRating === r.val}
                          onChange={() => setMinRating(r.val)}
                        />
                        <span>{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-2">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Clock, TrendingUp, Sparkles, X, ArrowRight, Layers, Tag, Search } from 'lucide-react';

const RECENT_KEY = 'buynest_recent_searches';

export default function SearchSuggestions({
  searchTerm,
  onSelectSuggestion,
  onSelectProduct,
  isVisible,
  onClose,
  onPerformSearch
}) {
  const [data, setData] = useState({
    trendingQueries: [],
    popularCategories: [],
    popularBrands: [],
    products: [],
    subcategories: []
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load recent searches:', e);
    }
  }, [isVisible]);

  // Fetch suggestions from backend
  useEffect(() => {
    if (!isVisible) return;

    const term = (searchTerm || '').trim();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const url = `/api/products/search-suggestions?q=${encodeURIComponent(term)}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn('Failed to fetch search suggestions:', err);
      } finally {
        setLoading(false);
      }
    }, term.length >= 2 ? 180 : 0);

    return () => clearTimeout(timer);
  }, [searchTerm, isVisible]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose && onClose();
      }
    }
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  const removeRecent = (e, item) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== item);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch (err) {}
  };

  const clearAllRecent = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch (err) {}
  };

  const handleSelectQuery = (query) => {
    // Add to recent searches
    try {
      const updated = [query, ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())].slice(0, 8);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch (err) {}

    if (onPerformSearch) {
      onPerformSearch(query);
    } else if (onSelectSuggestion) {
      onSelectSuggestion(query);
    }
    onClose && onClose();
  };

  if (!isVisible) {
    return null;
  }

  const isQueryMode = searchTerm && searchTerm.trim().length >= 2;
  const hasMatchingProducts = data.products && data.products.length > 0;
  const hasMatchingSubs = data.subcategories && data.subcategories.length > 0;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 text-left max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
    >
      {/* Loading state indicator */}
      {loading && (
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Searching BUYNEST catalog...
          </span>
          <span className="text-[10px] text-slate-400 font-mono">620+ Products</span>
        </div>
      )}

      {/* --- MODE 1: SEARCH TERM ENTERED (Matching Results & Previews) --- */}
      {isQueryMode ? (
        <div className="py-2">
          {/* Direct Matching Subcategories */}
          {hasMatchingSubs && (
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Matching Categories & Departments
              </p>
              <div className="flex flex-wrap gap-2">
                {data.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSelectQuery(sub)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 group"
                  >
                    <Search className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                    <span>{sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Items matching */}
          {hasMatchingProducts ? (
            <div>
              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Live Product Previews
                </p>
                <span className="text-[11px] font-bold text-emerald-600">
                  {data.products.length} found
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {data.products.map((p) => (
                  <div
                    key={p.product_id}
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(p);
                      onClose && onClose();
                    }}
                    className="flex items-center gap-3.5 px-4 py-2.5 hover:bg-emerald-50/40 cursor-pointer transition group"
                  >
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-xl bg-slate-100 flex-shrink-0 border border-slate-200/60 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {p.brand}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          &bull; {p.sub_category}
                        </span>
                        {p.rating && (
                          <span className="inline-flex items-center text-[10px] font-bold text-amber-600 ml-auto">
                            ★ {p.rating}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 truncate group-hover:text-emerald-700 transition">
                        {p.name}
                      </h4>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <div className="text-xs font-black text-slate-900">
                        ₹{Number(p.price).toLocaleString('en-IN')}
                      </div>
                      {p.mrp && p.mrp > p.price && (
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{Number(p.mrp).toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View all results button */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => handleSelectQuery(searchTerm)}
                  className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>See all results for "{searchTerm}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : !loading && (
            <div className="p-6 text-center">
              <p className="text-sm font-bold text-slate-800 mb-1">No products found for "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mb-4">Try checking your spelling or search by brand (Nike, Levi's, boAt, Apple) or price range (e.g. "shoes under 3000").</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Shoes under 3000', 'Oversized T-Shirts', 'Levi\'s Jeans', 'Laptops'].map(q => (
                  <button
                    key={q}
                    onClick={() => handleSelectQuery(q)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1 rounded-full transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- MODE 2: DEFAULT / EMPTY INPUT (Recent, Trending, Categories & Brands) --- */
        <div className="p-4 space-y-4">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Recent Searches
                </p>
                <button
                  onClick={clearAllRecent}
                  className="text-[11px] text-slate-400 hover:text-rose-600 font-semibold transition"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSelectQuery(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition group"
                  >
                    <Clock className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                    <span>{item}</span>
                    <button
                      onClick={(e) => removeRecent(e, item)}
                      className="p-0.5 text-slate-400 hover:text-rose-500 rounded-full transition ml-1"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
              Trending Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {(data.trendingQueries && data.trendingQueries.length > 0
                ? data.trendingQueries
                : [
                    'Oversized T-Shirts',
                    'Running Shoes under 3000',
                    'Levi\'s Slim Jeans',
                    'Smartwatches',
                    'Wireless Earbuds',
                    'Casual Linen Shirts',
                    'Women Sarees under 5000'
                  ]
              ).map((query) => (
                <button
                  key={query}
                  onClick={() => handleSelectQuery(query)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200/70 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3 h-3 text-rose-400" />
                  <span>{query}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Popular Departments
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(data.popularCategories && data.popularCategories.length > 0
                ? data.popularCategories
                : ['Men', 'Women', 'Electronics', 'Sports & Fitness', 'Home & Kitchen', 'Beauty & Personal Care']
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelectQuery(cat)}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-100 transition group flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-600">
                    {cat}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Popular Brands */}
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              Popular Authentic Brands
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(data.popularBrands && data.popularBrands.length > 0
                ? data.popularBrands
                : ['Nike', "Levi's", 'Puma', 'Roadster', 'Zara', 'Apple', 'boAt', 'Biba', 'Philips']
              ).map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleSelectQuery(brand)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-lg transition"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

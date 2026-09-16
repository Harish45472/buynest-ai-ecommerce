import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowUpDown, RefreshCw, Zap, ShieldCheck, Truck, ChevronRight, Filter, X, Star, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import RecentlyViewed from '../components/RecentlyViewed';
import productService from '../api/productService';
import { MEGA_MENU_DATA } from '../components/Navbar';
import { useComparison } from '../context/ComparisonContext';

export const CATEGORY_SUBCATEGORIES = {
  'Men': ['T-shirts', 'Shirts', 'Jeans', 'Trousers', 'Hoodies', 'Jackets', 'Ethnic wear', 'Formal wear', 'Innerwear', 'Shoes', 'Sneakers', 'Sandals', 'Watches', 'Wallets', 'Belts', 'Sunglasses', 'Bags', 'Blazers', 'Suits', 'Shorts', 'Sweatshirts', 'Kurtas'],
  'Women': ['T-shirts', 'Shirts', 'Dresses', 'Tops', 'Kurtis', 'Sarees', 'Lehengas', 'Salwar suits', 'Jeans', 'Trousers', 'Ethnic wear', 'Western wear', 'Heels', 'Sneakers', 'Sandals', 'Handbags', 'Watches', 'Jewellery', 'Sunglasses', 'Skirts', 'Leggings', 'Jackets'],
  'Electronics': ['Smartphones', 'Laptops', 'Tablets', 'Smart TVs', 'Earbuds', 'Headphones', 'Smartwatches', 'Speakers', 'Cameras', 'Gaming accessories', 'Power banks', 'Chargers', 'Computer accessories', 'Monitors', 'Keyboards', 'Mice', 'Printers'],
  'Home & Kitchen': ['Furniture', 'Bedsheets', 'Curtains', 'Kitchen appliances', 'Cookware', 'Storage products', 'Home decor', 'Lighting', 'Beds', 'Sofas', 'Tables', 'Chairs', 'Mattresses', 'Cleaning products'],
  'Beauty & Personal Care': ['Skincare', 'Makeup', 'Perfumes', 'Hair care', 'Grooming products', 'Personal hygiene', 'Fragrances', 'Bath & Body', 'Hair Styling', 'Oral Care'],
  'Grocery': ['Snacks', 'Beverages', 'Rice', 'Atta', 'Pulses', 'Spices', 'Cooking Oil', 'Breakfast Foods', 'Chocolates', 'Dry Fruits'],
  'Sports & Fitness': ['Sports shoes', 'T-shirts', 'Track pants', 'Gym equipment', 'Fitness accessories', 'Cricket products', 'Football products', 'Badminton racquets', 'Yoga mats'],
  'Books': ['Fiction', 'Non-fiction', 'Programming', 'Engineering', 'Competitive Exams', 'Children\'s Books'],
  'Toys & Baby': ['Toys', 'Games', 'Educational Toys', 'Baby Care', 'Baby Clothing', 'Boys Clothing', 'Girls Clothing', 'Kids Shoes'],
  'Automotive': ['Car Accessories', 'Bike Accessories', 'Car Care', 'Helmets', 'Riding Gear']
};

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
  const { comparedProducts, setIsCompareModalOpen } = useComparison();
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState({ brands: [], subCategories: [], priceRange: { min: 0, max: 100000 } });
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
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
      if (priceRange === 'under999' || priceRange === 'budget') {
        params.minPrice = 199;
        params.maxPrice = 999;
      } else if (priceRange === '1000to2499' || priceRange === 'mid') {
        params.minPrice = 1000;
        params.maxPrice = 2999;
      } else if (priceRange === '2500to5000' || priceRange === 'premium') {
        params.minPrice = 3000;
        params.maxPrice = 9999;
      } else if (priceRange === 'over5000' || priceRange === 'luxury') {
        params.minPrice = 10000;
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

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    if (setSelectedSubCategory) setSelectedSubCategory('all');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinRating('all');
    setPriceRange('all');
    setSelectedGender('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Client-side multi-select filter for sizes and colors
  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedSizes.length > 0) {
        let pSizes = [];
        try {
          pSizes = typeof p.sizes === 'string' ? JSON.parse(p.sizes) : (p.sizes || []);
        } catch {
          pSizes = [];
        }
        if (!selectedSizes.some((s) => pSizes.includes(s))) return false;
      }

      if (selectedColors.length > 0) {
        let pColors = [];
        try {
          pColors = typeof p.colors === 'string' ? JSON.parse(p.colors) : (p.colors || []);
        } catch {
          pColors = [];
        }
        const pColorsLower = pColors.map((c) => String(c).toLowerCase());
        if (!selectedColors.some((c) => pColorsLower.some((pc) => pc.includes(c.toLowerCase())))) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedSizes, selectedColors]);

  // Filtered list of brands matching brand search box
  const visibleBrands = useMemo(() => {
    if (!facets.brands) return [];
    if (!brandSearch.trim()) return facets.brands.slice(0, 10);
    return facets.brands.filter(b => b.brand.toLowerCase().includes(brandSearch.toLowerCase().trim()));
  }, [facets.brands, brandSearch]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    selectedSizes.length +
    selectedColors.length +
    (minRating !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50">
      {/* Classic Editorial Luxury Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-black tracking-widest uppercase shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-current animate-pulse" />
            <span>FESTIVE & WEDDING COLLECTION 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Where Style Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-200">Intelligence</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Explore 680+ certified Indian fashion, electronics, home decor, and athletic gear. Enjoy smart AI recommendations, instant Razorpay UPI checkout, and hassle-free 1-click order cancellations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-current text-slate-950" />
              <span>Ask AI Shopping Assistant</span>
            </button>
            <button
              onClick={() => { setSelectedCategory('Women'); setSelectedSubCategory('all'); }}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/10 transition hover:scale-105"
            >
              Explore Festive Ethnic Wear →
            </button>
          </div>
        </div>

        {/* Circular Department Quick-Nav Avatars */}
        <div className="relative max-w-5xl mx-auto mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
            {[
              { name: 'Men', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&q=80', tag: 'Up to 60% Off' },
              { name: 'Women', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80', tag: 'Festive Ready' },
              { name: 'Electronics', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', tag: 'Latest Tech' },
              { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=80', tag: 'Modern Living' },
              { name: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80', tag: 'Glow Essentials' },
              { name: 'Grocery', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80', tag: 'Fresh Harvest' },
              { name: 'Sports & Fitness', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&q=80', tag: 'Active Life' },
              { name: 'Books', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80', tag: 'Top Reads' },
              { name: 'Toys & Baby', img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&q=80', tag: 'Play & STEM' },
              { name: 'Automotive', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&q=80', tag: 'Ride Gear' }
            ].map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    if (setSelectedSubCategory) setSelectedSubCategory('all');
                  }}
                  className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 transition-all duration-300 ${
                    isSelected 
                      ? 'ring-4 ring-emerald-400 scale-105' 
                      : 'ring-2 ring-white/20 group-hover:ring-emerald-400 group-hover:scale-105'
                  }`}>
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full rounded-full object-cover shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[11px] font-black tracking-wide text-center ${
                    isSelected ? 'text-emerald-400 font-extrabold' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {cat.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
                    {cat.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Pillar Luxury Trust Badges Strip */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-slate-800">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Express Delivery</p>
                <p className="text-[11px] text-slate-500">Free over ₹499 across India</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">100% Genuine Brands</p>
                <p className="text-[11px] text-slate-500">Authorized seller warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Instant Razorpay UPI</p>
                <p className="text-[11px] text-slate-500">Safe payments & fast refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 shadow-2xs">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Easy Cancellation</p>
                <p className="text-[11px] text-slate-500">1-click order cancellation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

        {/* Quick Department & Subcategory Carousel */}
        <div className="pt-4 pb-3 border-b border-slate-200 space-y-3">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none text-xs">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
              Styles:
            </span>
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3 py-1.5 rounded-full font-bold transition shrink-0 ${
                selectedSubCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All {selectedCategory !== 'all' ? selectedCategory : 'Catalog'}
            </button>
            {(CATEGORY_SUBCATEGORIES[selectedCategory] || facets.subCategories?.map(s => s.sub_category) || []).map((subName) => {
              const isActive = selectedSubCategory === subName;
              return (
                <button
                  key={subName}
                  onClick={() => setSelectedSubCategory(isActive ? 'all' : subName)}
                  className={`px-3 py-1.5 rounded-full font-bold transition shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{subName}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Price Tier Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
              Price Tiers:
            </span>
            {[
              { label: 'All Prices', val: 'all', badge: 'bg-slate-100 text-slate-700' },
              { label: '🟢 Budget (₹199–₹999)', val: 'budget', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { label: '🔵 Mid-Range (₹1K–₹3K)', val: 'mid', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: '🟣 Premium (₹3K–₹10K)', val: 'premium', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
              { label: '🟡 Luxury / Bridal (₹10K+)', val: 'luxury', badge: 'bg-amber-50 text-amber-800 border-amber-200' }
            ].map(tier => {
              const isActive = priceRange === tier.val;
              return (
                <button
                  key={tier.val}
                  onClick={() => setPriceRange(isActive && tier.val !== 'all' ? 'all' : tier.val)}
                  className={`px-3 py-1 rounded-full font-bold text-[11px] transition shrink-0 border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : `${tier.badge} hover:opacity-90`
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}

            {/* Quick Gender Filter */}
            <div className="hidden sm:flex items-center gap-1 ml-auto pl-3 border-l border-slate-200 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Gender:</span>
              {['all', 'Men', 'Women', 'Unisex'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase transition ${
                    selectedGender === g
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {g}
                </button>
              ))}
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
                    { label: '🟢 Budget Store (₹199 – ₹999)', val: 'budget' },
                    { label: '🔵 Mid-Range (₹1,000 – ₹2,999)', val: 'mid' },
                    { label: '🟣 Premium (₹3,000 – ₹9,999)', val: 'premium' },
                    { label: '🟡 Luxury / Bridal (₹10,000+)', val: 'luxury' }
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
              {/* Size Filter */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Size / Fit
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['S', 'M', 'L', 'XL', 'XXL', 'UK 7', 'UK 8', 'UK 9', 'UK 10', '128GB', '256GB'].map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border transition ${
                        selectedSizes.includes(s)
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-2">
                  Color
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'Black', bg: 'bg-black' },
                    { name: 'Blue', bg: 'bg-blue-600' },
                    { name: 'White', bg: 'bg-white border-slate-300' },
                    { name: 'Red', bg: 'bg-red-600' },
                    { name: 'Green', bg: 'bg-emerald-600' },
                    { name: 'Grey', bg: 'bg-slate-500' },
                    { name: 'Tan', bg: 'bg-amber-700' },
                    { name: 'Gold', bg: 'bg-amber-400' }
                  ].map(c => (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition ${
                        selectedColors.includes(c.name)
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.bg} border border-black/10 inline-block`} />
                      <span>{c.name}</span>
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
            ) : displayedProducts.length === 0 ? (
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
                {displayedProducts.map(product => (
                  <ProductCard
                    key={product.product_id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}

            {/* Recently Viewed Carousel */}
            <RecentlyViewed onSelectProduct={onSelectProduct} />
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
                      { label: '🟢 Budget Store (₹199 – ₹999)', val: 'budget' },
                      { label: '🔵 Mid-Range (₹1,000 – ₹2,999)', val: 'mid' },
                      { label: '🟣 Premium (₹3,000 – ₹9,999)', val: 'premium' },
                      { label: '🟡 Luxury / Bridal (₹10,000+)', val: 'luxury' }
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

      {/* Floating Comparison Drawer Launcher */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-slate-900/40 transition-all hover:scale-105 active:scale-95 group"
          >
            <span className="text-base group-hover:rotate-12 transition-transform">⚖️</span>
            <span>Compare ({comparedProducts.length}) Products</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1"></span>
          </button>
        </div>
      )}
    </div>
  );
}

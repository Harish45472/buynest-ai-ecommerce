import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function RecentlyViewed({ onSelectProduct }) {
  const [recentProducts, setRecentProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('buynest_recently_viewed');
      if (stored) {
        setRecentProducts(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load recently viewed products:', e);
    }
  }, []);

  if (!recentProducts || recentProducts.length === 0) {
    return null;
  }

  const handleClear = () => {
    localStorage.removeItem('buynest_recently_viewed');
    setRecentProducts([]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 my-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg text-base">👁️</span>
          <h3 className="text-base font-bold text-slate-800">Recently Viewed Items</h3>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-slate-400 hover:text-rose-500 font-medium transition"
        >
          Clear History
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
        {recentProducts.slice(0, 8).map((product) => (
          <div
            key={product.product_id}
            className="flex-shrink-0 w-44 bg-slate-50 hover:bg-white p-3 rounded-xl border border-slate-200/70 hover:border-emerald-300 hover:shadow-md transition group cursor-pointer"
            onClick={() => onSelectProduct && onSelectProduct(product)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-slate-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {product.discount_percent > 0 && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-emerald-600 text-white font-extrabold rounded text-[10px] shadow-sm">
                  {product.discount_percent}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider truncate">
              {product.brand}
            </p>
            <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition" title={product.name}>
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-sm font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <span className="text-[10px] text-slate-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="mt-2.5 w-full py-1 px-2 bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-900 text-[11px] font-bold rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

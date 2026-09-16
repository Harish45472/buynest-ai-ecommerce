import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductComparisonModal() {
  const {
    comparedProducts,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen
  } = useComparison();
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-lg">⚖️</span>
            <div>
              <h2 className="text-lg font-bold">Compare Products</h2>
              <p className="text-xs text-slate-300">
                Comparing {comparedProducts.length} of 4 items side-by-side
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-slate-300 hover:text-rose-400 transition"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto flex-1">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚖️
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">No products to compare</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Click the "Compare" checkbox on product cards to view side-by-side specs, prices, and ratings.
              </p>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow transition"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="min-w-[640px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-44 p-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-l-xl">
                      Feature
                    </th>
                    {comparedProducts.map((p) => (
                      <th key={p.product_id} className="p-3 text-left w-64 bg-slate-50 last:rounded-r-xl">
                        <div className="relative group">
                          <button
                            onClick={() => removeFromCompare(p.product_id)}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-rose-50 text-rose-500 rounded-full text-xs font-bold hover:bg-rose-500 hover:text-white transition flex items-center justify-center shadow-sm"
                            title="Remove from comparison"
                          >
                            ×
                          </button>
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-28 h-28 object-cover rounded-xl shadow-sm mb-2 mx-auto bg-slate-100"
                          />
                          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{p.brand}</p>
                          <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 mt-0.5" title={p.name}>
                            {p.name}
                          </h4>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {/* Price */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Price & Discount</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                          {p.mrp > p.price && (
                            <span className="text-slate-400 line-through text-[11px]">₹{p.mrp.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        {p.discount_percent > 0 && (
                          <span className="inline-block mt-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md text-[10px]">
                            {p.discount_percent}% OFF
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Rating & Reviews</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3">
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded font-bold text-[11px]">
                            {p.rating} ★
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            ({(p.reviews_count || 0).toLocaleString('en-IN')} reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Category & Subcategory */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Category</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3 text-slate-700 font-medium">
                        {p.category} &rsaquo; {p.sub_category}
                      </td>
                    ))}
                  </tr>

                  {/* Stock Status */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Availability</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3">
                        {p.stock > 0 ? (
                          <span className={`font-semibold ${p.stock <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {p.stock <= 5 ? `Only ${p.stock} left!` : 'In Stock'}
                          </span>
                        ) : (
                          <span className="text-rose-600 font-semibold">Out of Stock</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* GST & Tax */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">GST Rate</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3 text-slate-600">
                        {p.gst_percent || 18}% (included in price)
                      </td>
                    ))}
                  </tr>

                  {/* Delivery Info */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Delivery & Returns</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3 text-slate-600">
                        <p className="text-[11px] font-medium text-emerald-800">{p.delivery_info || 'Fast delivery across India'}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{p.return_info || '10-day return policy'}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Action</td>
                    {comparedProducts.map((p) => (
                      <td key={p.product_id} className="p-3">
                        <button
                          onClick={() => {
                            addToCart(p);
                          }}
                          disabled={p.stock <= 0}
                          className={`w-full py-2 px-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 ${
                            p.stock > 0
                              ? 'bg-slate-900 hover:bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <span>🛒</span> Add to Cart
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

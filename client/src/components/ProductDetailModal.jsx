import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Check, AlertTriangle, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/client';

export default function ProductDetailModal({ product, onClose, onSelectProduct }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    setQuantity(1);
    if (product) {
      fetchRelated(product.product_id);
    }
  }, [product]);

  const fetchRelated = async (productId) => {
    try {
      setLoadingRelated(true);
      const res = await api.get(`/ai/recommend-similar/${productId}`);
      setRelatedProducts(res.data.products || []);
    } catch (err) {
      console.error('Failed to fetch similar recommendations:', err);
    } finally {
      setLoadingRelated(false);
    }
  };

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product.product_id, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-800 rounded-full shadow-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right Column: Details & Purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-slate-800">{product.rating || 4.5}</span>
                <span className="text-xs text-slate-400">({product.reviews_count || 0} customer reviews)</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                  Free shipping on orders &gt; ₹999
                </span>
              </div>

              {/* Description */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Inventory Status */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600">Stock Availability</span>
                  {isOutOfStock ? (
                    <span className="text-rose-600 flex items-center gap-1 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> Out of stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-amber-600 font-bold">
                      Low Stock - Only {product.stock} left in inventory!
                    </span>
                  ) : (
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> In stock ({product.stock} units)
                    </span>
                  )}
                </div>

                {/* Progress bar meter */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOutOfStock
                        ? 'bg-rose-500 w-0'
                        : isLowStock
                        ? 'bg-amber-500 w-1/4'
                        : 'bg-emerald-500 w-full'
                    }`}
                  />
                </div>
              </div>

              {/* Value Props */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                  Fast Delivery
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                  Authentic Guarantee
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                  30-Day Returns
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isOutOfStock ? 'Sold Out' : `Add ${quantity} to Cart • ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Similar Recommendations Section */}
        {relatedProducts.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                AI Suggested Complementary Items
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map(rel => (
                <div
                  key={rel.product_id}
                  onClick={() => onSelectProduct(rel)}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-emerald-500 hover:shadow-sm transition"
                >
                  <img
                    src={rel.image_url}
                    alt={rel.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{rel.name}</p>
                    <p className="text-xs font-black text-emerald-600 mt-0.5">₹{Number(rel.price).toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(rel.product_id, 1);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition"
                    title="Add to cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

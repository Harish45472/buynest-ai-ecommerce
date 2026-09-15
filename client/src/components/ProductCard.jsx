import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product.product_id, 1);
    }
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-900 rounded-full shadow-sm">
            {product.category}
          </span>
          {product.sub_category && product.sub_category !== 'General' && (
            <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/80 text-white rounded-full shadow-xs w-fit">
              {product.sub_category}
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-600/90 backdrop-blur-md text-white rounded-full shadow-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500/90 backdrop-blur-md text-white rounded-full shadow-sm animate-pulse">
              Only {product.stock} left!
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-600/85 backdrop-blur-md text-white rounded-full shadow-sm">
              In Stock
            </span>
          )}
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-full text-xs font-semibold shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating || 4.5}</span>
            <span className="text-xs text-slate-400">({product.reviews_count || 0})</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Price</span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { getCategoryFallback, handleImageError } from '../utils/imageFallback';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  const wishlisted = isWishlisted(product.product_id);
  const compared = isInCompare(product.product_id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleCardClick = () => {
    try {
      const stored = localStorage.getItem('buynest_recently_viewed');
      let list = stored ? JSON.parse(stored) : [];
      list = [product, ...list.filter((p) => p.product_id !== product.product_id)].slice(0, 10);
      localStorage.setItem('buynest_recently_viewed', JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save recently viewed:', e);
    }
    if (onSelectProduct) onSelectProduct(product);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product.product_id, 1);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleToggleCompare = (e) => {
    e.stopPropagation();
    if (compared) {
      removeFromCompare(product.product_id);
    } else {
      addToCompare(product);
    }
  };

  const primaryImage = (Array.isArray(product.images) && product.images.length > 0)
    ? (product.images.find(i => typeof i === 'object' && i?.type === 'primary')?.url 
       || (typeof product.images[0] === 'object' ? product.images[0].url : product.images[0]))
    : (product.image_url || getCategoryFallback(product.category, product.sub_category));

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="product-image relative aspect-square w-full bg-white overflow-hidden flex items-center justify-center border-b border-slate-100">
        <img
          src={primaryImage}
          alt={product.name}
          onError={(e) => handleImageError(e, product.category, product.sub_category)}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category & Discount Pills */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-900 rounded-full shadow-xs border border-slate-200/50">
            {product.category}
          </span>
          {product.discount_percent > 0 && (
            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-xs w-fit">
              {product.discount_percent}% OFF
            </span>
          )}
          {product.sub_category && product.sub_category !== 'General' && (
            <span className="px-1.5 py-0.5 text-[8px] font-bold bg-slate-900/85 text-white rounded-md shadow-xs w-fit">
              {product.sub_category}
            </span>
          )}
        </div>

        {/* Action Buttons: Wishlist & Compare */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-sm ${
              wishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleToggleCompare}
            className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm ${
              compared
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white hover:text-emerald-700'
            }`}
            title={compared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <span>⚖️</span>
            <span>{compared ? 'Added' : 'Compare'}</span>
          </button>
        </div>

        {/* Stock Badge */}
        {isOutOfStock ? (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600/90 text-white rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        ) : isLowStock ? (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/90 text-white rounded-full shadow-sm">
              Only {product.stock} left!
            </span>
          </div>
        ) : null}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-full text-xs font-bold shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 truncate">
              {product.brand || 'BUYNEST Select'}
            </span>

            {/* Rating pill */}
            <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-[10px] font-bold text-slate-700">{product.rating || 4.3}</span>
              <span className="text-[9px] text-slate-400">({product.reviews_count || 120})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Consolidated Color Variants */}
          {Array.isArray(product.colors) && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[9px] font-bold text-slate-400">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((col, idx) => {
                  const lower = col.toLowerCase();
                  const bg = lower.includes('black') ? '#0f172a'
                    : lower.includes('white') ? '#ffffff'
                    : lower.includes('navy') ? '#1e3a8a'
                    : lower.includes('blue') ? '#2563eb'
                    : lower.includes('red') || lower.includes('crimson') || lower.includes('maroon') ? '#dc2626'
                    : lower.includes('green') || lower.includes('olive') ? '#15803d'
                    : lower.includes('pink') ? '#ec4899'
                    : lower.includes('yellow') ? '#ca8a04'
                    : lower.includes('grey') || lower.includes('gray') ? '#64748b'
                    : lower.includes('gold') ? '#eab308'
                    : lower.includes('silver') ? '#cbd5e1'
                    : '#94a3b8';

                  return (
                    <span
                      key={idx}
                      title={col}
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs inline-block"
                      style={{ backgroundColor: bg }}
                    />
                  );
                })}
                {product.colors.length > 4 && (
                  <span className="text-[9px] font-extrabold text-slate-500">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price & Cart Action */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-black text-slate-900">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[10px] text-slate-400 line-through">
                  ₹{Number(product.mrp).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discount_percent > 0 && (
              <span className="text-[9px] font-black text-emerald-600 block -mt-0.5">
                {product.discount_percent}% OFF
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

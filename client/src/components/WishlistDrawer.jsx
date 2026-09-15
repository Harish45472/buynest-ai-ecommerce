import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer({ isOpen, onClose, onSelectProduct }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product.product_id, 1);
    removeFromWishlist(product.product_id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">My Wishlist</h2>
                <p className="text-xs text-slate-500">{wishlist.length} {wishlist.length === 1 ? 'saved item' : 'saved items'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center border border-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center border border-rose-100">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore our collection and click the heart icon on any product to save it here for later.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              wishlist.map(product => {
                const isOutOfStock = product.stock <= 0;
                return (
                  <div
                    key={product.product_id}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white shadow-xs hover:shadow-md transition flex gap-3.5 items-center group"
                  >
                    {/* Thumbnail */}
                    <div 
                      onClick={() => { onSelectProduct(product); onClose(); }}
                      className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block truncate">
                        {product.brand || 'BUYNEST Select'}
                      </span>
                      <h4 
                        onClick={() => { onSelectProduct(product); onClose(); }}
                        className="font-bold text-xs text-slate-900 truncate hover:text-indigo-600 cursor-pointer"
                      >
                        {product.name}
                      </h4>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-sm font-black text-slate-900">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{Number(product.mrp).toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.discount_percent > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600">
                            {product.discount_percent}% OFF
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          disabled={isOutOfStock}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                            isOutOfStock
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          }`}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(product.product_id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

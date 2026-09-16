import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, AlertTriangle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer({ onProceedToCheckout, onOpenAuth }) {
  const { items, subtotal, totalItems, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    closeCart();
    if (!user) {
      onOpenAuth();
    } else {
      onProceedToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-black text-slate-900">Your Shopping Bag</h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-6 py-3 bg-emerald-50/70 border-b border-emerald-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 mb-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              {subtotal >= freeShippingThreshold ? (
                <span>🎉 You unlocked <strong>FREE Standard Delivery!</strong></span>
              ) : (
                <span>Add <strong>₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery!</strong></span>
              )}
            </div>
            <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-bold text-slate-700 text-base">Your cart is currently empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Discover our trending products or ask the AI assistant for personalized recommendations!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cart_id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 uppercase font-semibold mt-0.5">
                        {item.category}
                      </p>
                      {(item.selected_color || item.selected_size) && (
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                          {item.selected_color && item.selected_color !== 'Default' && (
                            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              Color: {item.selected_color}
                            </span>
                          )}
                          {item.selected_size && item.selected_size !== 'Standard' && (
                            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              Size: {item.selected_size}
                            </span>
                          )}
                          {item.sku && (
                            <span className="text-slate-400 font-mono text-[9px] self-center">
                              {item.sku}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-xs font-black text-slate-900 mt-1">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Stock Alert or Limit Warning */}
                    {item.quantity >= item.available_stock && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        Max available stock reached ({item.available_stock})
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                          disabled={item.quantity >= item.available_stock}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold transition"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-700 ml-auto">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-bold text-slate-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

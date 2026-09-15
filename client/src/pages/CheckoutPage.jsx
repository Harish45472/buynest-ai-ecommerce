import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowLeft, AlertCircle, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function CheckoutPage({ onBackToShopping, onOrderComplete }) {
  const { items, subtotal, clearCart, showToast } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    shipping_name: user?.name || '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal: '',
    payment_method: 'Credit Card (Demo)'
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '•••'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  const shippingFee = subtotal >= 50 || items.length === 0 ? 0 : 9.99;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (!formData.shipping_name || !formData.shipping_address || !formData.shipping_city || !formData.shipping_postal) {
      setError('Please fill in all required shipping fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/orders', formData);
      const created = res.data.order;
      setCompletedOrder(created);
      clearCart();
      showToast('Order placed successfully!', 'success');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.error || 'Failed to process checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Order Completed Confirmation View
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Thank You for Your Order!</h2>
        <p className="text-sm text-slate-500 mt-2">
          Order <strong>#{completedOrder.order_id}</strong> has been placed and is currently being processed.
        </p>

        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-left shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
            <div>
              <span className="text-xs font-semibold text-slate-400">Order Number</span>
              <p className="text-sm font-bold text-slate-900">#{completedOrder.order_id}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Status</span>
              <p className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase">
                {completedOrder.status}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Total Paid</span>
              <p className="text-sm font-black text-slate-900">${Number(completedOrder.total_amount).toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Items in Order</h4>
            {completedOrder.items?.map((item) => (
              <div key={item.item_id} className="flex items-center justify-between text-xs py-2 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1">
            <p><strong>Shipping to:</strong> {completedOrder.shipping_name}, {completedOrder.shipping_address}, {completedOrder.shipping_city} {completedOrder.shipping_postal}</p>
            <p><strong>Payment Method:</strong> {completedOrder.payment_method}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onOrderComplete(completedOrder.order_id)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            Track Order & History
          </button>
          <button
            onClick={onBackToShopping}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBackToShopping}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shopping
      </button>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">
        Checkout & Order Placement
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-sm font-medium text-rose-700">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-lg font-bold text-slate-900">Shipping Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  name="shipping_name"
                  value={formData.shipping_name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Street Address</label>
                <input
                  type="text"
                  required
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  placeholder="e.g. 742 Evergreen Terrace"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
                <input
                  type="text"
                  required
                  name="shipping_city"
                  value={formData.shipping_city}
                  onChange={handleChange}
                  placeholder="e.g. Springfield"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Postal Code</label>
                <input
                  type="text"
                  required
                  name="shipping_postal"
                  value={formData.shipping_postal}
                  onChange={handleChange}
                  placeholder="e.g. 97477"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-lg font-bold text-slate-900">Payment Simulation</h2>
            </div>

            <div className="space-y-3">
              {[
                { id: 'Credit Card (Demo)', title: 'Credit / Debit Card', icon: CreditCard },
                { id: 'UPI / PayPal', title: 'UPI / Instant Digital Wallet', icon: ShieldCheck },
                { id: 'Cash on Delivery', title: 'Cash on Delivery (COD)', icon: Truck }
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      formData.payment_method === opt.id
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value={opt.id}
                        checked={formData.payment_method === opt.id}
                        onChange={handleChange}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{opt.title}</span>
                    </div>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </label>
                );
              })}
            </div>

            {formData.payment_method === 'Credit Card (Demo)' && (
              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Demo Card Details (Pre-filled)</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      disabled
                      value={cardInfo.cardNumber}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      disabled
                      value={`Exp: ${cardInfo.expiry}`}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      disabled
                      value={`CVV: ${cardInfo.cvv}`}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Placement */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs sticky top-24 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>

            {/* Items review */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {items.map(item => (
                <div key={item.cart_id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Costs calculation */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-800">
                  {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Validating stock & placing order...</span>
              ) : (
                <span>Confirm & Place Order (${grandTotal.toFixed(2)})</span>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              🔒 256-bit SSL encrypted checkout. Inventory is reserved atomically upon order confirmation.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

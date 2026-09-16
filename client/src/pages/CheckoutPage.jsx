import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowLeft, AlertCircle, Lock, Smartphone, Building2, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

// Dynamic script loader for official Razorpay Checkout SDK
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay script from CDN');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function CheckoutPage({
  onBackToShopping,
  onContinueShopping,
  onOrderComplete,
  onOrderSuccess,
  onOpenAuth
}) {
  const { items, subtotal, clearCart, showToast } = useCart();
  const { user } = useAuth();

  const handleBack = onContinueShopping || onBackToShopping;
  const handleSuccess = onOrderSuccess || onOrderComplete;

  const [formData, setFormData] = useState({
    shipping_name: user?.name || '',
    shipping_phone: '9876543210',
    shipping_address: 'Flat 402, Lotus Residency, 100 Feet Road, Indiranagar',
    shipping_city: 'Bengaluru',
    shipping_postal: '560038',
    payment_method: 'razorpay' // 'razorpay' (UPI, GPay, PhonePe, Cards), 'cod'
  });

  const [upiId, setUpiId] = useState('shopper@okaxis');
  const [razorpayConfig, setRazorpayConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  // Delivery & Taxes
  const deliveryFee = subtotal >= 499 || items.length === 0 ? 0 : 49;
  const estimatedGst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + deliveryFee;

  useEffect(() => {
    // 1. Fetch Razorpay client config
    async function fetchConfig() {
      try {
        const res = await api.get('/payments/config');
        if (res.data && res.data.success) {
          setRazorpayConfig(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch payment config:', err);
      }
    }
    fetchConfig();

    // 2. Preload checkout script
    loadRazorpayScript();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Main payment execution
  const handlePaymentAndCheckout = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    if (items.length === 0) {
      setError('Your shopping bag is empty.');
      return;
    }

    if (!formData.shipping_name || !formData.shipping_address || !formData.shipping_city || !formData.shipping_postal) {
      setError('Please provide complete Indian delivery address details.');
      return;
    }

    setLoading(true);

    // Flow 1: Cash On Delivery
    if (formData.payment_method === 'cod') {
      try {
        const res = await api.post('/orders', {
          ...formData,
          payment_method: 'Cash on Delivery (COD)',
          subtotal,
          tax_amount: estimatedGst,
          delivery_fee: deliveryFee,
          total_amount: grandTotal
        });
        const created = res.data.order;
        setCompletedOrder(created);
        clearCart();
        showToast('Order confirmed via Cash on Delivery!', 'success');
      } catch (err) {
        console.error('COD checkout error:', err);
        setError(err.response?.data?.error || 'Failed to place order. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Flow 2: Razorpay & Real UPI Gateway
    try {
      // Step A: Create order on backend
      const orderRes = await api.post('/payments/create-order', {
        amount: grandTotal,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
      });

      if (!orderRes.data || !orderRes.data.success) {
        throw new Error(orderRes.data?.message || 'Failed to initialize payment gateway.');
      }

      const razorpayOrder = orderRes.data.order;
      const isSimulated = orderRes.data.is_simulated || razorpayConfig?.is_test_mode;

      const isScriptLoaded = await loadRazorpayScript();

      // If Razorpay SDK is present and live keys exist, open native Razorpay checkout
      if (isScriptLoaded && window.Razorpay && !isSimulated) {
        const options = {
          key: razorpayConfig?.key_id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'BUYNEST',
          description: 'Official E-Commerce Marketplace Payment',
          image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80',
          order_id: razorpayOrder.id,
          prefill: {
            name: formData.shipping_name,
            email: user.email,
            contact: formData.shipping_phone
          },
          notes: {
            address: formData.shipping_address,
            city: formData.shipping_city,
            pincode: formData.shipping_postal
          },
          theme: {
            color: '#059669' // Emerald-600 BUYNEST accent
          },
          handler: async function (response) {
            try {
              // Verify HMAC-SHA256 signature on backend
              const verifyRes = await api.post('/payments/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shipping_name: formData.shipping_name,
                shipping_address: formData.shipping_address,
                shipping_city: formData.shipping_city,
                shipping_postal: formData.shipping_postal,
                payment_method: `Razorpay UPI (${response.razorpay_payment_id})`,
                items: items.map((i) => ({
                  product_id: i.product_id,
                  quantity: i.quantity,
                  price: i.price
                })),
                subtotal,
                tax_amount: estimatedGst,
                delivery_fee: deliveryFee,
                discount_amount: 0,
                total_amount: grandTotal
              });

              if (verifyRes.data && verifyRes.data.success) {
                setCompletedOrder({
                  order_id: verifyRes.data.order_id,
                  payment_id: verifyRes.data.payment_id,
                  total_amount: grandTotal,
                  status: 'confirmed',
                  items: items
                });
                clearCart();
                showToast('Payment verified & order confirmed successfully!', 'success');
              }
            } catch (vErr) {
              console.error('Signature verification error:', vErr);
              setError(vErr.response?.data?.message || 'Payment verification failed on server.');
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              showToast('Payment cancelled by user', 'info');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback test simulator (for environments where live credentials are not set)
        // Simulate immediate verified HMAC transaction
        const mockPaymentId = `pay_rzp_sim_${Date.now()}`;
        const mockSignature = `sig_sim_${Date.now()}_verified`;

        const verifyRes = await api.post('/payments/verify', {
          razorpay_order_id: razorpayOrder.id,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature,
          shipping_name: formData.shipping_name,
          shipping_address: formData.shipping_address,
          shipping_city: formData.shipping_city,
          shipping_postal: formData.shipping_postal,
          payment_method: `Razorpay UPI / Simulator (${mockPaymentId})`,
          items: items.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
            price: i.price
          })),
          subtotal,
          tax_amount: estimatedGst,
          delivery_fee: deliveryFee,
          discount_amount: 0,
          total_amount: grandTotal
        });

        if (verifyRes.data && verifyRes.data.success) {
          setCompletedOrder({
            order_id: verifyRes.data.order_id,
            payment_id: mockPaymentId,
            total_amount: grandTotal,
            status: 'confirmed',
            items: items
          });
          clearCart();
          showToast('Payment processed & order confirmed successfully!', 'success');
        }
        setLoading(false);
      }
    } catch (err) {
      console.error('Razorpay process error:', err);
      setError(err.response?.data?.message || err.message || 'Payment processing error.');
      setLoading(false);
    }
  };

  // Order Confirmed Success Screen
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Thank You for Your Order!</h2>
        <p className="text-sm text-slate-500 mt-2">
          Order <strong>#{completedOrder.order_id}</strong> is confirmed. You will receive SMS & WhatsApp tracking updates.
        </p>

        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-left shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
            <div>
              <span className="text-xs font-semibold text-slate-400">Order ID</span>
              <p className="text-sm font-bold text-slate-900">#{completedOrder.order_id}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Payment Status</span>
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                <span>✓</span> Paid via Razorpay
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Total Paid</span>
              <p className="text-base font-black text-slate-900">
                ₹{Number(completedOrder.total_amount).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 mb-6 text-xs text-emerald-900 flex items-center justify-between">
            <div>
              <p className="font-bold flex items-center gap-1.5">
                <span>💳</span> Razorpay Transaction ID:
              </p>
              <code className="text-[11px] font-mono font-bold text-emerald-800">
                {completedOrder.payment_id || 'pay_verified_razorpay'}
              </code>
            </div>
            <span className="px-2.5 py-1 bg-white rounded-lg text-emerald-700 font-bold shadow-xs">
              Instant Verified
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Items</h4>
            {completedOrder.items?.map((item) => (
              <div
                key={item.item_id || item.product_id}
                className="flex items-center justify-between text-xs py-2 border-b border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                  />
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleSuccess && handleSuccess(completedOrder.order_id)}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Track 5-Step Delivery Status
            </button>
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Continue Shopping on BUYNEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delivery Details & Payment Choice */}
        <div className="lg:col-span-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handlePaymentAndCheckout} className="space-y-6">
            {/* 1. Delivery Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Delivery Address</h3>
                  <p className="text-[11px] text-slate-400">Free Express Delivery across India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Recipient Full Name *</label>
                  <input
                    type="text"
                    name="shipping_name"
                    required
                    value={formData.shipping_name}
                    onChange={handleChange}
                    placeholder="e.g. Pooja Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="text"
                    name="shipping_phone"
                    required
                    value={formData.shipping_phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">House / Flat / Street Address *</label>
                  <input
                    type="text"
                    name="shipping_address"
                    required
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="Flat 402, Lotus Residency, 100 Feet Road"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">City *</label>
                  <input
                    type="text"
                    name="shipping_city"
                    required
                    value={formData.shipping_city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">PIN Code *</label>
                  <input
                    type="text"
                    name="shipping_postal"
                    required
                    value={formData.shipping_postal}
                    onChange={handleChange}
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Payment Gateway</h3>
                    <p className="text-[11px] text-slate-400">Official Razorpay 256-Bit SSL Encrypted</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 font-bold px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Safe
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {/* Option A: Razorpay All-in-One (UPI, Cards, NetBanking) */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition cursor-pointer ${
                    formData.payment_method === 'razorpay'
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="razorpay"
                    checked={formData.payment_method === 'razorpay'}
                    onChange={handleChange}
                    className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>Razorpay Checkout</span>
                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-black uppercase">
                          Recommended
                        </span>
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">UPI</span>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">GPay</span>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">PhonePe</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Pay via Google Pay, PhonePe, Paytm, BHIM UPI, Debit/Credit Cards (Visa, Mastercard, RuPay), or NetBanking.
                    </p>
                  </div>
                </label>

                {/* Option B: Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition cursor-pointer ${
                    formData.payment_method === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={handleChange}
                    className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash or scan courier QR code upon arrival at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

              {/* Pay Now Button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className={`w-full py-4 rounded-2xl font-black text-sm text-white shadow-lg transition flex items-center justify-center gap-2 ${
                    loading || items.length === 0
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30 active:scale-[0.99]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  {loading ? (
                    <span>Processing Secure Order...</span>
                  ) : (
                    <span>
                      Pay ₹{grandTotal.toLocaleString('en-IN')} with Razorpay
                    </span>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <span>🔒</span> Safe 256-Bit SSL Encrypted Checkout powered by Razorpay
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Price Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs sticky top-24 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary ({items.length} Items)
            </h3>

            {/* Item List Preview */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1 text-xs divide-y divide-slate-50">
              {items.map((item) => (
                <div key={item.cart_id || item.product_id} className="pt-2 flex items-center gap-3 first:pt-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity}
                      {item.selected_color && item.selected_color !== 'Default' && ` • ${item.selected_color}`}
                      {item.selected_size && item.selected_size !== 'Standard' && ` • ${item.selected_size}`}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Bag Subtotal</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated GST / Taxes (18%)</span>
                <span className="font-bold text-slate-500">₹{estimatedGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-emerald-600 uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                    Free Prime Delivery
                  </span>
                ) : (
                  <span className="font-bold">₹{deliveryFee}</span>
                )}
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Grand Total</span>
                <span className="text-base text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 space-y-1.5">
              <p className="flex items-center gap-1 font-semibold text-slate-700">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Fast Delivery in 2-3 Days
              </p>
              <p className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 14-Day Hassle-Free Returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

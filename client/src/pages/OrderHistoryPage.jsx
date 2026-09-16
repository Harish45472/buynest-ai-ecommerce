import React, { useState, useEffect } from 'react';
import { 
  Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowLeft, 
  ChevronRight, ShoppingBag, RotateCcw, ShieldCheck, MapPin, 
  Printer, Check, Copy, FileText, ChevronDown, ChevronUp,
  XCircle, AlertTriangle, X, Ban
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function OrderHistoryPage({ onBackToShopping, onSelectProduct, highlightOrderId }) {
  const { user } = useAuth();
  const { addToCart, showToast } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});

  // Cancellation Modal states
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Found a better price elsewhere');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleDetails = (orderId) => {
    setExpandedDetails(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleConfirmCancel = async (orderId) => {
    try {
      setCancelling(true);
      const res = await api.post(`/orders/${orderId}/cancel`, { reason: cancelReason });
      
      // Update orders in local state immediately
      setOrders(prev => prev.map(o => o.order_id === orderId ? {
        ...o,
        status: 'cancelled',
        payment_status: o.payment_status === 'paid' ? 'refund_initiated' : o.payment_status,
        refund_info: res.data.refund_info
      } : o));

      setCancelModalOrder(null);
      if (showToast) {
        showToast(res.data.message || `Order #${orderId} cancelled successfully.`, 'info');
      }
    } catch (err) {
      console.error('Order cancellation error:', err);
      const errMsg = err.response?.data?.error || 'Failed to cancel order. Please try again.';
      if (showToast) {
        showToast(errMsg, 'error');
      } else {
        alert(errMsg);
      }
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-cyan-100 text-cyan-800 rounded-full border border-cyan-200 animate-pulse">
            <MapPin className="w-3.5 h-3.5 text-cyan-600" /> Out for Delivery
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
            <Truck className="w-3.5 h-3.5 text-indigo-600" /> Shipped
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Processing
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Order Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-rose-100 text-rose-800 rounded-full border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" /> Pending
          </span>
        );
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'pending':
      case 'confirmed': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return -1;
    }
  };

  const getEstimatedDeliveryDate = (createdAt) => {
    const d = new Date(createdAt);
    d.setDate(d.getDate() + 4);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : filterStatus === 'confirmed'
    ? orders.filter(o => o.status === 'confirmed' || o.status === 'pending')
    : orders.filter(o => o.status === filterStatus);

  const trackerSteps = [
    { label: 'Order Confirmed', shortLabel: 'Confirmed', step: 0 },
    { label: 'Processing at Hub', shortLabel: 'Processing', step: 1 },
    { label: 'Shipped with Courier', shortLabel: 'Shipped', step: 2 },
    { label: 'Out for Delivery', shortLabel: 'Out for Delivery', step: 3 },
    { label: 'Delivered', shortLabel: 'Delivered', step: 4 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBackToShopping}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shopping
      </button>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              My Orders & Live Tracking
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time 5-stage shipment tracking, 1-click order cancellation, and Razorpay GST invoices.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'confirmed', label: 'Confirmed' },
            { key: 'processing', label: 'Processing' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'out_for_delivery', label: 'Out for Delivery' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500">Loading your orders & shipments...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching orders</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            {filterStatus === 'all'
              ? "You haven't placed any orders on BUYNEST yet."
              : `No orders currently in "${filterStatus}" status.`}
          </p>
          <button
            onClick={onBackToShopping}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            Explore 680+ Products
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredOrders.map((order) => {
            const stepIdx = getStatusStepIndex(order.status);
            const isHighlighted = highlightOrderId && String(order.order_id) === String(highlightOrderId);
            const isExpanded = expandedDetails[order.order_id];
            const isCancellable = order.status === 'confirmed' || order.status === 'pending' || order.status === 'processing';

            // Calculate itemized breakdown
            const items = order.items || [];
            const rawSubtotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
            const subtotal = order.subtotal ? Number(order.subtotal) : rawSubtotal;
            const taxAmount = order.tax_amount ? Number(order.tax_amount) : Math.round(subtotal * 0.18);
            const deliveryFee = order.delivery_fee !== null && order.delivery_fee !== undefined
              ? Number(order.delivery_fee)
              : (subtotal >= 499 ? 0 : 49);
            const discountAmount = Number(order.discount_amount) || 0;
            const totalAmount = Number(order.total_amount);
            const estimatedDelivery = getEstimatedDeliveryDate(order.created_at);

            return (
              <div
                key={order.order_id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                  isHighlighted ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200'
                }`}
              >
                {/* Order Top Bar */}
                <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base font-black text-slate-900">
                          Order #{order.order_id}
                        </h3>
                        {getStatusBadge(order.status)}
                        {order.razorpay_payment_id && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Razorpay Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Ordered on {new Date(order.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                        Total Paid (incl. GST)
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Cancellation Action Button if eligible */}
                    {isCancellable && (
                      <button
                        onClick={() => {
                          setCancelModalOrder(order);
                          setCancelReason('Found a better price elsewhere');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 text-xs font-bold transition shadow-xs hover:scale-105 active:scale-95"
                        title="Cancel this order"
                      >
                        <Ban className="w-3.5 h-3.5 text-rose-600" />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
                      title="Print Tax Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 5-Step Visual Tracking Stepper (if active) */}
                {order.status !== 'cancelled' ? (
                  <div className="px-6 py-8 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/40">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>Delivery Status:</span>
                        <span className="text-emerald-700 font-extrabold capitalize">
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {order.status === 'delivered' ? (
                          <span className="font-bold text-emerald-600">✓ Package delivered safely</span>
                        ) : (
                          <span>Estimated Arrival: <strong className="text-slate-800">{estimatedDelivery}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="relative pt-3 pb-2">
                      <div className="absolute top-7 left-6 right-6 h-1.5 bg-slate-200 rounded-full -z-0">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{
                            width:
                              stepIdx <= 0 ? '0%' :
                              stepIdx === 1 ? '25%' :
                              stepIdx === 2 ? '50%' :
                              stepIdx === 3 ? '75%' : '100%'
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-5 relative z-10 text-center">
                        {trackerSteps.map((st) => {
                          const isDone = stepIdx >= st.step;
                          const isCurrent = stepIdx === st.step;

                          return (
                            <div key={st.step} className="flex flex-col items-center">
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                                  isDone
                                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                    : 'bg-white border-2 border-slate-300 text-slate-400'
                                } ${isCurrent ? 'scale-115 ring-4 ring-emerald-200 font-black' : ''}`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                  st.step + 1
                                )}
                              </div>
                              <span
                                className={`text-[11px] font-bold mt-2.5 hidden sm:block ${
                                  isCurrent
                                    ? 'text-emerald-700 font-extrabold'
                                    : isDone
                                    ? 'text-slate-800'
                                    : 'text-slate-400'
                                }`}
                              >
                                {st.label}
                              </span>
                              <span
                                className={`text-[10px] font-bold mt-2 sm:hidden ${
                                  isCurrent
                                    ? 'text-emerald-700 font-extrabold'
                                    : isDone
                                    ? 'text-slate-800'
                                    : 'text-slate-400'
                                }`}
                              >
                                {st.shortLabel}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Cancelled Status Banner with Automatic Refund Details */
                  <div className="p-6 bg-gradient-to-r from-rose-50 via-amber-50/30 to-white border-b border-rose-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-rose-900">
                              Order #{order.order_id} Cancelled
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-800 text-[10px] font-extrabold uppercase">
                              Stock Restored
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {order.refund_info || (order.payment_status === 'refund_initiated' || order.razorpay_payment_id
                              ? `Refund of ₹${totalAmount.toLocaleString('en-IN')} has been initiated to your original payment source (Razorpay / UPI / Card). Expect credit in 3–5 business days.`
                              : 'This order was cancelled before dispatch. Reserved inventory items have been restored back to the catalog.')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          items.forEach(it => addToCart(it.product_id, 1));
                          if (showToast) showToast('Items re-added to your bag!', 'success');
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition shrink-0 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder Items</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Items in this Shipment */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Purchased Items ({items.length})
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      All products verified authentic & eligible for 7-day easy returns
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <div
                        key={item.item_id || item.product_id}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-16 h-16 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                          />
                          <div className="min-w-0">
                            <p 
                              onClick={() => onSelectProduct && onSelectProduct({ product_id: item.product_id })}
                              className="text-xs sm:text-sm font-bold text-slate-900 truncate hover:text-emerald-600 cursor-pointer transition"
                            >
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Qty: <strong className="text-slate-800">{item.quantity}</strong> × ₹{Number(item.price).toLocaleString('en-IN')}
                              {item.category && <span className="ml-2 text-slate-400">• {item.category}</span>}
                            </p>
                            {(item.selected_color || item.selected_size) && (
                              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                                {item.selected_color && item.selected_color !== 'Default' && (
                                  <span className="font-semibold text-slate-700">Color: {item.selected_color}</span>
                                )}
                                {item.selected_size && item.selected_size !== 'Standard' && (
                                  <span className="font-semibold text-slate-700">Size: {item.selected_size}</span>
                                )}
                                {item.sku && (
                                  <span className="text-slate-400 font-mono text-[10px]">SKU: {item.sku}</span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <span className="text-xs sm:text-sm font-black text-slate-900 block">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold">Inclusive of GST</span>
                          </div>

                          <button
                            onClick={() => addToCart(item.product_id, 1)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition shadow-xs"
                            title="Add to Cart again"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Buy Again</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itemized Price & Razorpay Breakdown */}
                <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => toggleDetails(order.order_id)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-700 hover:text-slate-900 transition mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      View Itemized GST Invoice & Payment Breakdown
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-fadeIn">
                      {/* Left: Financial Breakdown */}
                      <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/80">
                        <span className="font-extrabold text-slate-900 block text-xs mb-3 uppercase tracking-wider">
                          Tax Invoice Summary (INR ₹)
                        </span>
                        <div className="flex justify-between text-slate-600">
                          <span>Items Subtotal:</span>
                          <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Applicable GST (CGST + SGST @ 18%):</span>
                          <span className="font-bold text-slate-800">₹{taxAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Delivery & Handling Fee:</span>
                          <span className="font-bold text-slate-800">
                            {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE (orders over ₹499)</span> : `₹${deliveryFee}`}
                          </span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-emerald-600 font-bold">
                            <span>Promotional Coupon Discount:</span>
                            <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="border-t border-slate-100 pt-2.5 mt-2 flex justify-between text-sm font-black text-slate-900">
                          <span>Final Total Amount Paid:</span>
                          <span className="text-emerald-700 font-black">₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Right: Payment & Security details */}
                      <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-slate-200/80">
                        <span className="font-extrabold text-slate-900 block text-xs mb-3 uppercase tracking-wider">
                          Payment & Verification Details
                        </span>
                        
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Payment Method:</span>
                          <span className="font-bold text-slate-800 capitalize">
                            {order.payment_method || 'Razorpay UPI / Cards'}
                          </span>
                        </div>

                        {order.razorpay_payment_id && (
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Razorpay Payment ID:</span>
                            <div className="flex items-center gap-1.5">
                              <code className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] text-slate-800">
                                {order.razorpay_payment_id}
                              </code>
                              <button
                                onClick={() => copyToClipboard(order.razorpay_payment_id, `pay_${order.order_id}`)}
                                className="p-1 rounded hover:bg-slate-200 text-slate-500 transition"
                                title="Copy Payment ID"
                              >
                                {copiedId === `pay_${order.order_id}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {order.razorpay_order_id && (
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Razorpay Order ID:</span>
                            <code className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] text-slate-800">
                              {order.razorpay_order_id}
                            </code>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-slate-600">
                          <span>Payment Status:</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            order.payment_status === 'refund_initiated'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            <CheckCircle2 className="w-3 h-3 text-current" /> 
                            {order.payment_status === 'refund_initiated'
                              ? 'Refund Initiated'
                              : order.payment_status === 'paid'
                              ? 'Payment Verified'
                              : 'Paid'}
                          </span>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Secured by 256-bit encryption & RBI compliance</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping Destination Footer */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">Shipping Address: </span>
                      <span>{order.shipping_name}, {order.shipping_address}, {order.shipping_city} - {order.shipping_postal}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Need help with this order?</span>
                    <a href="#support" className="text-emerald-600 hover:underline font-bold">
                      Contact 24/7 BUYNEST Support
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Classic Order Cancellation Confirmation Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 relative my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Cancel Order #{cancelModalOrder.order_id}?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Total Order Value: <strong className="text-slate-900">₹{Number(cancelModalOrder.total_amount).toLocaleString('en-IN')}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCancelModalOrder(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-4 text-xs">
              {/* Refund Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automatic Refund & Instant Inventory Release</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {cancelModalOrder.payment_status === 'paid' || cancelModalOrder.razorpay_payment_id
                    ? `A 100% full refund of ₹${Number(cancelModalOrder.total_amount).toLocaleString('en-IN')} will be initiated back to your original payment method (Razorpay UPI / NetBanking / Card) within 3–5 business days.`
                    : 'Since this order is Cash on Delivery, no deduction will occur from your account.'}
                </p>
              </div>

              {/* Cancellation Reason Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Reason for cancellation (Optional):
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
                >
                  <option value="Found a better price elsewhere">Found a better price elsewhere</option>
                  <option value="Order placed by mistake">Order placed by mistake</option>
                  <option value="Delivery time is longer than expected">Delivery time is longer than expected</option>
                  <option value="Need to change shipping address or phone">Need to change shipping address or phone</option>
                  <option value="Want to change payment method or items">Want to change payment method or items</option>
                  <option value="Purchased alternative locally">Purchased alternative locally</option>
                  <option value="Other reasons">Other reasons</option>
                </select>
              </div>

              {/* Items summary */}
              <div>
                <span className="font-bold text-slate-600 block mb-2">
                  Items to be cancelled ({cancelModalOrder.items?.length || 0}):
                </span>
                <div className="max-h-36 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl p-2.5 bg-slate-50/60">
                  {cancelModalOrder.items?.map((it) => (
                    <div key={it.item_id || it.product_id} className="py-1.5 first:pt-0 last:pb-0 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800 truncate max-w-[280px]">
                        {it.name}
                      </span>
                      <span className="text-slate-500 font-bold shrink-0">
                        Qty: {it.quantity} × ₹{Number(it.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={() => handleConfirmCancel(cancelModalOrder.order_id)}
                disabled={cancelling}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-md shadow-rose-600/20 disabled:opacity-50 flex items-center gap-2"
              >
                {cancelling ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <>
                    <Ban className="w-3.5 h-3.5" />
                    <span>Confirm Cancellation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

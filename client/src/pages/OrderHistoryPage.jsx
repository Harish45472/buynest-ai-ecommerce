import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowLeft, ChevronRight, ShoppingBag, RotateCcw } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function OrderHistoryPage({ onBackToShopping, onSelectProduct, highlightOrderId }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">Delivered</span>;
      case 'shipped':
        return <span className="px-3 py-1 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full">Shipped</span>;
      case 'processing':
        return <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-700 rounded-full">Processing</span>;
      case 'cancelled':
        return <span className="px-3 py-1 text-xs font-bold bg-rose-100 text-rose-700 rounded-full">Cancelled</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-700 rounded-full">Pending</span>;
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return -1;
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Order History & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time delivery status and view item receipts for your purchases.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No orders found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            You haven't placed any orders matching this status yet.
          </p>
          <button
            onClick={onBackToShopping}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const stepIdx = getStatusStepIndex(order.status);
            const isHighlighted = highlightOrderId && String(order.order_id) === String(highlightOrderId);

            return (
              <div
                key={order.order_id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                  isHighlighted ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="p-6 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">
                          Order #{order.order_id}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Total Paid</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{Number(order.total_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Visual Order Tracking Stepper (if not cancelled) */}
                {order.status !== 'cancelled' ? (
                  <div className="px-6 py-5 border-b border-slate-100 bg-white">
                    <div className="grid grid-cols-4 relative text-center">
                      {/* Stepper bar track */}
                      <div className="absolute top-4 left-[12.5%] right-[12.5%] h-1 bg-slate-100 -z-0">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{
                            width: stepIdx === 0 ? '0%' : stepIdx === 1 ? '33%' : stepIdx === 2 ? '66%' : '100%'
                          }}
                        />
                      </div>

                      {[
                        { label: 'Order Placed', step: 0 },
                        { label: 'Processing', step: 1 },
                        { label: 'Shipped', step: 2 },
                        { label: 'Delivered', step: 3 }
                      ].map((s) => {
                        const isDone = stepIdx >= s.step;
                        const isCurrent = stepIdx === s.step;

                        return (
                          <div key={s.step} className="flex flex-col items-center z-10">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                                isDone
                                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                                  : 'bg-white border-2 border-slate-200 text-slate-400'
                              } ${isCurrent ? 'scale-110' : ''}`}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step + 1}
                            </div>
                            <span
                              className={`text-[11px] font-bold mt-2 ${
                                isCurrent
                                  ? 'text-emerald-700'
                                  : isDone
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 border-b border-rose-100 flex items-center gap-2 text-xs font-bold text-rose-700">
                    <AlertCircle className="w-4 h-4" />
                    This order was cancelled. Reserved inventory has been automatically restored.
                  </div>
                )}

                {/* Items Breakdown */}
                <div className="p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Items in this shipment ({order.items?.length || 0})
                  </h4>

                  <div className="divide-y divide-slate-100">
                    {order.items?.map((item) => (
                      <div
                        key={item.item_id}
                        className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Quantity: <strong className="text-slate-700">{item.quantity}</strong> × ₹{Number(item.price).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-black text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => addToCart(item.product_id, 1)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition"
                            title="Buy Again"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment Footer */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-slate-700">Delivery To:</span>{' '}
                    {order.shipping_name}, {order.shipping_address}, {order.shipping_city} {order.shipping_postal}
                  </div>
                  <div>
                    <span className="font-bold text-slate-700">Payment:</span> {order.payment_method}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

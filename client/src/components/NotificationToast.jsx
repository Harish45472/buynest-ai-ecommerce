import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function NotificationToast() {
  const { toastMessage, clearToast } = useCart();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const getStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        };
      case 'info':
        return {
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
          icon: <Info className="w-5 h-5 text-indigo-600 shrink-0" />
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        };
    }
  };

  const { bg, icon } = getStyles();

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in max-w-sm w-full">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${bg}`}>
        {icon}
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {message}
        </div>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

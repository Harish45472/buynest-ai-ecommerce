import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Settings, ShoppingCart, Eye, RefreshCw, Key, ChevronDown, Check } from 'lucide-react';
import api from '../api/client';
import { useCart } from '../context/CartContext';

export default function AiAssistant({ isOpen, onClose, onSelectProduct }) {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello! I'm Aura, your AI shopping assistant. What are you looking for today? Tell me your preferred category, budget, or specifications!",
      recommendations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState(localStorage.getItem('ai_provider') || 'openai');
  const [customKey, setCustomKey] = useState(localStorage.getItem('ai_custom_key') || '');
  const [keySaved, setKeySaved] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('ai_provider', provider);
    localStorage.setItem('ai_custom_key', customKey.trim());
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowSettings(false);
    }, 1200);
  };

  const handleSend = async (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: textToSend.trim(),
        history: messages,
        customApiKey: customKey.trim() || undefined,
        provider
      });

      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: res.data.reply,
        recommendations: res.data.recommendations || [],
        mode: res.data.mode
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI chat failed:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I'm having a little trouble fetching live recommendations right now. Please feel free to browse our catalogue or try again!",
          recommendations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const promptSuggestions = [
    "Recommend a laptop under $1300",
    "Best noise-cancelling headphones",
    "Fitness gear for workouts",
    "Minimalist coffee accessories under $50",
    "What are your top-rated products?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] h-[640px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-sm flex items-center gap-1.5">
              Aura Shopping Assistant
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            </h3>
            <p className="text-[11px] text-emerald-100 font-medium">
              {customKey ? `${provider.toUpperCase()} Connected` : 'Smart Catalog Engine Active'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/15 transition"
            title="Configure AI API Key"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/15 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel Drawer */}
      {showSettings && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 animate-fade-in text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              AI Engine Configuration
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-600 font-semibold"
            >
              Close
            </button>
          </div>
          <p className="text-slate-500 mb-3 leading-relaxed">
            By default, Aura uses our built-in zero-setup smart recommendation engine. You can optionally supply your own OpenAI or Gemini API key below:
          </p>

          <form onSubmit={handleSaveSettings} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="openai">OpenAI (GPT-4o-mini)</option>
                <option value="gemini">Google Gemini (1.5 Flash)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">API Key (Optional)</label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="sk-... or leave empty for built-in engine"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-1"
              >
                {keySaved ? <Check className="w-3.5 h-3.5" /> : null}
                {keySaved ? 'Saved!' : 'Save Settings'}
              </button>
              {customKey && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomKey('');
                    localStorage.removeItem('ai_custom_key');
                  }}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex gap-2.5 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-emerald-600 text-white shadow-sm'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>

            {/* Recommended Product Cards inside Assistant Chat */}
            {msg.recommendations && msg.recommendations.length > 0 && (
              <div className="mt-3 pl-9 w-full space-y-2 animate-fade-in">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Recommended for you:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {msg.recommendations.map((prod) => (
                    <div
                      key={prod.product_id}
                      onClick={() => onSelectProduct(prod)}
                      className="bg-white p-2.5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-400 transition flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">
                          {prod.category}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {prod.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-slate-900">
                            ${Number(prod.price).toFixed(2)}
                          </span>
                          {prod.stock > 0 ? (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart button right inside card */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (prod.stock > 0) {
                            addToCart(prod.product_id, 1);
                          }
                        }}
                        disabled={prod.stock <= 0}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white disabled:opacity-40 transition shadow-xs"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-slate-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
        {promptSuggestions.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 rounded-full transition shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aura anything (e.g. 'Laptop under $1200')..."
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition shadow-md shadow-emerald-600/20 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

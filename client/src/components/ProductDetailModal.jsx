import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Check, AlertTriangle, Sparkles, ShieldCheck, Truck, RotateCcw, Heart, Plus, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import productService from '../api/productService';

export default function ProductDetailModal({ product, onClose, onSelectProduct }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [pincode, setPincode] = useState('560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [bundleData, setBundleData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingBundle, setLoadingBundle] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setBundleAdded(false);
    if (product) {
      setSelectedImage(product.image_url || (product.images && product.images[0]));
      const sizes = Array.isArray(product.sizes) ? product.sizes : (typeof product.sizes === 'string' ? JSON.parse(product.sizes || '["Standard"]') : ['Standard']);
      const colors = Array.isArray(product.colors) ? product.colors : (typeof product.colors === 'string' ? JSON.parse(product.colors || '["Default"]') : ['Default']);
      setSelectedSize(sizes[0] || 'Standard');
      setSelectedColor(colors[0] || 'Default');

      fetchBundleAndRelated(product.product_id);
    }
  }, [product]);

  const fetchBundleAndRelated = async (productId) => {
    try {
      setLoadingBundle(true);
      const [bundleRes, relRes] = await Promise.allSettled([
        productService.getBundle(productId),
        productService.getProductById(productId)
      ]);

      if (bundleRes.status === 'fulfilled') {
        setBundleData(bundleRes.value);
      }
      if (relRes.status === 'fulfilled' && relRes.value.related) {
        setRelatedProducts(relRes.value.related);
      }
    } catch (err) {
      console.warn('Failed to load bundle or related items:', err);
    } finally {
      setLoadingBundle(false);
    }
  };

  if (!product) return null;

  const wishlisted = isWishlisted(product.product_id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'];

  const sizes = Array.isArray(product.sizes) 
    ? product.sizes 
    : (typeof product.sizes === 'string' ? JSON.parse(product.sizes || '["Standard"]') : ['Standard']);

  const colors = Array.isArray(product.colors) 
    ? product.colors 
    : (typeof product.colors === 'string' ? JSON.parse(product.colors || '["Default"]') : ['Default']);

  const specs = typeof product.specifications === 'object' && product.specifications !== null
    ? product.specifications
    : (typeof product.specifications === 'string' ? JSON.parse(product.specifications || '{}') : {});

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product.product_id, quantity);
    }
  };

  const handleAddBundleToCart = () => {
    if (bundleData && bundleData.items) {
      bundleData.items.forEach(item => {
        addToCart(item.product_id, 1);
      });
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 my-6 relative max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            {product.sub_category && product.sub_category !== 'General' && (
              <span className="text-[10px] font-bold text-slate-500">
                / {product.sub_category}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Product Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80">
                <img
                  src={selectedImage || product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount_percent > 0 && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {product.discount_percent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        selectedImage === img ? 'border-emerald-600 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details & Actions Column */}
            <div className="space-y-4">
              {/* Brand & Title */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  {product.brand || 'BUYNEST Select'}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-0.5">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span className="text-xs font-bold text-amber-900">{product.rating || 4.3}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {product.reviews_count || 140} verified buyer ratings
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="p-3 bg-slate-50 rounded-2xl flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-slate-900">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    MRP ₹{Number(product.mrp).toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount_percent > 0 && (
                  <span className="text-xs font-extrabold text-emerald-600">
                    ({product.discount_percent}% OFF)
                  </span>
                )}
              </div>

              {/* Size Selector */}
              {sizes && sizes.length > 0 && sizes[0] !== 'Standard' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700">Select Size</span>
                    <span className="text-[11px] text-indigo-600 font-semibold cursor-pointer hover:underline">Size Chart</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                          selectedSize === s
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {colors && colors.length > 0 && colors[0] !== 'Default' && (
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">Available Color / Style</span>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                          selectedColor === c
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-500 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery PIN Code Estimator */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivery Options & Estimate</span>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit PIN code"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="px-3 py-1.5 text-xs font-bold text-emerald-600 border border-emerald-600/30 rounded-xl hover:bg-emerald-50 transition"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Delivery by Thursday • Free shipping on orders above ₹999
                  </p>
                )}
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition ${
                    wishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title={wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Seller & Trust Badges */}
              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <p>Seller: <strong className="text-slate-800">{product.seller_name || 'BUYNEST Retail'}</strong> (4.8 ★ Seller Rating)</p>
                <div className="flex items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3 text-emerald-600" /> 14-Day Return Guarantee</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-indigo-600" /> 100% Genuine Product</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {Object.keys(specs).length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                Product Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl">
                {Object.entries(specs).map(([key, val], idx) => (
                  <div key={idx}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{key}</span>
                    <span className="text-xs font-semibold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frequently Bought Together Bundle */}
          {bundleData && bundleData.items && bundleData.items.length > 1 && (
            <div className="border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-white p-5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                    Bundle & Save 10% Extra
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mt-1">Frequently Bought Together</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    ₹{bundleData.originalTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base font-black text-slate-900">
                    ₹{bundleData.bundlePrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {bundleData.items.map((item, idx) => (
                  <React.Fragment key={item.product_id}>
                    <div 
                      onClick={() => onSelectProduct(item)}
                      className="w-24 shrink-0 bg-white p-2 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition cursor-pointer text-center"
                    >
                      <div className="w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-1.5">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] font-black text-slate-900 truncate">{item.brand}</p>
                      <p className="text-[9px] text-slate-500 truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-emerald-600 mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    {idx < bundleData.items.length - 1 && (
                      <div className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-400 font-bold shrink-0">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added {bundleData.items.length} Items to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All {bundleData.items.length} to Cart (Save ₹{bundleData.bundleDiscount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                More in {product.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.product_id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-2.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:shadow-md transition cursor-pointer text-left"
                  >
                    <div className="w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-2">
                      <img src={rel.image_url} alt={rel.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-indigo-600 block truncate">
                      {rel.brand || 'BUYNEST'}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 truncate">{rel.name}</h4>
                    <p className="text-xs font-black text-slate-900 mt-1">₹{rel.price.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

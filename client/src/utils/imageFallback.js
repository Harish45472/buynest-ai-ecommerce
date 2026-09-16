/**
 * client/src/utils/imageFallback.js
 * Intelligent Category-Specific Image Fallback Utility.
 * Ensures that if any product image fails to load, a category-appropriate
 * fallback image is loaded rather than a generic or broken placeholder.
 */

export const CATEGORY_FALLBACKS = {
  Smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  Laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  Audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  Shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  Footwear: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  Men: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  "Men's Clothing": 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  Women: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  "Women's Clothing": 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  Beauty: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
  "Beauty & Personal Care": 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
  "Home & Kitchen": 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  Grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  Books: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
  "Sports & Fitness": 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
  "Toys & Baby": 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  Automotive: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
  Default: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
};

export function getCategoryFallback(category = '', subCategory = '') {
  const cat = (category || '').toLowerCase();
  const sub = (subCategory || '').toLowerCase();

  // 1. Subcategory specific matches
  if (sub.includes('smartphone') || sub.includes('phone')) return CATEGORY_FALLBACKS.Smartphones;
  if (sub.includes('laptop')) return CATEGORY_FALLBACKS.Laptops;
  if (sub.includes('headphone') || sub.includes('earbud') || sub.includes('speaker') || sub.includes('audio')) {
    return CATEGORY_FALLBACKS.Audio;
  }
  if (sub.includes('shoe') || sub.includes('sneaker') || sub.includes('heel') || sub.includes('sandal') || sub.includes('boot')) {
    return CATEGORY_FALLBACKS.Shoes;
  }
  if (sub.includes('furniture') || sub.includes('bed') || sub.includes('sofa') || sub.includes('chair') || sub.includes('table')) {
    return CATEGORY_FALLBACKS.Furniture;
  }

  // 2. Category level matches
  if (cat.includes('men')) return CATEGORY_FALLBACKS.Men;
  if (cat.includes('women')) return CATEGORY_FALLBACKS.Women;
  if (cat.includes('beauty')) return CATEGORY_FALLBACKS.Beauty;
  if (cat.includes('electron')) return CATEGORY_FALLBACKS.Electronics;
  if (cat.includes('home') || cat.includes('kitchen')) return CATEGORY_FALLBACKS['Home & Kitchen'];
  if (cat.includes('grocery')) return CATEGORY_FALLBACKS.Grocery;
  if (cat.includes('book')) return CATEGORY_FALLBACKS.Books;
  if (cat.includes('sport')) return CATEGORY_FALLBACKS['Sports & Fitness'];
  if (cat.includes('toy') || cat.includes('baby')) return CATEGORY_FALLBACKS['Toys & Baby'];
  if (cat.includes('auto')) return CATEGORY_FALLBACKS.Automotive;

  return CATEGORY_FALLBACKS.Default;
}

export function handleImageError(e, category, subCategory) {
  const fallback = getCategoryFallback(category, subCategory);
  if (e && e.currentTarget && e.currentTarget.src !== fallback) {
    e.currentTarget.src = fallback;
  }
}

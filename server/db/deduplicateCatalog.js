// BUYNEST Catalog Deduplication & Variant Consolidation Engine
// Groups products representing the same model/design into a single canonical product
// and builds rich selectable variant arrays with color swatches, hex values, sizes, and SKUs.
const { resolveRealProductImages, resolveRealVariantImages } = require('./realPhotoLibrary');

const COLOR_HEX_MAP = {
  black: '#111827',
  'jet black': '#09090b',
  'matte black': '#18181b',
  'core black': '#111827',
  'glossy black': '#0a0a0a',
  'titanium black': '#1f2937',
  'obsidian black': '#0f172a',
  charcoal: '#374151',
  'charcoal grey': '#374151',
  'dark brown': '#451a03',
  'tan brown': '#9a3412',
  'camel tan': '#b45309',
  tan: '#b45309',
  brown: '#78350f',
  navy: '#1e3a8a',
  'navy blue': '#1e3a8a',
  'midnight navy': '#0f172a',
  midnight: '#0f172a',
  'royal blue': '#1d4ed8',
  'sky blue': '#0284c7',
  'glacier blue': '#38bdf8',
  blue: '#2563eb',
  teal: '#0d9488',
  'teal blue': '#0f766e',
  white: '#ffffff',
  'pure white': '#ffffff',
  'crisp white': '#ffffff',
  'triple white': '#f8fafc',
  'off-white': '#f1f5f9',
  starlight: '#f8fafc',
  'starlight silver': '#e2e8f0',
  silver: '#94a3b8',
  'silver grey': '#94a3b8',
  'arctic silver': '#cbd5e1',
  grey: '#6b7280',
  gray: '#6b7280',
  'space grey': '#4b5563',
  titanium: '#6b7280',
  'natural titanium': '#9ca3af',
  red: '#dc2626',
  'crimson red': '#b91c1c',
  'flame red': '#ef4444',
  maroon: '#800000',
  'deep maroon': '#881337',
  'wine red': '#701a75',
  burgundy: '#831843',
  oxblood: '#4a0404',
  pink: '#ec4899',
  'blush pink': '#f472b6',
  'dusty rose': '#fb7185',
  'rose gold': '#f43f5e',
  green: '#16a34a',
  'emerald green': '#059669',
  'forest green': '#14532d',
  olive: '#556b2f',
  'olive green': '#4d7c0f',
  'mint green': '#6ee7b7',
  yellow: '#eab308',
  mustard: '#ca8a04',
  'mustard yellow': '#ca8a04',
  gold: '#d97706',
  'metallic gold': '#f59e0b',
  amber: '#d97706',
  orange: '#ea580c',
  purple: '#7e22ce',
  'royal purple': '#6b21a8',
  lilac: '#c084fc',
  beige: '#d4b996',
  'warm beige': '#d4b996',
  'nude beige': '#e2d5c3',
  cream: '#fef3c7',
  khaki: '#a3a380',
  gunmetal: '#3f3f46',
  camo: '#4d7c0f'
};

function getColorHex(colorStr) {
  if (!colorStr || typeof colorStr !== 'string') return '#111827';
  const lower = colorStr.toLowerCase().trim();
  if (COLOR_HEX_MAP[lower]) return COLOR_HEX_MAP[lower];
  for (const [key, hex] of Object.entries(COLOR_HEX_MAP)) {
    if (lower.includes(key)) return hex;
  }
  return '#374151';
}

function extractBaseModel(brand, name, category, subCategory) {
  const catLower = (category || '').toLowerCase();
  if (['books', 'grocery', 'toys & baby'].includes(catLower)) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  let clean = (name || '').toLowerCase();
  if (brand) {
    const bEsc = brand.toLowerCase().replace(/[^a-z0-9]/g, '\\s*');
    clean = clean.replace(new RegExp('\\b' + bEsc + '\\b', 'gi'), ' ');
  }

  clean = clean.replace(/\b(black|blue|navy|white|grey|gray|red|green|olive|yellow|pink|purple|beige|brown|tan|maroon|gold|silver|charcoal|starlight|midnight|titanium|cream|khaki|mustard|orange|teal|burgundy|emerald|glacier|natural|triple|core|panda)\b/gi, ' ');
  clean = clean.replace(/\b\d+(\.\d+)?\s*(gb|tb|mb|ram|rom|mah|w|watts?|hz|mp|cmos|inch|in|"|kg|g|ml|l|litre|pack|pieces?|pcs)\b/gi, ' ');
  clean = clean.replace(/\([^)]*\)/g, ' ');
  clean = clean.replace(/[^a-z0-9\s-]/g, ' ');
  clean = clean.replace(/\s+/g, ' ').trim();

  const words = clean.split(' ').filter(w => w.length > 1);
  return words.slice(0, 4).join(' ') || (subCategory || 'item').toLowerCase();
}

function cleanCanonicalTitle(name, category) {
  if (['Books', 'Grocery', 'Toys & Baby'].includes(category)) {
    return name.trim();
  }
  return name
    .replace(/\b(Black|Blue|Navy|White|Grey|Gray|Olive|Green|Maroon|Red|Pink|Yellow|Beige|Brown|Purple|Charcoal|Cream|Khaki|Mustard)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

/**
 * Deduplicates raw products and merges variants into rich colors/sizes and structured variants array.
 */
function deduplicateAndConsolidate(rawProducts) {
  const modelMap = new Map();

  for (const p of rawProducts) {
    const brand = (p.brand || 'BUYNEST').trim();
    const category = p.category || 'General';
    const subCategory = p.sub_category || 'General';
    const baseModel = extractBaseModel(brand, p.name, category, subCategory);

    // Identity key: Brand + Category + SubCategory + BaseModel
    const modelKey = `${brand.toLowerCase()}|${category.toLowerCase()}|${subCategory.toLowerCase()}|${baseModel}`;

    const itemColors = Array.isArray(p.colors) ? p.colors : [p.colors || 'Default'];
    const itemSizes = Array.isArray(p.sizes) ? p.sizes : [p.sizes || 'Standard'];
    const itemImages = Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image_url];

    if (modelMap.has(modelKey)) {
      const existing = modelMap.get(modelKey);

      // Consolidate colors
      const mergedColors = Array.from(new Set([...existing.colors, ...itemColors])).filter(Boolean);
      existing.colors = mergedColors.slice(0, 6);

      // Consolidate sizes
      const mergedSizes = Array.from(new Set([...existing.sizes, ...itemSizes])).filter(Boolean);
      existing.sizes = mergedSizes;

      // Retain the higher review count & best rating
      if (p.reviews_count > existing.reviews_count) existing.reviews_count = p.reviews_count;
      if (p.rating > existing.rating) existing.rating = p.rating;

      // Merge images
      existing.images = Array.from(new Set([...existing.images, ...itemImages])).slice(0, 6);
    } else {
      modelMap.set(modelKey, {
        ...p,
        name: cleanCanonicalTitle(p.name, category),
        model: baseModel,
        colors: itemColors.slice(0, 6),
        sizes: itemSizes,
        images: itemImages.slice(0, 6)
      });
    }
  }

  // Generate clean sequential IDs, SKUs, and structured variants with real photographic image sets
  const deduplicatedList = Array.from(modelMap.values()).map((prod, idx) => {
    const prodId = idx + 1;
    const brandCode = (prod.brand || 'BN').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'BNST';
    const catCode = (prod.category || 'GEN').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'GEN';
    const baseSku = `${brandCode}-${catCode}-${String(prodId).padStart(4, '0')}`;

    // Resolve real studio product photographs (primary + gallery)
    const prodImages = resolveRealProductImages(prod.category, prod.sub_category, prod.brand, prod.name, prodId);

    const variants = (prod.colors || ['Default']).map((col, cIdx) => {
      const colCode = col.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'COLR';
      // Real color-specific photography
      const variantImages = resolveRealVariantImages(prod.category, prod.sub_category, col, prodId, cIdx + 1);

      return {
        variant_id: `${prodId}-${cIdx + 1}`,
        color: col,
        color_hex: getColorHex(col),
        size: (prod.sizes && prod.sizes.length > 0) ? prod.sizes[0] : 'Standard',
        images: variantImages,
        image_url: variantImages[0].url,
        price: prod.price,
        stock: Math.max(2, (prod.stock - cIdx * 3)),
        sku: `${baseSku}-${colCode}`
      };
    });

    return {
      ...prod,
      id: prodId,
      product_id: prodId,
      sku: baseSku,
      images: prodImages,
      image_url: prodImages[0].url,
      variants: variants
    };
  });

  return deduplicatedList;
}

module.exports = {
  deduplicateAndConsolidate,
  extractBaseModel,
  getColorHex,
  COLOR_HEX_MAP,
  slugify
};


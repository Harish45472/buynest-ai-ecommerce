/**
 * server/validate-catalog.js
 * Comprehensive automated validation script for e-commerce catalog integrity.
 * Asserts:
 *  1. Total canonical products >= 1,100
 *  2. 0 duplicate products (by brand + normalized_model + category + subcategory)
 *  3. 0 duplicate variants within any product
 *  4. 0 missing images, prices, brands, categories
 *  5. 100% variant coverage (every product has valid variants with id, color, hex, size, image, price, stock, sku)
 *  6. Strict Category & Subcategory minimum thresholds:
 *     - Smartphones / Audio >= 100
 *     - Laptops / Computers / Accessories >= 100
 *     - Men's Fashion >= 150
 *     - Women's Fashion >= 150
 *     - Footwear (Men/Women/Kids/Sports) >= 100
 *     - Beauty & Personal Care >= 100
 *     - Home & Kitchen >= 100
 *     - Sports & Fitness >= 75
 *     - Grocery & Gourmet >= 75
 *     - Books >= 50
 *     - Toys & Baby >= 50
 *     - Automotive >= 50
 */

const { buildFullCatalog } = require('./db/catalogData');
const { extractBaseModel } = require('./db/deduplicateCatalog');

const catalogProducts = buildFullCatalog();

console.log('='.repeat(70));
console.log('🚀 RUNNING CATALOG INTEGRITY & DEDUPLICATION VALIDATION');
console.log('='.repeat(70));

let errors = [];

// 1. Total canonical products count
const totalCount = catalogProducts.length;
console.log(`\n📊 Total Canonical Products: ${totalCount}`);
if (totalCount < 1100) {
  errors.push(`Total products ${totalCount} is less than target 1,100!`);
} else {
  console.log(`  ✅ Passed total threshold (Found ${totalCount} >= 1,100)`);
}

// 2. Duplicate Detection
const modelKeyMap = new Map();
let duplicateCount = 0;

for (const p of catalogProducts) {
  const brand = (p.brand || '').toLowerCase().trim();
  const cat = (p.category || '').toLowerCase().trim();
  const sub = (p.subCategory || p.sub_category || '').toLowerCase().trim();
  const baseModel = extractBaseModel(p.brand, p.name, p.category, p.subCategory || p.sub_category);
  const key = `${cat}:::${sub}:::${brand}:::${baseModel}`;

  if (modelKeyMap.has(key)) {
    duplicateCount++;
    errors.push(`Duplicate canonical product detected: "${p.name}" (${p.brand}) collides with "${modelKeyMap.get(key).name}" [Key: ${key}]`);
  } else {
    modelKeyMap.set(key, p);
  }
}

if (duplicateCount === 0) {
  console.log(`  ✅ 0 Duplicate Products Detected (Strict deduplication passed)`);
} else {
  console.error(`  ❌ Found ${duplicateCount} duplicate products!`);
}

// 3. Variant integrity & completeness
let missingImages = 0;
let invalidVariants = 0;
let missingFields = 0;
let duplicateVariantsCount = 0;

for (const p of catalogProducts) {
  // Required product fields
  if (!p.name || !p.brand || !p.category || typeof p.price !== 'number' || p.price <= 0) {
    missingFields++;
    errors.push(`Product ${p.product_id || p.id} is missing core fields (name, brand, category, or positive price)`);
  }

  // Check images
  if (!p.image_url || typeof p.image_url !== 'string' || !p.image_url.startsWith('http')) {
    missingImages++;
    errors.push(`Product ${p.name} has invalid primary image_url: ${p.image_url}`);
  }

  if (Array.isArray(p.images)) {
    for (const img of p.images) {
      if (!img || typeof img !== 'string' || !img.startsWith('http')) {
        missingImages++;
        errors.push(`Product ${p.name} has invalid gallery image: ${img}`);
      }
    }
  }

  // Check variants
  if (!Array.isArray(p.variants) || p.variants.length === 0) {
    invalidVariants++;
    errors.push(`Product ${p.name} has NO variants!`);
  } else {
    const seenVariantKeys = new Set();
    for (const v of p.variants) {
      if (!v.variant_id || !v.color || !v.color_hex || !v.size || !v.sku || typeof v.price !== 'number' || typeof v.stock !== 'number') {
        invalidVariants++;
        errors.push(`Product ${p.name} has incomplete variant: ${JSON.stringify(v)}`);
      }
      const vKey = `${v.color}:::${v.size}`;
      if (seenVariantKeys.has(vKey)) {
        duplicateVariantsCount++;
        errors.push(`Product ${p.name} has duplicate variant for [${vKey}]`);
      } else {
        seenVariantKeys.add(vKey);
      }
    }
  }
}

console.log(`\n🔍 Product & Variant Health:`);
console.log(`  - Missing or Broken Images: ${missingImages}`);
console.log(`  - Invalid/Missing Variants: ${invalidVariants}`);
console.log(`  - Duplicate Variants: ${duplicateVariantsCount}`);
console.log(`  - Missing Core Fields: ${missingFields}`);

if (missingImages === 0 && invalidVariants === 0 && duplicateVariantsCount === 0 && missingFields === 0) {
  console.log(`  ✅ 100% Variant and Media Coverage with 0 errors!`);
}

// 4. Category and Subcategory Thresholds
console.log(`\n📦 Category Threshold Verification:`);

// Category Counters
let smartphoneAudioCount = 0;
let laptopComputerCount = 0;
let menFashionCount = 0;
let womenFashionCount = 0;
let footwearCount = 0;
let beautyCount = 0;
let homeKitchenCount = 0;
let sportsCount = 0;
let groceryCount = 0;
let booksCount = 0;
let toysBabyCount = 0;
let automotiveCount = 0;

for (const p of catalogProducts) {
  const cat = (p.category || '').toLowerCase();
  const sub = (p.subCategory || p.sub_category || '').toLowerCase();
  const name = (p.name || '').toLowerCase();

  // Electronics - Smartphones & Audio
  if (cat === 'electronics') {
    if (['smartphones', 'headphones', 'earbuds', 'speakers', 'smartwatches', 'cameras'].includes(sub)) {
      smartphoneAudioCount++;
    }
    if (['laptops', 'tablets', 'smart tvs', 'monitors', 'computer accessories', 'gaming accessories', 'chargers', 'power banks', 'keyboards', 'mice', 'printers'].includes(sub)) {
      laptopComputerCount++;
    }
  }

  // Men's Fashion
  if (cat === 'men' || cat === "men's fashion" || (cat === 'fashion' && (sub.includes('men') || p.gender === 'Men'))) {
    menFashionCount++;
  }

  // Women's Fashion
  if (cat === 'women' || cat === "women's fashion" || (cat === 'fashion' && (sub.includes('women') || p.gender === 'Women'))) {
    womenFashionCount++;
  }

  // Footwear (across all categories)
  if (
    sub.includes('shoe') || sub.includes('sneaker') || sub.includes('sandal') || sub.includes('heel') || sub.includes('footwear') ||
    name.includes('shoe') || name.includes('sneaker') || name.includes('sandal') || name.includes('heel') || name.includes('slide') || name.includes('boot')
  ) {
    footwearCount++;
  }

  // Beauty & Personal Care
  if (cat.includes('beauty')) {
    beautyCount++;
  }

  // Home & Kitchen
  if (cat.includes('home') || cat.includes('kitchen')) {
    homeKitchenCount++;
  }

  // Sports & Fitness
  if (cat.includes('sport') || cat.includes('fitness')) {
    sportsCount++;
  }

  // Grocery
  if (cat.includes('grocery') || cat.includes('gourmet')) {
    groceryCount++;
  }

  // Books
  if (cat.includes('book')) {
    booksCount++;
  }

  // Toys & Baby
  if (cat.includes('toy') || cat.includes('baby') || cat.includes('kids')) {
    toysBabyCount++;
  }

  // Automotive
  if (cat === 'automotive') {
    automotiveCount++;
  }
}

const thresholds = [
  { name: 'Smartphones & Audio', actual: smartphoneAudioCount, target: 100 },
  { name: 'Laptops, Computers & Accessories', actual: laptopComputerCount, target: 100 },
  { name: "Men's Fashion", actual: menFashionCount, target: 150 },
  { name: "Women's Fashion", actual: womenFashionCount, target: 150 },
  { name: 'Footwear (Men/Women/Kids/Sports)', actual: footwearCount, target: 100 },
  { name: 'Beauty & Personal Care', actual: beautyCount, target: 100 },
  { name: 'Home & Kitchen', actual: homeKitchenCount, target: 100 },
  { name: 'Sports & Fitness', actual: sportsCount, target: 75 },
  { name: 'Grocery & Gourmet', actual: groceryCount, target: 75 },
  { name: 'Books', actual: booksCount, target: 50 },
  { name: 'Toys & Baby Products', actual: toysBabyCount, target: 50 },
  { name: 'Automotive Accessories', actual: automotiveCount, target: 50 }
];

for (const t of thresholds) {
  const passed = t.actual >= t.target;
  const statusIcon = passed ? '✅' : '❌';
  console.log(`  ${statusIcon} ${t.name.padEnd(36)}: ${String(t.actual).padStart(4)} / ${t.target} min`);
  if (!passed) {
    errors.push(`Threshold failed for ${t.name}: expected >= ${t.target}, got ${t.actual}`);
  }
}

console.log('\n' + '='.repeat(70));
if (errors.length === 0) {
  console.log('🎉 ALL CATALOG INTEGRITY, DEDUPLICATION & THRESHOLD TESTS PASSED!');
  console.log('='.repeat(70));
  process.exit(0);
} else {
  console.error(`💥 VALIDATION FAILED WITH ${errors.length} ERRORS:`);
  errors.slice(0, 15).forEach((e, idx) => console.error(`  ${idx + 1}. ${e}`));
  if (errors.length > 15) {
    console.error(`  ... and ${errors.length - 15} more errors`);
  }
  console.log('='.repeat(70));
  process.exit(1);
}

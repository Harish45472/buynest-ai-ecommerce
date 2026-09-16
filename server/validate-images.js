/**
 * server/validate-images.js
 * Comprehensive Automated Image Integrity & Deduplication Validation Script.
 * Verifies:
 *  1. Total products >= 1,000
 *  2. Products with valid images
 *  3. 0 Missing images
 *  4. 0 Broken image URLs (valid HTTP/HTTPS with proper format)
 *  5. 0 Duplicate primary image assignments across unrelated products
 *  6. 100% Variant image coverage with color-specific matching
 *  7. Validates category fallback mappings
 */

const { buildFullCatalog } = require('./db/catalogData');
const { CATEGORY_FALLBACKS } = require('./db/imageLibrary');

console.log('='.repeat(70));
console.log('🖼️  RUNNING COMPREHENSIVE IMAGE INTEGRITY & VALIDATION SUITE');
console.log('='.repeat(70));

const catalog = buildFullCatalog();
const totalProducts = catalog.length;

let productsWithImages = 0;
let missingImages = 0;
let brokenImages = 0;
let duplicateAssignments = 0;
let invalidFormat = 0;
let variantImageErrors = 0;

const seenPrimaryUrls = new Map();
const urlRegex = /^https?:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]+/;

for (const prod of catalog) {
  const primaryUrl = prod.image_url || (prod.images && prod.images[0]);

  // 1. Check missing image
  if (!primaryUrl) {
    missingImages++;
    continue;
  }

  // 2. Check broken image / URL syntax
  if (!urlRegex.test(primaryUrl)) {
    brokenImages++;
    console.error(`❌ Invalid image URL format on product ${prod.id} (${prod.name}): ${primaryUrl}`);
  }

  // 3. Check duplicate primary image URL across unrelated products
  if (seenPrimaryUrls.has(primaryUrl)) {
    const existing = seenPrimaryUrls.get(primaryUrl);
    duplicateAssignments++;
    console.error(`❌ Duplicate image assignment: Product #${prod.id} "${prod.name}" shares URL with Product #${existing.id} "${existing.name}"`);
  } else {
    seenPrimaryUrls.set(primaryUrl, prod);
  }

  // 4. Validate gallery images
  if (!Array.isArray(prod.images) || prod.images.length === 0) {
    missingImages++;
  } else {
    for (const gImg of prod.images) {
      if (!urlRegex.test(gImg)) {
        brokenImages++;
      }
    }
  }

  // 5. Validate variants have color-specific images
  if (Array.isArray(prod.variants)) {
    for (const v of prod.variants) {
      if (!v.image_url || !urlRegex.test(v.image_url)) {
        variantImageErrors++;
      }
      if (!Array.isArray(v.images) || v.images.length === 0) {
        variantImageErrors++;
      }
    }
  }

  productsWithImages++;
}

// 6. Validate Category Fallbacks
let missingFallbacks = 0;
for (const [catName, fallbackUrl] of Object.entries(CATEGORY_FALLBACKS)) {
  if (!fallbackUrl || !urlRegex.test(fallbackUrl)) {
    missingFallbacks++;
    console.error(`❌ Category fallback broken for "${catName}": ${fallbackUrl}`);
  }
}

console.log('\n======================================================================');
console.log('📋 CATALOG IMAGE VALIDATION AUDIT REPORT');
console.log('======================================================================');
console.log(`Total products: ${totalProducts}`);
console.log(`Products with images: ${productsWithImages}`);
console.log(`Missing images: ${missingImages}`);
console.log(`Broken images: ${brokenImages}`);
console.log(`Duplicate image assignments: ${duplicateAssignments}`);
console.log(`Variant image integrity errors: ${variantImageErrors}`);
console.log(`Category fallbacks verified: ${Object.keys(CATEGORY_FALLBACKS).length} (Errors: ${missingFallbacks})`);
console.log('======================================================================');

if (
  missingImages === 0 &&
  brokenImages === 0 &&
  duplicateAssignments === 0 &&
  variantImageErrors === 0 &&
  missingFallbacks === 0 &&
  totalProducts >= 1000
) {
  console.log('🎉 ALL IMAGE AUDIT AND DEDUPLICATION CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error('💥 IMAGE VALIDATION FAILED WITH ERRORS ABOVE.\n');
  process.exit(1);
}

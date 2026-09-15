const assert = require('assert');

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Full BUYNEST Marketplace & AI Verification Suite...\n');

  // 1. Health Check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  assert.strictEqual(healthData.status, 'ok', 'Health check failed');
  assert.strictEqual(healthData.store, 'BUYNEST', 'Expected BUYNEST store identity');
  console.log('✅ 1. Health Check Passed (Store: BUYNEST)');

  // 2. Authentication: Login as Demo Customer
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@ecommerce.com', password: 'user123' })
  });
  const loginData = await loginRes.json();
  assert(loginData.token, 'Customer login failed: token missing');
  assert.strictEqual(loginData.user.email, 'user@ecommerce.com');
  const userToken = loginData.token;
  console.log('✅ 2. Customer Authentication Passed');

  // 3. Authentication: Login as Demo Admin
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ecommerce.com', password: 'admin123' })
  });
  const adminLoginData = await adminLoginRes.json();
  assert(adminLoginData.token, 'Admin login failed');
  assert.strictEqual(adminLoginData.user.role, 'admin');
  const adminToken = adminLoginData.token;
  console.log('✅ 3. Admin Authentication Passed');

  // 4. Products: 200+ Catalog Size Verification
  const allProductsRes = await fetch(`${BASE_URL}/products`);
  const allProductsData = await allProductsRes.json();
  assert(allProductsData.products.length >= 200, `Expected at least 200 products, found ${allProductsData.products.length}`);
  console.log(`✅ 4. 200+ Products Catalog Verified (${allProductsData.products.length} active products in database)`);

  // 5. Category & Subcategory Filtering (Men -> T-shirts)
  const subCatRes = await fetch(`${BASE_URL}/products?category=Men&sub_category=T-shirts`);
  const subCatData = await subCatRes.json();
  assert(subCatData.products.length > 0, 'No Men T-shirts found');
  assert(subCatData.products.every(p => p.category === 'Men' && p.sub_category === 'T-shirts'), 'Filtering mismatch');
  console.log(`✅ 5. Category & Subcategory Filtering Passed (${subCatData.products.length} Men T-shirts)`);

  // 6. Brand Filtering
  const brandRes = await fetch(`${BASE_URL}/products?brands=Puma`);
  const brandData = await brandRes.json();
  assert(brandData.products.length > 0, 'No Puma products found');
  assert(brandData.products.every(p => p.brand.toLowerCase() === 'puma'), 'Brand filter failed');
  console.log(`✅ 6. Brand Filtering Passed (${brandData.products.length} Puma products found)`);

  // 7. Rating Filtering (4★ & above)
  const ratingRes = await fetch(`${BASE_URL}/products?minRating=4.5`);
  const ratingData = await ratingRes.json();
  assert(ratingData.products.length > 0, 'No high-rated products found');
  assert(ratingData.products.every(p => p.rating >= 4.5), 'Rating filter failed');
  console.log(`✅ 7. Rating Filtering Passed (${ratingData.products.length} products with rating >= 4.5★)`);

  // 8. Dynamic Facets API
  const facetsRes = await fetch(`${BASE_URL}/products/facets?category=Electronics`);
  const facetsData = await facetsRes.json();
  assert(facetsData.brands.length > 0, 'No brands returned in facets');
  assert(facetsData.subCategories.length > 0, 'No subcategories returned in facets');
  console.log(`✅ 8. Dynamic Filter Facets Verified (${facetsData.brands.length} brands, ${facetsData.subCategories.length} subcategories in Electronics)`);

  // 9. Frequently Bought Together Bundle API
  const testProd = allProductsData.products[0];
  const bundleRes = await fetch(`${BASE_URL}/products/${testProd.product_id}/bundle`);
  const bundleData = await bundleRes.json();
  assert(bundleData.items.length >= 2, 'Bundle items missing');
  assert(bundleData.bundlePrice < bundleData.originalTotal, 'Bundle discount calculation failed');
  console.log(`✅ 9. Frequently Bought Together Bundle Passed (Original: ₹${bundleData.originalTotal.toLocaleString('en-IN')}, Bundle: ₹${bundleData.bundlePrice.toLocaleString('en-IN')})`);

  // 10. Wishlist API (Add, List, Delete)
  const addWishRes = await fetch(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ product_id: testProd.product_id })
  });
  const addWishData = await addWishRes.json();
  assert(addWishData.items.some(i => i.product_id === testProd.product_id), 'Product not added to wishlist');

  const getWishRes = await fetch(`${BASE_URL}/wishlist`, {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const getWishData = await getWishRes.json();
  assert(getWishData.items.length > 0, 'Wishlist items empty');

  const delWishRes = await fetch(`${BASE_URL}/wishlist/${testProd.product_id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const delWishData = await delWishRes.json();
  assert(!delWishData.items.some(i => i.product_id === testProd.product_id), 'Product not removed from wishlist');
  console.log('✅ 10. Wishlist Endpoints Verified (Add, List, Remove)');

  // 11. Cart: Clear and Add Item
  await fetch(`${BASE_URL}/cart`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });

  const addCartRes = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ product_id: testProd.product_id, quantity: 2 })
  });
  const addCartData = await addCartRes.json();
  assert.strictEqual(addCartData.items.length, 1, 'Cart items count mismatch');
  console.log(`✅ 11. Add to Cart Passed (Added 2 units of ${testProd.name})`);

  // 12. Checkout & Atomic Stock Deduction
  const initialStock = testProd.stock;
  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      shipping_name: 'Pooja Sharma',
      shipping_address: 'Flat 402, Lotus Residency, 100 Feet Road, Indiranagar',
      shipping_city: 'Bengaluru',
      shipping_postal: '560038',
      payment_method: 'UPI (Google Pay / PhonePe)'
    })
  });
  const orderData = await orderRes.json();
  assert(orderData.order, 'Order placement failed');
  const createdOrderId = orderData.order.order_id;
  console.log(`✅ 12. Atomic Checkout Passed (Order #${createdOrderId} - Total: ₹${orderData.order.total_amount.toLocaleString('en-IN')})`);

  // 13. Verify Stock Deduction
  const updatedProdRes = await fetch(`${BASE_URL}/products/${testProd.product_id}`);
  const updatedProdData = await updatedProdRes.json();
  assert.strictEqual(updatedProdData.product.stock, initialStock - 2, 'Stock was not properly deducted!');
  console.log(`✅ 13. Stock Decrement Verified (Stock decreased from ${initialStock} to ${updatedProdData.product.stock})`);

  // 14. Admin KPI Stats
  const statsRes = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const statsData = await statsRes.json();
  assert(statsData.stats.totalRevenue > 0, 'Admin revenue missing');
  console.log(`✅ 14. Admin Analytics KPI Verified (Total Revenue: ₹${statsData.stats.totalRevenue.toLocaleString('en-IN')}, Orders: ${statsData.stats.totalOrders})`);

  // 15. BUYNEST AI Shopping Assistant: Brand and Budget Intent Test
  const aiChatRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Recommend earbuds under ₹2000' })
  });
  const aiChatData = await aiChatRes.json();
  assert(aiChatData.reply, 'AI reply missing');
  assert(aiChatData.recommendations.length > 0, 'AI recommendations missing');
  assert(aiChatData.recommendations.every(p => p.price <= 2000), 'AI recommended products exceeding ₹2000 budget!');
  console.log(`✅ 15. BUYNEST AI Shopping Assistant Passed (Recommended: ${aiChatData.recommendations.map(p => `${p.name} (₹${p.price.toLocaleString('en-IN')})`).join(', ')})`);

  console.log('\n🎉 ALL 15 AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runTests().catch(err => {
  console.error('\n❌ Verification test failed:', err);
  process.exit(1);
});

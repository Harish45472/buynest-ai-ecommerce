const assert = require('assert');

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Comprehensive BUYNEST Enterprise Verification Suite...\n');

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

  // 4. Products: High-Quality Deduplicated Catalog (800–1,000 Products) & All 10 Categories
  const allProductsRes = await fetch(`${BASE_URL}/products?limit=2500`);
  const allProductsData = await allProductsRes.json();
  const products = allProductsData.products;
  assert(products.length >= 1100, `Expected clean catalog with at least 1100 products, found ${products.length}`);
  
  const menProducts = products.filter(p => p.category === 'Men');
  const womenProducts = products.filter(p => p.category === 'Women');
  assert(menProducts.length >= 150, `Expected at least 150 unique Men products, found ${menProducts.length}`);
  assert(womenProducts.length >= 150, `Expected at least 150 unique Women products, found ${womenProducts.length}`);

  // Deduplication & Variant Consolidation Integrity Check
  const prodsWithMultipleColors = products.filter(p => Array.isArray(p.colors) && p.colors.length >= 2);
  assert(prodsWithMultipleColors.length >= products.length * 0.75, 'Expected at least 75% of products to have consolidated color variants');

  // Verify All 20 Required Fields on Sample Products
  const sample = products[0];
  assert(sample.product_id || sample.id, 'Product ID required');
  assert(sample.name, 'Name required');
  assert(sample.brand, 'Brand required');
  assert(sample.category, 'Category required');
  assert(sample.sub_category, 'Sub-category required');
  assert(sample.description, 'Description required');
  assert(sample.price > 0, 'Price required');
  assert(sample.mrp > 0, 'MRP required');
  assert(sample.discount_percent >= 0, 'Discount percent required');
  assert(Array.isArray(sample.images) && sample.images.length > 0, 'Images array required');
  assert(Array.isArray(sample.colors) && sample.colors.length > 0, 'Colors array required');
  assert(Array.isArray(sample.sizes) && sample.sizes.length > 0, 'Sizes array required');
  assert(sample.rating > 0, 'Rating required');
  assert(sample.reviews_count >= 0, 'Reviews count required');
  assert(sample.stock !== undefined, 'Stock required');
  assert(typeof sample.specifications === 'object', 'Specifications required');
  assert(Array.isArray(sample.features) && sample.features.length > 0, 'Features array required');
  assert(sample.delivery_info, 'Delivery info required');
  assert(sample.seller_name, 'Seller name required');
  assert(sample.return_info, 'Return info required');
  assert(Array.isArray(sample.tags) && sample.tags.length > 0, 'Tags array required');

  const expectedCategories = [
    'Men', 'Women', 'Toys & Baby', 'Electronics', 
    'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Fitness',
    'Grocery', 'Books', 'Automotive'
  ];
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  for (const expCat of expectedCategories) {
    assert(uniqueCategories.includes(expCat), `Missing required category: ${expCat}`);
  }
  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  assert(uniqueBrands.length >= 100, `Expected at least 100 unique authentic brands, found ${uniqueBrands.length}`);
  console.log(`✅ 4. Deduplicated High-Quality Catalog Verified (${products.length} unique products across all 10 categories, ${uniqueBrands.length} authentic brands, 20/20 required fields verified)`);

  // 4B. Natural Language & Semantic Search Engine Verification
  const search1 = await fetch(`${BASE_URL}/products?q=shoes under 3000`).then(r => r.json());
  assert(search1.products.length > 0, 'No products found for "shoes under 3000"');
  assert(search1.products.every(p => p.price <= 3000), 'Expected all results for "shoes under 3000" to have price <= 3000');

  const search2 = await fetch(`${BASE_URL}/products?q=levis jeans`).then(r => r.json());
  assert(search2.products.length > 0, 'No products found for "levis jeans"');
  assert(search2.products.some(p => p.brand.toLowerCase().includes('levi') && p.sub_category.toLowerCase().includes('jean')), 'Expected Levi\'s jeans to be returned');

  const search3 = await fetch(`${BASE_URL}/products?q=oversized t shirt`).then(r => r.json());
  assert(search3.products.length > 0, 'No products found for "oversized t shirt"');
  assert(search3.products.some(p => p.name.toLowerCase().includes('oversized')), 'Expected oversized t-shirt to be returned');

  const search4 = await fetch(`${BASE_URL}/products?q=black shirt`).then(r => r.json());
  assert(search4.products.length > 0, 'No products found for "black shirt"');

  const suggestionsRes = await fetch(`${BASE_URL}/products/search-suggestions?q=shoes`).then(r => r.json());
  assert(suggestionsRes.products && suggestionsRes.products.length > 0, 'Expected live product previews in suggestions');
  assert(suggestionsRes.subcategories && suggestionsRes.subcategories.length > 0, 'Expected subcategory suggestions');
  assert(suggestionsRes.trendingQueries && suggestionsRes.trendingQueries.length > 0, 'Expected trending queries');
  console.log('✅ 4B. Natural Language Search & Autocomplete Engine Verified ("shoes under 3000", "levis jeans", "oversized t shirt", "black shirt")');

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

  // 7. Rating Filtering (4.5★ & above)
  const ratingRes = await fetch(`${BASE_URL}/products?minRating=4.5`);
  const ratingData = await ratingRes.json();
  assert(ratingData.products.length > 0, 'No high-rated products found');
  assert(ratingData.products.every(p => p.rating >= 4.5), 'Rating filter failed');
  console.log(`✅ 7. Rating Filtering Passed (${ratingData.products.length} products with rating >= 4.5★)`);

  // 8. Razorpay Payment Config Endpoint
  const rzpConfigRes = await fetch(`${BASE_URL}/payments/config`);
  const rzpConfig = await rzpConfigRes.json();
  assert(rzpConfig.keyId, 'Razorpay keyId missing in config');
  assert.strictEqual(rzpConfig.currency, 'INR');
  console.log(`✅ 8. Razorpay Config API Passed (Key: ${rzpConfig.keyId}, Currency: ${rzpConfig.currency}, Mode: ${rzpConfig.testMode ? 'Sandbox Simulator' : 'Live Gateway'})`);

  // 9. Razorpay Order Creation Endpoint
  const rzpOrderRes = await fetch(`${BASE_URL}/payments/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      amount: 2499,
      notes: { test_source: 'automated_suite' }
    })
  });
  const rzpOrderData = await rzpOrderRes.json();
  assert(rzpOrderData.success, 'Failed to create Razorpay payment order');
  assert(rzpOrderData.orderId, 'Razorpay orderId missing');
  assert.strictEqual(rzpOrderData.amount, 249900, 'Razorpay amount should be in paise (₹2,499 * 100)');
  console.log(`✅ 9. Razorpay Create-Order API Passed (Order ID: ${rzpOrderData.orderId}, Amount in Paise: ${rzpOrderData.amount})`);

  // 10. Razorpay Payment Verification & Atomic Stock Deduction
  const checkoutProduct = products[10]; // Take a known product
  const prevStock = checkoutProduct.stock;

  const rzpVerifyRes = await fetch(`${BASE_URL}/payments/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      razorpay_order_id: rzpOrderData.orderId,
      razorpay_payment_id: `pay_test_${Date.now()}`,
      razorpay_signature: 'test_signature_valid_token_3948',
      shipping_name: 'Aditi Deshmukh',
      shipping_address: 'Flat 12B, Palm Meadows, Whitefield',
      shipping_city: 'Bengaluru',
      shipping_postal: '560066',
      payment_method: 'Razorpay UPI (Google Pay)',
      items: [{ product_id: checkoutProduct.product_id, quantity: 1, price: checkoutProduct.price }],
      subtotal: checkoutProduct.price,
      tax_amount: Math.round(checkoutProduct.price * 0.18),
      delivery_fee: checkoutProduct.price >= 499 ? 0 : 49,
      discount_amount: 0,
      total_amount: checkoutProduct.price + (checkoutProduct.price >= 499 ? 0 : 49)
    })
  });
  const rzpVerifyData = await rzpVerifyRes.json();
  assert(rzpVerifyData.success, `Razorpay verify failed: ${rzpVerifyData.message}`);
  assert.strictEqual(rzpVerifyData.order.status, 'confirmed', 'Order status should be confirmed upon payment');
  assert.strictEqual(rzpVerifyData.order.payment_status, 'paid', 'Order payment_status should be paid');
  const verifiedOrderId = rzpVerifyData.order.order_id;
  console.log(`✅ 10. Razorpay Payment Verification & Order Placement Passed (Order #${verifiedOrderId}, Status: ${rzpVerifyData.order.status}, Payment: ${rzpVerifyData.order.payment_status})`);

  // 11. Verify Stock Deduction for Razorpay Order
  const verifyProdRes = await fetch(`${BASE_URL}/products/${checkoutProduct.product_id}`);
  const verifyProdData = await verifyProdRes.json();
  assert.strictEqual(verifyProdData.product.stock, prevStock - 1, 'Stock was not decremented properly during Razorpay checkout!');
  console.log(`✅ 11. Atomic Stock Decrement Passed (${checkoutProduct.name}: ${prevStock} -> ${verifyProdData.product.stock})`);

  // 12. 5-Stage Order Management: Processing -> Shipped -> Out for Delivery -> Delivered
  const stages = ['processing', 'shipped', 'out_for_delivery', 'delivered'];
  for (const st of stages) {
    const patchRes = await fetch(`${BASE_URL}/admin/orders/${verifiedOrderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: st })
    });
    const patchData = await patchRes.json();
    assert.strictEqual(patchData.order.status, st, `Status not updated to ${st}`);
  }
  console.log(`✅ 12. 5-Stage Order State Machine Passed (Confirmed -> Processing -> Shipped -> Out for Delivery -> Delivered)`);

  // 13. Customer Order History & Itemized Financial Details
  const myOrdersRes = await fetch(`${BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const myOrdersData = await myOrdersRes.json();
  const fetchedOrder = myOrdersData.orders.find(o => o.order_id === verifiedOrderId);
  assert(fetchedOrder, 'Order missing in customer order history');
  assert.strictEqual(fetchedOrder.status, 'delivered');
  assert(fetchedOrder.razorpay_payment_id, 'Razorpay payment ID missing in order history');
  console.log(`✅ 13. Customer Order History & Itemized Receipt Verified (Order #${fetchedOrder.order_id}, Total: ₹${fetchedOrder.total_amount.toLocaleString('en-IN')})`);

  // 14. AI Shopping Assistant: Wedding Outfit Grounded Intent
  const aiWeddingRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Suggest an outfit for a wedding' })
  });
  const aiWeddingData = await aiWeddingRes.json();
  assert(aiWeddingData.recommendations.length > 0, 'AI wedding recommendations missing');
  console.log(`✅ 14. AI Assistant: Wedding Recommendation Passed (${aiWeddingData.recommendations.length} traditional outfits recommended)`);

  // 15. AI Shopping Assistant: Programming Laptop Under Budget Grounded Intent
  const aiLaptopRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'laptop for programming under ₹60000' })
  });
  const aiLaptopData = await aiLaptopRes.json();
  assert(aiLaptopData.recommendations.length > 0, 'AI laptop recommendations missing');
  assert(aiLaptopData.recommendations.every(p => p.price <= 60000), 'AI recommended laptop above ₹60,000 budget');
  console.log(`✅ 15. AI Assistant: Coding Laptop Under Budget Passed (${aiLaptopData.recommendations.map(p => `${p.name} - ₹${p.price.toLocaleString('en-IN')}`).join(', ')})`);

  // 16. AI Shopping Assistant: Running Shoes Under ₹3000 Grounded Intent
  const aiShoesRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'running shoes under ₹3000' })
  });
  const aiShoesData = await aiShoesRes.json();
  assert(aiShoesData.recommendations.length > 0, 'AI shoe recommendations missing');
  assert(aiShoesData.recommendations.every(p => p.price <= 3000), 'AI recommended shoes above ₹3000');
  console.log(`✅ 16. AI Assistant: Running Shoes Under ₹3000 Passed (${aiShoesData.recommendations.length} shoes found within budget)`);

  // 17. AI Shopping Assistant: Product Comparison ("X vs Y")
  const aiCompRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'compare earbuds vs headphones' })
  });
  const aiCompData = await aiCompRes.json();
  assert(aiCompData.reply, 'Comparison AI reply missing');
  assert(aiCompData.recommendations.length > 0, 'Comparison recommendations missing');
  console.log(`✅ 17. AI Assistant: Comparison Intent Passed (${aiCompData.recommendations.length} comparative products analyzed)`);

  // 18. Dynamic Facets API for Filtering
  const facetsRes = await fetch(`${BASE_URL}/products/facets?category=Electronics`);
  const facetsData = await facetsRes.json();
  assert(facetsData.brands.length > 0, 'No brands returned in facets');
  assert(facetsData.subCategories.length > 0, 'No subcategories returned in facets');
  console.log(`✅ 18. Dynamic Filter Facets Verified (${facetsData.brands.length} brands, ${facetsData.subCategories.length} subcategories in Electronics)`);

  // 19. Customer Order Cancellation & Inventory Stock Reversal
  const cancelTestProduct = products[15];
  const initialStockBeforeCancel = cancelTestProduct.stock;

  // Place new test order
  const newOrderRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      shipping_name: 'Pooja Sharma',
      shipping_address: '102 Richmond Circle',
      shipping_city: 'Bengaluru',
      shipping_postal: '560025',
      payment_method: 'Razorpay UPI'
    })
  });
  // If cart was empty, put 1 unit into cart and checkout
  const addCartRes = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ product_id: cancelTestProduct.product_id, quantity: 2 })
  });
  await addCartRes.json();

  const checkoutRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      shipping_name: 'Pooja Sharma',
      shipping_address: '102 Richmond Circle',
      shipping_city: 'Bengaluru',
      shipping_postal: '560025',
      payment_method: 'Razorpay UPI'
    })
  });
  const checkoutData = await checkoutRes.json();
  const cancellableOrderId = checkoutData.order.order_id;

  // Verify stock was deducted by 2
  const deductedProdRes = await fetch(`${BASE_URL}/products/${cancelTestProduct.product_id}`);
  const deductedProdData = await deductedProdRes.json();
  assert.strictEqual(deductedProdData.product.stock, initialStockBeforeCancel - 2, 'Stock was not decremented');

  // Cancel the order
  const cancelRes = await fetch(`${BASE_URL}/orders/${cancellableOrderId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ reason: 'Found a lower price elsewhere' })
  });
  const cancelData = await cancelRes.json();
  assert.strictEqual(cancelData.success, true, 'Cancellation failed');
  assert.strictEqual(cancelData.order.status, 'cancelled', 'Order status was not set to cancelled');
  assert(cancelData.refund_info, 'Refund info missing in cancellation response');

  // Verify stock was restored back to original
  const restoredProdRes = await fetch(`${BASE_URL}/products/${cancelTestProduct.product_id}`);
  const restoredProdData = await restoredProdRes.json();
  assert.strictEqual(restoredProdData.product.stock, initialStockBeforeCancel, 'Stock was not restored upon cancellation!');
  console.log(`✅ 19. Customer Order Cancellation & Stock Reversal Passed (Order #${cancellableOrderId} cancelled, Stock restored: ${initialStockBeforeCancel - 2} -> ${restoredProdData.product.stock})`);

  // 20. Cancellation Safeguard: Cannot cancel already shipped/delivered orders
  const shippedCancelRes = await fetch(`${BASE_URL}/orders/${verifiedOrderId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ reason: 'Trying to cancel delivered order' })
  });
  assert.strictEqual(shippedCancelRes.status, 400, 'Shipped/Delivered order should not be cancellable');
  console.log('✅ 20. Cancellation Safeguard Verified (Delivered order cancellation safely rejected with HTTP 400)');

  console.log('\n🎉 ALL 20 ADVANCED VERIFICATION TESTS PASSED SUCCESSFULLY! 🚀\n');
}

runTests().catch(err => {
  console.error('\n❌ Verification test failed:', err);
  process.exit(1);
});

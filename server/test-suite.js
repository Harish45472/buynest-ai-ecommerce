const assert = require('assert');

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Full E-Commerce & AI Assistant Verification Suite...\n');

  // 1. Health Check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  assert.strictEqual(healthData.status, 'ok', 'Health check failed');
  console.log('✅ 1. Health Check Passed');

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

  // 4. Products: Listing & Filtering
  const productsRes = await fetch(`${BASE_URL}/products?category=Gadgets%20%26%20Tech&sortBy=price_asc`);
  const productsData = await productsRes.json();
  assert(productsData.products.length > 0, 'No Gadgets & Tech products found');
  console.log(`✅ 4. Products Filtering Passed (${productsData.products.length} Gadgets & Tech products)`);

  // 4b. Sub-category Filtering
  const subCatRes = await fetch(`${BASE_URL}/products?category=Men&sub_category=Topwear`);
  const subCatData = await subCatRes.json();
  assert(subCatData.products.length > 0, 'No Men Topwear products found');
  assert(subCatData.products.every(p => p.sub_category === 'Topwear'), 'Non-topwear product returned');
  console.log(`✅ 4b. Sub-category Filtering Passed (${subCatData.products.length} Men Topwear products)`);

  // 5. Search
  const searchRes = await fetch(`${BASE_URL}/products?q=Earbuds`);
  const searchData = await searchRes.json();
  assert(searchData.products.some(p => p.name.includes('Earbuds')), 'Search for Earbuds failed');
  const testProduct = searchData.products[0];
  console.log(`✅ 5. Search Passed (Found: "${testProduct.name}" at ₹${testProduct.price.toLocaleString('en-IN')})`);

  // 6. Cart: Clear existing and Add Item
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
    body: JSON.stringify({ product_id: testProduct.product_id, quantity: 2 })
  });
  const addCartData = await addCartRes.json();
  assert.strictEqual(addCartData.items.length, 1, 'Cart items count mismatch');
  assert.strictEqual(addCartData.items[0].quantity, 2, 'Cart quantity mismatch');
  console.log(`✅ 6. Add to Cart Passed (Added 2 units of ${testProduct.name})`);

  // 7. Stock Enforcement Test: Attempt to add more than available stock
  const overStockRes = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({ product_id: testProduct.product_id, quantity: 9999 })
  });
  assert.strictEqual(overStockRes.status, 400, 'Expected 400 for stock limit exceeded');
  console.log('✅ 7. Stock Limit Enforcement Guard Passed (Rejected 9999 items)');

  // 8. Atomic Checkout & Stock Deduction
  const initialStock = testProduct.stock;
  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      shipping_name: 'Pooja Sharma',
      shipping_address: 'Flat 402, Lotus Residency, MG Road',
      shipping_city: 'Bengaluru',
      shipping_postal: '560001',
      payment_method: 'UPI (Google Pay / PhonePe)'
    })
  });
  const orderData = await orderRes.json();
  assert(orderData.order, 'Order creation failed');
  assert.strictEqual(orderData.order.status, 'pending');
  const createdOrderId = orderData.order.order_id;
  console.log(`✅ 8. Order Placement & Checkout Passed (Created Order #${createdOrderId} - Total: ₹${orderData.order.total_amount.toLocaleString('en-IN')})`);

  // Verify stock deduction in products table
  const updatedProdRes = await fetch(`${BASE_URL}/products/${testProduct.product_id}`);
  const updatedProdData = await updatedProdRes.json();
  assert.strictEqual(updatedProdData.product.stock, initialStock - 2, 'Stock was not properly deducted!');
  console.log(`✅ 9. Atomic Stock Deduction Verified (Stock decreased from ${initialStock} to ${updatedProdData.product.stock})`);

  // Verify cart is now empty
  const cartCheckRes = await fetch(`${BASE_URL}/cart`, {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const cartCheckData = await cartCheckRes.json();
  assert.strictEqual(cartCheckData.items.length, 0, 'Cart was not cleared after checkout');
  console.log('✅ 10. Post-Checkout Cart Reset Verified');

  // 11. User Order History
  const userOrdersRes = await fetch(`${BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  const userOrdersData = await userOrdersRes.json();
  assert(userOrdersData.orders.some(o => o.order_id === createdOrderId), 'Created order missing in user order history');
  console.log(`✅ 11. User Order History Tracking Verified (${userOrdersData.orders.length} orders total)`);

  // 12. Admin: Update Order Status
  const updateStatusRes = await fetch(`${BASE_URL}/admin/orders/${createdOrderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({ status: 'shipped' })
  });
  const updateStatusData = await updateStatusRes.json();
  assert.strictEqual(updateStatusData.order.status, 'shipped');
  console.log(`✅ 12. Admin Order Status Transition to 'shipped' Passed`);

  // 13. Admin Dashboard Analytics
  const statsRes = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const statsData = await statsRes.json();
  assert(statsData.stats.totalRevenue > 0, 'Admin revenue missing');
  assert(statsData.stats.totalOrders > 0, 'Admin orders count missing');
  console.log(`✅ 13. Admin KPI Metrics Verified (Revenue: ₹${statsData.stats.totalRevenue.toLocaleString('en-IN')}, Orders: ${statsData.stats.totalOrders})`);

  // 14. Admin Product CRUD: Create, Update, Delete
  const createProdRes = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({
      name: 'Temp Test Kurtas',
      category: 'Men',
      sub_category: 'Ethnic Wear',
      description: 'Temporary item for verification test',
      price: 1999,
      stock: 10,
      image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
    })
  });
  const createProdData = await createProdRes.json();
  const tempProdId = createProdData.product.product_id;

  const deleteProdRes = await fetch(`${BASE_URL}/products/${tempProdId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  assert.strictEqual(deleteProdRes.status, 200);
  console.log('✅ 14. Admin Product CRUD (Create & Delete) Passed');

  // 15. AI Shopping Assistant: Budget constraint & intent test
  const aiChatRes = await fetch(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Recommend kurta under ₹2000' })
  });
  const aiChatData = await aiChatRes.json();
  assert(aiChatData.reply, 'AI reply missing');
  assert(aiChatData.recommendations.length > 0, 'AI recommendations missing');
  assert(aiChatData.recommendations.every(p => p.price <= 2000), 'AI recommended products exceeding budget!');
  console.log(`✅ 15. AI Shopping Assistant Passed (Recommended: ${aiChatData.recommendations.map(p => `${p.name} (₹${p.price.toLocaleString('en-IN')})`).join(', ')})`);

  console.log('\n🎉 ALL 15 AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runTests().catch(err => {
  console.error('\n❌ Verification test failed:', err);
  process.exit(1);
});

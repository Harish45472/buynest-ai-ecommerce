const bcrypt = require('bcryptjs');
const db = require('./database');
const { buildFullCatalog } = require('./catalogData');

async function seed() {
  console.log('🌱 Starting BUYNEST database seeding with 200+ realistic product catalog...');
  await db.init();

  // 1. Clear existing records for a fresh slate
  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM cart;
    DELETE FROM wishlist;
    DELETE FROM products;
    DELETE FROM categories;
    DELETE FROM users;
  `);

  // 2. Create Users
  const passwordAdmin = await bcrypt.hash('admin123', 10);
  const passwordUser = await bcrypt.hash('user123', 10);

  const insertUser = db.prepare(`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `);

  insertUser.run('BUYNEST Admin', 'admin@ecommerce.com', passwordAdmin, 'admin');
  insertUser.run('Pooja Sharma (Customer)', 'user@ecommerce.com', passwordUser, 'user');

  console.log('✅ Created demo users: admin@ecommerce.com / user@ecommerce.com');

  // 3. Create Categories strictly matching the 7 user requested categories
  const categories = [
    { name: 'Men', description: 'T-shirts, Shirts, Jeans, Trousers, Jackets, Shoes, Watches, Wallets, Bags, Sunglasses', slug: 'men' },
    { name: 'Women', description: 'Dresses, Tops, Kurtis, Sarees, Jeans, Trousers, Handbags, Shoes, Watches, Jewellery, Sunglasses', slug: 'women' },
    { name: 'Electronics', description: 'Smartphones, Laptops, Headphones, Earbuds, Smartwatches, Tablets, Speakers, Power banks, Chargers, Cameras', slug: 'electronics' },
    { name: 'Home & Kitchen', description: 'Furniture, Bedsheets, Curtains, Kitchen appliances, Cookware, Storage products, Home decor, Lighting', slug: 'home-kitchen' },
    { name: 'Beauty & Personal Care', description: 'Skincare, Makeup, Perfumes, Hair care, Grooming products', slug: 'beauty-personal-care' },
    { name: 'Sports & Fitness', description: 'Sports shoes, T-shirts, Track pants, Gym equipment, Fitness accessories, Cricket products, Football products', slug: 'sports-fitness' },
    { name: 'Kids', description: 'Boys clothing, Girls clothing, Kids shoes, Toys, School accessories', slug: 'kids' }
  ];

  const insertCategory = db.prepare(`
    INSERT INTO categories (name, description, slug)
    VALUES (?, ?, ?)
  `);

  for (const cat of categories) {
    insertCategory.run(cat.name, cat.description, cat.slug);
  }
  console.log(`✅ Seeded ${categories.length} core categories`);

  // 4. Build and Insert 200+ Products from catalogData
  const fullCatalog = buildFullCatalog();
  console.log(`📦 Inserting ${fullCatalog.length} realistic products across all 7 categories...`);

  const insertProduct = db.prepare(`
    INSERT INTO products (
      name, brand, category, sub_category, description,
      price, mrp, discount_percent, stock, image_url,
      images, sizes, colors, rating, reviews_count,
      seller_name, specifications, tags, gender, featured, is_popular
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of fullCatalog) {
    insertProduct.run(
      p.name,
      p.brand || 'BUYNEST Select',
      p.category,
      p.sub_category || 'General',
      p.description,
      p.price,
      p.mrp || Math.round(p.price * 1.5),
      p.discount_percent || 30,
      p.stock || 25,
      p.image_url,
      JSON.stringify(p.images || [p.image_url]),
      JSON.stringify(p.sizes || ['Standard']),
      JSON.stringify(p.colors || ['Default']),
      p.rating || 4.3,
      p.reviews_count || 150,
      p.seller_name || 'BUYNEST Retail',
      JSON.stringify(p.specifications || {}),
      JSON.stringify(p.tags || []),
      p.gender || 'Unisex',
      p.is_featured ? 1 : 0,
      p.is_popular ? 1 : 0
    );
  }
  console.log(`✅ Successfully inserted ${fullCatalog.length} products into BUYNEST database!`);

  // 5. Seed sample order for demo customer
  const sampleProduct = db.prepare('SELECT * FROM products WHERE category = ? LIMIT 2').all('Electronics');
  if (sampleProduct.length > 0) {
    const insertOrder = db.prepare(`
      INSERT INTO orders (user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_postal, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const totalAmount = sampleProduct.reduce((acc, curr) => acc + curr.price, 0);
    const orderRes = insertOrder.run(
      2, // user_id of Pooja Sharma
      totalAmount,
      'processing',
      'Pooja Sharma',
      'Flat 402, Lotus Residency, 100 Feet Road, Indiranagar',
      'Bengaluru',
      '560038',
      'UPI (Google Pay / PhonePe)'
    );

    const orderId = orderRes.lastInsertRowid;
    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    for (const item of sampleProduct) {
      insertOrderItem.run(orderId, item.product_id, 1, item.price);
    }
    console.log(`✅ Seeded sample order #${orderId} with 2 items for Pooja Sharma (₹${totalAmount.toLocaleString('en-IN')})`);
  }

  // 6. Seed sample wishlist item for demo customer
  const wishlistProduct = db.prepare('SELECT product_id FROM products LIMIT 3').all();
  const insertWishlist = db.prepare(`
    INSERT INTO wishlist (user_id, product_id)
    VALUES (?, ?)
  `);
  for (const wp of wishlistProduct) {
    insertWishlist.run(2, wp.product_id);
  }
  console.log(`✅ Seeded 3 sample wishlist items for demo user`);

  console.log('🎉 BUYNEST Database Seeding Completed Successfully! 🎉');
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = seed;

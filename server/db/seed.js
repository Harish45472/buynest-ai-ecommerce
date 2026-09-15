const bcrypt = require('bcryptjs');
const db = require('./database');

async function seed() {
  console.log('🌱 Starting database seeding...');
  await db.init();

  // 1. Clear existing records for a clean slate
  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM cart;
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

  insertUser.run('Store Admin', 'admin@ecommerce.com', passwordAdmin, 'admin');
  insertUser.run('Jane Doe (Customer)', 'user@ecommerce.com', passwordUser, 'user');

  console.log('✅ Created users: admin@ecommerce.com / user@ecommerce.com');

  // 3. Create Categories
  const categories = [
    { name: 'Electronics', description: 'Cutting-edge gadgets, computing devices, and premium audio', slug: 'electronics' },
    { name: 'Fashion', description: 'Trendy and timeless apparel, footwear, and designer wear', slug: 'fashion' },
    { name: 'Home & Living', description: 'Modern home decor, kitchen appliances, and smart essentials', slug: 'home-living' },
    { name: 'Sports & Fitness', description: 'High-performance athletic gear, workout accessories, and trackers', slug: 'sports-fitness' },
    { name: 'Accessories', description: 'Stylish watches, bags, sunglasses, and daily carry items', slug: 'accessories' }
  ];

  const insertCategory = db.prepare(`
    INSERT INTO categories (name, description, slug)
    VALUES (?, ?, ?)
  `);

  for (const cat of categories) {
    insertCategory.run(cat.name, cat.description, cat.slug);
  }
  console.log(`✅ Seeded ${categories.length} categories`);

  // 4. Create Products
  const products = [
    {
      name: 'AeroSound Pro Wireless Headphones',
      category: 'Electronics',
      description: 'Active noise cancellation headphones with 40-hour battery life, spatial audio, plush memory foam earcups, and ultra-low latency Bluetooth 5.3 connectivity.',
      price: 199.99,
      stock: 35,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      rating: 4.8,
      reviews_count: 142,
      featured: 1
    },
    {
      name: 'QuantumBook 15 Pro Laptop',
      category: 'Electronics',
      description: 'Ultra-thin 15.6-inch laptop with 16-Core processor, 32GB RAM, 1TB NVMe SSD, 120Hz OLED display, and all-day 14-hour battery for programming and creative workflows.',
      price: 1299.99,
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      rating: 4.9,
      reviews_count: 89,
      featured: 1
    },
    {
      name: 'PulseTrack GPS Smartwatch',
      category: 'Electronics',
      description: 'Waterproof fitness smartwatch with 24/7 heart-rate monitoring, blood oxygen sensor, onboard GPS, sleep analytics, and 7-day battery life.',
      price: 149.50,
      stock: 24,
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      rating: 4.6,
      reviews_count: 118,
      featured: 1
    },
    {
      name: 'UltraVision 4K Action Camera',
      category: 'Electronics',
      description: 'Rugged waterproof 4K/60fps action camera with dual color screens, hyper-smooth image stabilization, voice control, and accessories kit.',
      price: 249.00,
      stock: 15,
      image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
      rating: 4.7,
      reviews_count: 64,
      featured: 0
    },
    {
      name: 'Luxe Merino Wool Overcoat',
      category: 'Fashion',
      description: 'Handcrafted tailored wool overcoat featuring Italian horn buttons, notch lapels, interior silk lining, and weather-resistant treated weave.',
      price: 289.00,
      stock: 8,
      image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce667823?w=800&q=80',
      rating: 4.7,
      reviews_count: 45,
      featured: 1
    },
    {
      name: 'Classic Organic Cotton Crewneck',
      category: 'Fashion',
      description: 'Heavyweight 100% GOTS certified organic cotton sweater with ribbed cuffs and relaxed everyday comfort fit.',
      price: 59.99,
      stock: 45,
      image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      rating: 4.5,
      reviews_count: 76,
      featured: 0
    },
    {
      name: 'Apex Athletic Running Shoes',
      category: 'Fashion',
      description: 'Featherlight breathable mesh running shoes with responsive nitrogen-infused foam midsole and carbon rubber outsole for maximum grip.',
      price: 129.99,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      rating: 4.8,
      reviews_count: 210,
      featured: 1
    },
    {
      name: 'Artisan Pour-Over Coffee Maker',
      category: 'Home & Living',
      description: 'Borosilicate heat-resistant glass carafe with laser-etched stainless steel reusable micro-mesh filter and natural wood collar with leather tie.',
      price: 45.00,
      stock: 28,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      rating: 4.9,
      reviews_count: 130,
      featured: 1
    },
    {
      name: 'AromaTherapy Smart Ultrasonic Diffuser',
      category: 'Home & Living',
      description: 'Minimalist ambient essential oil diffuser with ambient warm LED light, whisper-quiet operation, auto-off timer, and smart app schedule control.',
      price: 39.99,
      stock: 18,
      image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
      rating: 4.4,
      reviews_count: 52,
      featured: 0
    },
    {
      name: 'Nordic Ceramic Dining Table Set (4pc)',
      category: 'Home & Living',
      description: 'Hand-glazed matte ceramic dinnerware set including dinner plates, salad bowls, and matching mugs designed with Scandinavian minimalism.',
      price: 89.90,
      stock: 3, // Low stock test!
      image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      rating: 4.6,
      reviews_count: 38,
      featured: 0
    },
    {
      name: 'ProGrip Adjustable Dumbbell Set (50lbs)',
      category: 'Sports & Fitness',
      description: 'Rapid-dial weight adjustment from 5 to 50 lbs in 5 lb increments with ergonomic textured steel handles and heavy-duty storage base.',
      price: 299.00,
      stock: 6,
      image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      rating: 4.9,
      reviews_count: 164,
      featured: 1
    },
    {
      name: 'EcoFlex Natural Cork Yoga Mat',
      category: 'Sports & Fitness',
      description: 'Non-slip eco-friendly organic cork top with natural rubber backing, anti-microbial surface, body alignment lines, and carry strap included.',
      price: 68.00,
      stock: 22,
      image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      rating: 4.7,
      reviews_count: 83,
      featured: 0
    },
    {
      name: 'Thermal HydroFlow Insulated Flask (32oz)',
      category: 'Sports & Fitness',
      description: 'Double-wall vacuum insulated stainless steel water bottle keeping beverages ice-cold for 24 hours or piping hot for 12 hours. Leak-proof chug cap.',
      price: 34.50,
      stock: 40,
      image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
      rating: 4.8,
      reviews_count: 95,
      featured: 0
    },
    {
      name: 'Heritage Full-Grain Leather Backpack',
      category: 'Accessories',
      description: 'Handcrafted premium vegetable-tanned leather backpack with dedicated padded 16-inch laptop compartment, brass hardware, and luggage strap.',
      price: 185.00,
      stock: 9,
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      rating: 4.8,
      reviews_count: 112,
      featured: 1
    },
    {
      name: 'Aviator Titanium Polarized Sunglasses',
      category: 'Accessories',
      description: 'Ultralight grade-5 titanium frame with UV400 anti-glare polarized lenses, scratch-resistant coating, and leather protective case.',
      price: 115.00,
      stock: 14,
      image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      rating: 4.6,
      reviews_count: 67,
      featured: 0
    },
    {
      name: 'Chronograph Minimalist Sapphire Watch',
      category: 'Accessories',
      description: 'Sleek 40mm stainless steel case with scratch-proof sapphire crystal, Japanese quartz movement, genuine Italian leather band, and 50m water resistance.',
      price: 159.00,
      stock: 11,
      image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      rating: 4.7,
      reviews_count: 94,
      featured: 1
    }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (name, category, description, price, stock, image_url, rating, reviews_count, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const prod of products) {
    insertProduct.run(
      prod.name,
      prod.category,
      prod.description,
      prod.price,
      prod.stock,
      prod.image_url,
      prod.rating,
      prod.reviews_count,
      prod.featured
    );
  }
  console.log(`✅ Seeded ${products.length} products`);

  // 5. Seed a sample order for user@ecommerce.com so order history has immediate data to preview
  const user = db.prepare('SELECT user_id FROM users WHERE email = ?').get('user@ecommerce.com');
  const sampleProduct1 = db.prepare('SELECT * FROM products WHERE name LIKE ?').get('%AeroSound%');
  const sampleProduct2 = db.prepare('SELECT * FROM products WHERE name LIKE ?').get('%HydroFlow%');

  if (user && sampleProduct1 && sampleProduct2) {
    const total = sampleProduct1.price * 1 + sampleProduct2.price * 2;
    const orderRes = db.prepare(`
      INSERT INTO orders (user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_postal, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      user.user_id,
      total,
      'processing',
      'Jane Doe',
      '742 Evergreen Terrace',
      'Springfield',
      '97477',
      'Credit Card (Demo)'
    );

    const orderId = orderRes.lastInsertRowid;
    db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?), (?, ?, ?, ?)
    `).run(
      orderId, sampleProduct1.product_id, 1, sampleProduct1.price,
      orderId, sampleProduct2.product_id, 2, sampleProduct2.price
    );

    console.log(`✅ Seeded sample order #${orderId} with 2 items for user@ecommerce.com`);
  }

  console.log('🎉 Database seeding finished successfully!');
}

if (require.main === module) {
  seed().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}

module.exports = seed;

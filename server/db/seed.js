const bcrypt = require('bcryptjs');
const db = require('./database');

async function seed() {
  console.log('🌱 Starting database seeding with realistic Indian e-commerce catalog...');
  await db.init();

  // 1. Clear existing records for a fresh slate
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
  insertUser.run('Pooja Sharma (Customer)', 'user@ecommerce.com', passwordUser, 'user');

  console.log('✅ Created users: admin@ecommerce.com / user@ecommerce.com');

  // 3. Create Categories (matching Myntra-style department hierarchy)
  const categories = [
    { name: 'Men', description: 'Topwear, Bottomwear, Footwear, Ethnic Wear, and Accessories', slug: 'men' },
    { name: 'Women', description: 'Kurtas & Ethnic Wear, Western Dresses, Footwear, and Handbags', slug: 'women' },
    { name: 'Kids', description: 'Boys & Girls Clothing, Footwear, Toys, and Essentials', slug: 'kids' },
    { name: 'Home & Living', description: 'Kitchenware, Decor, Ambient Diffusers, and Bedding', slug: 'home-living' },
    { name: 'Beauty & Grooming', description: 'Skincare, Fragrances, Haircare, and Personal Grooming', slug: 'beauty' },
    { name: 'Gadgets & Tech', description: 'Smartwatches, TWS Earbuds, ANC Headphones, and Audio', slug: 'gadgets' }
  ];

  const insertCategory = db.prepare(`
    INSERT INTO categories (name, description, slug)
    VALUES (?, ?, ?)
  `);

  for (const cat of categories) {
    insertCategory.run(cat.name, cat.description, cat.slug);
  }
  console.log(`✅ Seeded ${categories.length} department categories`);

  // 4. Create 36+ Realistic Products with INR (₹) Pricing
  const products = [
    // --- MEN ---
    {
      name: 'UrbanClassic Pure Cotton Slim Fit Shirt',
      category: 'Men',
      sub_category: 'Topwear',
      description: '100% combed cotton breathable button-down shirt with mandarin collar, tailored cuffs, and pre-shrunk soft enzyme wash.',
      price: 1299,
      stock: 40,
      image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      rating: 4.6,
      reviews_count: 320,
      featured: 1
    },
    {
      name: 'Festive Lucknowi Chikankari Kurta Set',
      category: 'Men',
      sub_category: 'Indian & Festive Wear',
      description: 'Handcrafted authentic Lucknowi Chikan embroidered long kurta with matching cotton churidar pyjama. Perfect for weddings, Diwali, and festive occasions.',
      price: 2499,
      stock: 18,
      image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
      rating: 4.8,
      reviews_count: 145,
      featured: 1
    },
    {
      name: 'AeroFlex Stretchable Denim Jeans',
      category: 'Men',
      sub_category: 'Bottomwear',
      description: 'Mid-rise dark indigo stretch denim jeans with 5-pocket styling, contrast stitching, and ultra-flexible shape retention.',
      price: 1899,
      stock: 35,
      image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      rating: 4.5,
      reviews_count: 210,
      featured: 0
    },
    {
      name: 'StreetVibe Chunky Casual Sneakers',
      category: 'Men',
      sub_category: 'Footwear',
      description: 'High-traction lightweight retro sneakers featuring cushioned memory foam insoles, breathable perforated mesh, and durable TPR grip outsole.',
      price: 2299,
      stock: 22,
      image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      rating: 4.7,
      reviews_count: 189,
      featured: 1
    },
    {
      name: 'Royal Heritage Textured Nehru Jacket',
      category: 'Men',
      sub_category: 'Indian & Festive Wear',
      description: 'Jacquard woven ethnic sleeveless bandhgala jacket with brass buttons and dual welt pockets. Elevates any kurta or formal shirt.',
      price: 1999,
      stock: 14,
      image_url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
      rating: 4.7,
      reviews_count: 98,
      featured: 0
    },
    {
      name: 'Chronos Classic Leather Quartz Watch',
      category: 'Men',
      sub_category: 'Fashion Accessories',
      description: '42mm polished stainless steel bezel with Roman numeral dial, date window, genuine tan leather strap, and 30m water resistance.',
      price: 2999,
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      rating: 4.8,
      reviews_count: 112,
      featured: 1
    },

    // --- WOMEN ---
    {
      name: 'Anarkali Embroidered Kurta with Dupatta',
      category: 'Women',
      sub_category: 'Ethnic Wear',
      description: 'Floor-length georgette Anarkali suit set with intricate Zari and sequin work, scalloped border organza dupatta, and matching santoon trousers.',
      price: 3499,
      stock: 16,
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
      rating: 4.9,
      reviews_count: 245,
      featured: 1
    },
    {
      name: 'Floral Bohemian Tiered Maxi Dress',
      category: 'Women',
      sub_category: 'Western Wear',
      description: 'Breezy chiffon floral printed tiered maxi dress with V-neckline, bishop sleeves, and elasticated waist sash for all-day brunch styling.',
      price: 1699,
      stock: 28,
      image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      rating: 4.6,
      reviews_count: 178,
      featured: 1
    },
    {
      name: 'Banarasi Silk Woven Zari Saree',
      category: 'Women',
      sub_category: 'Ethnic Wear',
      description: 'Rich lustrous Banarasi art silk saree embellished with golden floral bootis, broad Pallu border, and matching unstitched blouse piece.',
      price: 4299,
      stock: 8,
      image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
      rating: 4.9,
      reviews_count: 130,
      featured: 1
    },
    {
      name: 'Couture Quilted Vegan Leather Tote Bag',
      category: 'Women',
      sub_category: 'Handbags & Accessories',
      description: 'Spacious structured tote with diamond quilting, gold-tone chain straps, multi-pocket organizational compartments, and secure zipper closure.',
      price: 1899,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      rating: 4.7,
      reviews_count: 94,
      featured: 0
    },
    {
      name: 'Comfort Cushion Block Heel Sandals',
      category: 'Women',
      sub_category: 'Footwear',
      description: '2.5-inch block heel open-toe sandals with extra padded insole support, non-slip base, and ankle buckle strap.',
      price: 1499,
      stock: 25,
      image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      rating: 4.5,
      reviews_count: 86,
      featured: 0
    },
    {
      name: 'High-Rise Sculpting Skinny Jeggings',
      category: 'Women',
      sub_category: 'Western Wear',
      description: '4-way super stretch cotton-elastane jeggings with contouring waistband, faux fly, and back patch pockets.',
      price: 999,
      stock: 50,
      image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      rating: 4.4,
      reviews_count: 220,
      featured: 0
    },

    // --- GADGETS & TECH ---
    {
      name: 'AeroSound Pro Wireless ANC Headphones',
      category: 'Gadgets & Tech',
      sub_category: 'Audio & Headphones',
      description: 'Hybrid Active Noise Cancellation (-40dB) with 40mm titanium dynamic drivers, 60-hour playtime, dual-device pairing, and fast Type-C charging.',
      price: 4999,
      stock: 30,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      rating: 4.8,
      reviews_count: 420,
      featured: 1
    },
    {
      name: 'PulseTrack 1.96" AMOLED Calling Smartwatch',
      category: 'Gadgets & Tech',
      sub_category: 'Smart Wearables',
      description: 'High-resolution curved AMOLED screen with Always-On display, Bluetooth calling with noise reduction mic, SpO2 & heart rate tracking, and 7-day battery.',
      price: 2499,
      stock: 45,
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      rating: 4.7,
      reviews_count: 512,
      featured: 1
    },
    {
      name: 'BassPods True Wireless Earbuds (TWS)',
      category: 'Gadgets & Tech',
      sub_category: 'Audio & Headphones',
      description: '13mm deep bass drivers with 40-hour total playback case, 45ms ultra-low latency gaming mode, IPX5 sweat resistance, and instant touch controls.',
      price: 1499,
      stock: 60,
      image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      rating: 4.6,
      reviews_count: 380,
      featured: 1
    },
    {
      name: 'QuantumBook 15.6" Thin & Light Laptop',
      category: 'Gadgets & Tech',
      sub_category: 'Computers & Laptops',
      description: 'Next-Gen 12-Core processor, 16GB DDR5 RAM, 512GB NVMe SSD, FHD anti-glare IPS display, backlit keyboard, and rapid 65W fast charger.',
      price: 54999,
      stock: 10,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      rating: 4.9,
      reviews_count: 92,
      featured: 1
    },
    {
      name: 'SoundBoom 20W Rugged Bluetooth Speaker',
      category: 'Gadgets & Tech',
      sub_category: 'Audio & Headphones',
      description: '360-degree immersive stereo sound with dual passive radiators, RGB beat-sync lights, IPX7 waterproof rating, and 15-hour battery bank.',
      price: 1999,
      stock: 25,
      image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      rating: 4.6,
      reviews_count: 142,
      featured: 0
    },

    // --- BEAUTY & GROOMING ---
    {
      name: 'All-in-One Waterproof Beard & Body Trimmer',
      category: 'Beauty & Grooming',
      sub_category: 'Grooming Tools',
      description: 'Self-sharpening titanium coated blades with 40 length settings (0.5mm - 20mm), 90-minute cordless runtime, LED battery indicator, and fast USB-C charge.',
      price: 1399,
      stock: 35,
      image_url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80',
      rating: 4.7,
      reviews_count: 280,
      featured: 1
    },
    {
      name: 'Radiance 10% Vitamin C Facial Glow Serum',
      category: 'Beauty & Grooming',
      sub_category: 'Skincare',
      description: 'Enriched with pure Ethyl Ascorbic Acid, Ferulic Acid, and Hyaluronic Acid to brighten dark spots, even tone, and boost collagen naturally. 30ml.',
      price: 699,
      stock: 50,
      image_url: 'https://images.unsplash.com/photo-1608248597358-005667362a74?w=800&q=80',
      rating: 4.8,
      reviews_count: 310,
      featured: 1
    },
    {
      name: 'Amber Wood & Bergamot Luxury Eau De Parfum (100ml)',
      category: 'Beauty & Grooming',
      sub_category: 'Fragrances',
      description: 'Long-lasting signature French fragrance blending vibrant bergamot top notes with rich cedarwood and warm amber base notes. Lasts up to 12 hours.',
      price: 1799,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      rating: 4.7,
      reviews_count: 164,
      featured: 1
    },
    {
      name: 'Deep Hydration Hyaluronic Sunscreen Aqua Gel SPF 50',
      category: 'Beauty & Grooming',
      sub_category: 'Skincare',
      description: 'Zero white-cast ultra-lightweight gel formula with broad spectrum PA++++ protection against UVA/UVB rays and digital blue light. 50g.',
      price: 549,
      stock: 45,
      image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
      rating: 4.9,
      reviews_count: 415,
      featured: 0
    },

    // --- HOME & LIVING ---
    {
      name: 'Artisan Handcrafted Ceramic Dinner Set (16 Pcs)',
      category: 'Home & Living',
      sub_category: 'Kitchen & Dining',
      description: 'Lead-free microwave and dishwasher safe stoneware set including 4 dinner plates, 4 salad plates, 4 soup bowls, and 4 mugs with rustic dual-tone glaze.',
      price: 2999,
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      rating: 4.8,
      reviews_count: 156,
      featured: 1
    },
    {
      name: 'Smart Ultrasonic Aroma Diffuser & Ambient Lamp',
      category: 'Home & Living',
      sub_category: 'Home Decor & Fragrance',
      description: 'Whisper-quiet essential oil diffuser with soothing 7-color ambient night light, auto-shutoff safety timer, and 500ml water capacity.',
      price: 1299,
      stock: 28,
      image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
      rating: 4.6,
      reviews_count: 119,
      featured: 0
    },
    {
      name: 'Barista Pour-Over Borosilicate Glass Carafe',
      category: 'Home & Living',
      sub_category: 'Kitchen & Dining',
      description: 'Thermal shock resistant pour-over coffee brewer with laser-cut dual stainless steel reusable filter and natural acacia wood collar with leather tie.',
      price: 1599,
      stock: 22,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      rating: 4.8,
      reviews_count: 88,
      featured: 0
    },
    {
      name: '300 TC 100% Egyptian Cotton King Bedsheet Set',
      category: 'Home & Living',
      sub_category: 'Bedding',
      description: 'Super soft sateen weave breathable king bedsheet with 2 pillow covers. Hypoallergenic, colorfast, and gets softer with every wash.',
      price: 1999,
      stock: 15,
      image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      rating: 4.7,
      reviews_count: 94,
      featured: 0
    },

    // --- KIDS ---
    {
      name: 'Junior Explorer Dinosaur Graphic Cotton Tee',
      category: 'Kids',
      sub_category: 'Boys Clothing',
      description: 'Ultra-soft 100% breathable organic cotton round-neck tee with glow-in-the-dark dinosaur print. Gentle on tender skin.',
      price: 499,
      stock: 35,
      image_url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
      rating: 4.8,
      reviews_count: 142,
      featured: 1
    },
    {
      name: 'Princess Floral Chiffon Party Frock',
      category: 'Kids',
      sub_category: 'Girls Clothing',
      description: 'Pastel flower printed sleeveless occasion dress with cotton inner lining, satin bow belt, and flare ruffle hemline.',
      price: 899,
      stock: 24,
      image_url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      rating: 4.7,
      reviews_count: 96,
      featured: 1
    },
    {
      name: 'Kids Light-Up Sport Sneakers with Grip Sole',
      category: 'Kids',
      sub_category: 'Footwear',
      description: 'Fun motion-activated LED sole athletic shoes with easy hook-and-loop velcro straps and cushioned ankle collar.',
      price: 1199,
      stock: 18,
      image_url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
      rating: 4.6,
      reviews_count: 110,
      featured: 0
    },

    // --- FITNESS & ACCESSORIES ---
    {
      name: 'ProGrip Anti-Slip Natural Cork Yoga Mat (6mm)',
      category: 'Home & Living',
      sub_category: 'Sports & Active Wear',
      description: 'Eco-friendly organic cork surface with natural rubber base, laser alignment guidelines, and cotton carry strap. Superior wet & dry grip.',
      price: 1899,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      rating: 4.8,
      reviews_count: 125,
      featured: 1
    },
    {
      name: 'HydroFlow Insulated Stainless Steel Flask (1000ml)',
      category: 'Home & Living',
      sub_category: 'Kitchen & Dining',
      description: 'Double wall vacuum insulation keeps water cold for 24 hours or hot for 12 hours. Sweat-proof powder coating with wide mouth chug cap.',
      price: 899,
      stock: 40,
      image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
      rating: 4.8,
      reviews_count: 210,
      featured: 0
    },
    {
      name: 'Aviator UV400 Polarized Sunglasses',
      category: 'Men',
      sub_category: 'Fashion Accessories',
      description: 'Classic teardrop metal frame with shatterproof polarized lenses, anti-glare coating, and protective hard leather case.',
      price: 1299,
      stock: 25,
      image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      rating: 4.6,
      reviews_count: 140,
      featured: 0
    }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (name, category, sub_category, description, price, stock, image_url, rating, reviews_count, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const prod of products) {
    insertProduct.run(
      prod.name,
      prod.category,
      prod.sub_category,
      prod.description,
      prod.price,
      prod.stock,
      prod.image_url,
      prod.rating,
      prod.reviews_count,
      prod.featured
    );
  }
  console.log(`✅ Seeded ${products.length} realistic products with INR prices`);

  // 5. Seed sample initial order for user@ecommerce.com in INR
  const user = db.prepare('SELECT user_id FROM users WHERE email = ?').get('user@ecommerce.com');
  const sample1 = db.prepare('SELECT * FROM products WHERE name LIKE ?').get('%Kurta%');
  const sample2 = db.prepare('SELECT * FROM products WHERE name LIKE ?').get('%BassPods%');

  if (user && sample1 && sample2) {
    const total = sample1.price * 1 + sample2.price * 1;
    const orderRes = db.prepare(`
      INSERT INTO orders (user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_postal, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      user.user_id,
      total,
      'processing',
      'Pooja Sharma',
      'B-402, Green Glen Layout, Bellandur',
      'Bengaluru, Karnataka',
      '560103',
      'UPI (Google Pay)'
    );

    const orderId = orderRes.lastInsertRowid;
    db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?), (?, ?, ?, ?)
    `).run(
      orderId, sample1.product_id, 1, sample1.price,
      orderId, sample2.product_id, 1, sample2.price
    );

    console.log(`✅ Seeded sample order #${orderId} with 2 items for Pooja Sharma (₹${total})`);
  }

  console.log('🎉 Realistic Indian E-Commerce Database Seeding Complete!');
}

if (require.main === module) {
  seed().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}

module.exports = seed;

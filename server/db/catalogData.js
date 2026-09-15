// Realistic Indian E-Commerce Catalog Generator for BUYNEST (215+ items)
// Covering Men, Women, Electronics, Home & Kitchen, Beauty & Personal Care, Sports & Fitness, Kids

const rawCatalog = [
  // 1. MEN (10 subcategories: T-shirts, Shirts, Jeans, Trousers, Jackets, Shoes, Watches, Wallets, Bags, Sunglasses)
  {
    name: 'Roadster Pure Cotton Solid Crew Neck T-shirt',
    brand: 'Roadster', category: 'Men', sub_category: 'T-shirts', gender: 'Men',
    price: 499, mrp: 999, discount_percent: 50, stock: 45, rating: 4.2, reviews_count: 1420,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Navy Blue', 'Maroon', 'Olive Green', 'Black'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'],
    description: 'Breathable 100% combed bio-washed cotton round neck t-shirt for everyday casual comfort.',
    specifications: { 'Fabric': '100% Bio-Wash Cotton', 'Fit': 'Regular Fit', 'Pattern': 'Solid', 'Neck': 'Round Neck', 'Sleeve': 'Half Sleeve' },
    tags: ['tshirt', 'cotton', 'summer', 'casual', 'round neck', 'roadster']
  },
  {
    name: 'Wrogn Typography Printed Slim Fit T-shirt',
    brand: 'Wrogn', category: 'Men', sub_category: 'T-shirts', gender: 'Men',
    price: 799, mrp: 1599, discount_percent: 50, stock: 30, rating: 4.4, reviews_count: 890,
    sizes: ['M', 'L', 'XL'], colors: ['White', 'Anthracite Grey'],
    seller_name: 'TruNet Commerce', is_popular: 1, is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
    description: 'Trendy graphic streetwear t-shirt crafted with premium cotton blend for modern urban styles.',
    specifications: { 'Fabric': 'Cotton Blend', 'Fit': 'Slim Fit', 'Pattern': 'Graphic Print', 'Neck': 'Crew Neck' },
    tags: ['graphic', 'streetwear', 'printed', 'wrogn']
  },
  {
    name: 'U.S. Polo Assn. Classic Pique Polo T-shirt',
    brand: 'U.S. Polo Assn.', category: 'Men', sub_category: 'T-shirts', gender: 'Men',
    price: 1199, mrp: 2199, discount_percent: 45, stock: 25, rating: 4.5, reviews_count: 3120,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Royal Blue', 'Crimson Red', 'White'],
    seller_name: 'OmniStyle Retail', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1625910513413-5bc50c3d9a5b?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1625910513413-5bc50c3d9a5b?w=800&q=80'],
    description: 'Iconic polo collar t-shirt with embroidered brand logo and ribbed collar cuffs.',
    specifications: { 'Fabric': '100% Pique Cotton', 'Fit': 'Custom Slim', 'Pattern': 'Solid', 'Collar': 'Polo' },
    tags: ['polo', 'collar', 'classic', 'formal casual', 'uspa']
  },
  {
    name: 'Allen Solly Men Slim Fit Formal Poplin Shirt',
    brand: 'Allen Solly', category: 'Men', sub_category: 'Shirts', gender: 'Men',
    price: 1399, mrp: 2499, discount_percent: 44, stock: 35, rating: 4.3, reviews_count: 980,
    sizes: ['38', '40', '42', '44'], colors: ['Sky Blue', 'Crisp White', 'Soft Pink'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'],
    description: 'Crisp poplin weave tailored shirt designed for corporate workwear and formal meetings.',
    specifications: { 'Fabric': 'Pure Cotton', 'Fit': 'Slim Fit', 'Collar': 'Spread Collar', 'Occasion': 'Formal' },
    tags: ['formal shirt', 'office wear', 'cotton', 'allen solly']
  },
  {
    name: 'Highlander Buffalo Checked Casual Cotton Shirt',
    brand: 'Highlander', category: 'Men', sub_category: 'Shirts', gender: 'Men',
    price: 749, mrp: 1699, discount_percent: 56, stock: 40, rating: 4.1, reviews_count: 2450,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Red & Black', 'Navy & White'],
    seller_name: 'IndiWeaves Hub', is_popular: 0, is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
    description: 'Rugged buffalo check casual shirt featuring double patch pockets and curved hemline.',
    specifications: { 'Fabric': 'Cotton Twill', 'Fit': 'Regular Fit', 'Pattern': 'Checkered', 'Collar': 'Button Down' },
    tags: ['casual shirt', 'checkered', 'cotton', 'flannel']
  },
  {
    name: 'Peter England Premium Linen Mandarin Collar Shirt',
    brand: 'Peter England', category: 'Men', sub_category: 'Shirts', gender: 'Men',
    price: 1599, mrp: 2999, discount_percent: 47, stock: 22, rating: 4.6, reviews_count: 670,
    sizes: ['39', '40', '42', '44'], colors: ['Mint Green', 'Beige', 'White'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80'],
    description: 'Luxury blended linen-cotton breathable shirt with mandarin band collar for festive evenings.',
    specifications: { 'Fabric': 'Linen Cotton', 'Fit': 'Regular Fit', 'Collar': 'Mandarin', 'Occasion': 'Semi-Formal' },
    tags: ['linen', 'mandarin collar', 'festive', 'peter england']
  },
  {
    name: 'Flying Machine Mid-Rise Skinny Fit Stretch Jeans',
    brand: 'Flying Machine', category: 'Men', sub_category: 'Jeans', gender: 'Men',
    price: 1499, mrp: 2999, discount_percent: 50, stock: 32, rating: 4.3, reviews_count: 1820,
    sizes: ['30', '32', '34', '36', '38'], colors: ['Dark Indigo', 'Faded Blue'],
    seller_name: 'TruNet Commerce', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80'],
    description: '5-pocket stretch denim jeans with mild whiskering and premium enzyme wash for all-day comfort.',
    specifications: { 'Fabric': '98% Cotton, 2% Elastane', 'Fit': 'Skinny Fit', 'Waist': 'Mid-Rise', 'Wash': 'Dark Wash' },
    tags: ['jeans', 'denim', 'stretch', 'flying machine']
  },
  {
    name: 'Blackberrys Slim Fit Flat Front Formal Trousers',
    brand: 'Blackberrys', category: 'Men', sub_category: 'Trousers', gender: 'Men',
    price: 1799, mrp: 3499, discount_percent: 49, stock: 24, rating: 4.5, reviews_count: 730,
    sizes: ['30', '32', '34', '36', '38'], colors: ['Charcoal Grey', 'Navy Blue', 'Khaki'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],
    description: 'Wrinkle-resistant Poly-Viscose trousers with hook & bar closure for executive elegance.',
    specifications: { 'Fabric': 'Poly Viscose Blend', 'Fit': 'Slim Fit', 'Pleats': 'Flat Front' },
    tags: ['formal trousers', 'office', 'executive', 'blackberrys']
  },
  {
    name: 'Fort Collins Quilted Water-Resistant Puffer Jacket',
    brand: 'Fort Collins', category: 'Men', sub_category: 'Jackets', gender: 'Men',
    price: 1999, mrp: 3999, discount_percent: 50, stock: 20, rating: 4.4, reviews_count: 850,
    sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Olive Green', 'Matte Black', 'Navy'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'],
    description: 'Insulated thermal padded jacket featuring wind-proof zipper and detachable fleece hood.',
    specifications: { 'Fabric': 'Nylon Shell, Polyester Fill', 'Fit': 'Regular Fit', 'Hood': 'Detachable' },
    tags: ['jacket', 'winter wear', 'puffer', 'thermal']
  },
  {
    name: 'Red Tape Air Cushion Men Mesh Walking Shoes',
    brand: 'Red Tape', category: 'Men', sub_category: 'Shoes', gender: 'Men',
    price: 1599, mrp: 4999, discount_percent: 68, stock: 50, rating: 4.3, reviews_count: 4200,
    sizes: ['6', '7', '8', '9', '10', '11'], colors: ['Grey & Orange', 'All Black', 'Navy Blue'],
    seller_name: 'RetailNet Fashion', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    description: 'Ultra-lightweight flyknit breathable mesh running shoes with responsive memory foam insole.',
    specifications: { 'Upper Material': 'Mesh Flyknit', 'Sole': 'EVA Air Cushion', 'Closure': 'Lace-Up' },
    tags: ['shoes', 'sneakers', 'walking', 'sports', 'red tape']
  },
  {
    name: 'Titan Neo Analog Blue Dial Stainless Steel Watch',
    brand: 'Titan', category: 'Men', sub_category: 'Watches', gender: 'Men',
    price: 3995, mrp: 5495, discount_percent: 27, stock: 24, rating: 4.7, reviews_count: 1890,
    sizes: ['Standard'], colors: ['Silver & Blue Dial', 'Black & Gold'],
    seller_name: 'RetailNet Luxury', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'],
    description: 'Sophisticated quartz movement timepiece featuring sunray dial and water resistance up to 50m.',
    specifications: { 'Dial Color': 'Sunray Blue', 'Strap': 'Stainless Steel', 'Water Resistance': '50 Meters', 'Warranty': '2 Years' },
    tags: ['watch', 'analog', 'titan', 'luxury', 'metal strap']
  },
  {
    name: 'Wildcraft Genuine Leather RFID Blocking Bi-fold Wallet',
    brand: 'Wildcraft', category: 'Men', sub_category: 'Wallets', gender: 'Men',
    price: 699, mrp: 1499, discount_percent: 53, stock: 45, rating: 4.4, reviews_count: 2200,
    sizes: ['Standard'], colors: ['Cognac Brown', 'Matte Black'],
    seller_name: 'RetailNet Accessories', is_popular: 1, is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
    description: 'Handcrafted top-grain leather wallet equipped with RFID shield to protect contactless cards.',
    specifications: { 'Material': '100% Genuine Leather', 'Card Slots': '8 Slots', 'Coin Pocket': 'Yes' },
    tags: ['wallet', 'leather', 'rfid', 'wildcraft']
  },
  {
    name: 'American Tourister 32L Casual Laptop Backpack',
    brand: 'American Tourister', category: 'Men', sub_category: 'Bags', gender: 'Unisex',
    price: 1499, mrp: 3100, discount_percent: 52, stock: 35, rating: 4.5, reviews_count: 5400,
    sizes: ['32 Litres'], colors: ['Teal & Charcoal', 'Navy & Grey'],
    seller_name: 'RetailNet Accessories', is_popular: 1, is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    description: '3-compartment ergonomically cushioned college & laptop backpack with rain cover.',
    specifications: { 'Capacity': '32L', 'Laptop Sleeve': 'Up to 15.6 inch', 'Material': 'Water-Repellent Polyester' },
    tags: ['backpack', 'laptop bag', 'american tourister', 'travel']
  },
  {
    name: 'Vincent Chase Polarized Aviator Sunglasses',
    brand: 'Vincent Chase', category: 'Men', sub_category: 'Sunglasses', gender: 'Men',
    price: 999, mrp: 1999, discount_percent: 50, stock: 30, rating: 4.3, reviews_count: 1750,
    sizes: ['Medium (58mm)'], colors: ['Gunmetal Green', 'Gold Brown'],
    seller_name: 'Lenskart Direct', is_popular: 1, is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
    description: 'UV400 protective polarized aviators with lightweight stainless steel frame.',
    specifications: { 'Lens Type': 'Polarized UV400', 'Frame Material': 'Stainless Steel', 'Shape': 'Aviator' },
    tags: ['sunglasses', 'aviator', 'polarized', 'uv protection']
  }
];

// Definition of realistic products across all 7 categories and 56 subcategories
const categoryDefinitions = {
  'Men': {
    'T-shirts': [
      { name: 'Puma Ess Small Logo Cotton T-shirt', brand: 'Puma', price: 899, mrp: 1499, colors: ['Puma White', 'Puma Black'], image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80' },
      { name: 'Jack & Jones Striped Crew Neck Casual T-shirt', brand: 'Jack & Jones', price: 699, mrp: 1499, colors: ['White & Navy', 'Maroon Striped'], image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80' }
    ],
    'Shirts': [
      { name: 'Raymond Luxury Executive White Cotton Shirt', brand: 'Raymond', price: 1899, mrp: 3499, colors: ['Crisp White'], image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80' },
      { name: 'Mufti Textured Mandarin Collar Casual Shirt', brand: 'Mufti', price: 1299, mrp: 2699, colors: ['Mustard Yellow', 'Teal Blue'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80' }
    ],
    'Jeans': [
      { name: 'Levis 511 Slim Fit Stretch Denim Jeans', brand: "Levi's", price: 2399, mrp: 3999, colors: ['Medium Indigo', 'Rinsed Black'], image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80' },
      { name: 'Pepe Jeans Regular Straight Fit Heavy Wash Jeans', brand: 'Pepe Jeans', price: 1799, mrp: 3499, colors: ['Stone Washed Blue'], image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80' }
    ],
    'Trousers': [
      { name: 'Van Heusen Smart Flex Formal Charcoal Trousers', brand: 'Van Heusen', price: 1699, mrp: 2999, colors: ['Charcoal', 'Navy'], image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' },
      { name: 'Marks & Spencer Active Waist Stretch Chinos', brand: 'Marks & Spencer', price: 2299, mrp: 3999, colors: ['Khaki Stone', 'Navy'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' }
    ],
    'Jackets': [
      { name: 'Wildcraft Waterproof Windcheater Rain Jacket', brand: 'Wildcraft', price: 1499, mrp: 2799, colors: ['Cobalt Blue', 'Neon Green'], image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80' },
      { name: 'Monte Carlo Wool Rich Knit Winter Cardigan Jacket', brand: 'Monte Carlo', price: 2199, mrp: 3999, colors: ['Charcoal Heather', 'Coffee'], image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80' }
    ],
    'Shoes': [
      { name: 'Puma Rebound Layup High-Top Sneakers', brand: 'Puma', price: 2799, mrp: 4999, colors: ['White & Red', 'All Black'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
      { name: 'Bata Formal Derby Leather Dress Shoes', brand: 'Bata', price: 1499, mrp: 2499, colors: ['Rich Black', 'Tan Brown'], image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80' }
    ],
    'Watches': [
      { name: 'Fossil Grant Chronograph Brown Leather Watch', brand: 'Fossil', price: 7495, mrp: 12495, colors: ['Rose Gold & Brown'], image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
      { name: 'Casio Vintage Digital Gold Dial Watch', brand: 'Casio', price: 2195, mrp: 2995, colors: ['Gold', 'Silver'], image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80' }
    ],
    'Wallets': [
      { name: 'Tommy Hilfiger Bi-Fold Premium Leather Wallet', brand: 'Tommy Hilfiger', price: 1499, mrp: 2799, colors: ['Navy Stripe', 'Black'], image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80' },
      { name: 'Woodland Rugged Oiled Hunter Leather Wallet', brand: 'Woodland', price: 895, mrp: 1595, colors: ['Distressed Tan', 'Dark Brown'], image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80' }
    ],
    'Bags': [
      { name: 'Skybags Bravo 3 Compartment Casual Daypack', brand: 'Skybags', price: 1199, mrp: 2400, colors: ['Blue Wave', 'Red Flame'], image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
      { name: 'Safari Expandable Formal Laptop Messenger Bag', brand: 'Safari', price: 1399, mrp: 2999, colors: ['Jet Black', 'Heather Grey'], image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' }
    ],
    'Sunglasses': [
      { name: 'Fastrack Polarized Wayfarer Sunglasses', brand: 'Fastrack', price: 899, mrp: 1499, colors: ['Matte Black Frame', 'Tortoise Brown'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },
      { name: 'Voyage Luxury Hexagonal Metal Sunglasses', brand: 'Voyage', price: 1299, mrp: 2499, colors: ['Gold & Green Lens'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80' }
    ]
  },

  'Women': {
    'Dresses': [
      { name: 'Tokyo Talkies Floral Printed A-Line Midi Dress', brand: 'Tokyo Talkies', price: 899, mrp: 1999, colors: ['Lavender Floral', 'Sunshine Yellow'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
      { name: 'Vero Moda Emerald Green Tiered Fit & Flare Dress', brand: 'Vero Moda', price: 1699, mrp: 3499, colors: ['Emerald Green', 'Wine Red'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80' },
      { name: 'Zara Style Satin Slip Evening Cocktail Dress', brand: 'Rare Beauty', price: 1999, mrp: 3999, colors: ['Champagne Gold', 'Midnight Black'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80' }
    ],
    'Tops': [
      { name: 'ONLY Ribbed Square Neck Crop Top', brand: 'ONLY', price: 599, mrp: 1299, colors: ['Sage Green', 'Beige', 'Black'], image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80' },
      { name: 'AND Geometric Printed Bishop Sleeve Peplum Top', brand: 'AND', price: 1199, mrp: 2299, colors: ['Navy Print', 'Dusty Rose'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80' }
    ],
    'Kurtis': [
      { name: 'Libas Pure Cotton Embroidered Anarkali Kurti', brand: 'Libas', price: 1299, mrp: 2899, colors: ['Indigo Blue', 'Teal'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
      { name: 'Biba Floral Printed Straight Festive Kurti', brand: 'Biba', price: 1699, mrp: 3299, colors: ['Coral Pink', 'Mustard'], image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80' },
      { name: 'W for Woman Gold Foil Print Flared Festive Kurti', brand: 'W', price: 1899, mrp: 3999, colors: ['Deep Maroon & Gold'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }
    ],
    'Sarees': [
      { name: 'Suta Handwoven Mulmul Cotton Saree with Zari Border', brand: 'Suta', price: 1999, mrp: 3500, colors: ['Sunset Orange', 'Peacock Blue'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
      { name: 'Vark Kanjivaram Style Banarasi Art Silk Saree', brand: 'Vark', price: 2999, mrp: 6999, colors: ['Royal Red & Gold', 'Emerald & Gold'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }
    ],
    'Jeans': [
      { name: 'Levis High-Waist Super Skinny Women Jeans', brand: "Levi's", price: 2199, mrp: 3799, colors: ['Deep Indigo', 'Charcoal'], image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80' },
      { name: 'Kraus Wide Leg High Rise Relaxed Denim Jeans', brand: 'Kraus Jeans', price: 1499, mrp: 2699, colors: ['Vintage Light Blue'], image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80' }
    ],
    'Trousers': [
      { name: 'Marks & Spencer Tapered Ankle Grazer Trousers', brand: 'Marks & Spencer', price: 1899, mrp: 3299, colors: ['Beige Stone', 'Navy'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' },
      { name: 'Tokyo Talkies High-Rise Pleated Formal Trousers', brand: 'Tokyo Talkies', price: 899, mrp: 1799, colors: ['Taupe Brown', 'Black'], image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' }
    ],
    'Handbags': [
      { name: 'Lavie Quilted Structured Women Satchel Handbag', brand: 'Lavie', price: 1699, mrp: 3999, colors: ['Blush Pink', 'Classic Black', 'Tan'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80' },
      { name: 'Caprese Faux Leather Spacious Everyday Tote Bag', brand: 'Caprese', price: 2199, mrp: 4699, colors: ['Olive Green', 'Coral Red'], image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80' },
      { name: 'Baggit Vegan Leather Crossbody Sling Bag', brand: 'Baggit', price: 1199, mrp: 2290, colors: ['Mustard Ochre', 'Dark Tan'], image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' }
    ],
    'Shoes': [
      { name: 'Metro Comfort Block Heel Festive Sandals', brand: 'Metro', price: 1899, mrp: 2990, colors: ['Rose Gold Shimmer', 'Antique Silver'], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80' },
      { name: 'Mochi Handcrafted Traditional Kolhapuri Wedge Flats', brand: 'Mochi', price: 1490, mrp: 2290, colors: ['Tan Braided', 'Maroon'], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80' },
      { name: 'Puma Carina Street Platform Women Sneakers', brand: 'Puma', price: 2999, mrp: 5499, colors: ['White & Pastel Lilac'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' }
    ],
    'Watches': [
      { name: 'Titan Raga Rose Gold Mother-of-Pearl Dial Watch', brand: 'Titan', price: 4995, mrp: 7495, colors: ['Rose Gold & Pearl'], image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
      { name: 'Daniel Wellington Classic Petite Mesh Watch', brand: 'Daniel Wellington', price: 8499, mrp: 13999, colors: ['Rose Gold Mesh', 'Silver'], image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80' }
    ],
    'Jewellery': [
      { name: 'GIVA 925 Sterling Silver Zircon Heart Pendant Necklace', brand: 'GIVA', price: 1899, mrp: 3599, colors: ['Silver Sparkle', 'Rose Gold Plated'], image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
      { name: 'Zaveri Pearls 24K Gold Plated Kundan Choker Necklace Set', brand: 'Zaveri Pearls', price: 1299, mrp: 3999, colors: ['Green & Gold', 'Ruby & Gold'], image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80' },
      { name: 'KaratCart Traditional Meenakari Jhumka Earrings', brand: 'KaratCart', price: 699, mrp: 1899, colors: ['Royal Blue & Pearls'], image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80' }
    ],
    'Sunglasses': [
      { name: 'Voyage Cat Eye UV-Protected Women Sunglasses', brand: 'Voyage', price: 899, mrp: 1899, colors: ['Tortoise Shell', 'Gloss Black'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },
      { name: 'Vincent Chase Oversized Gradient Square Sunglasses', brand: 'Vincent Chase', price: 1199, mrp: 2199, colors: ['Rose Gradient Frame'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80' }
    ]
  },

  'Electronics': {
    'Smartphones': [
      { name: 'OnePlus Nord CE4 5G (8GB RAM, 128GB Storage, 100W Charging)', brand: 'OnePlus', price: 24999, mrp: 26999, colors: ['Dark Chrome', 'Celadon Marble'], image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
      { name: 'Samsung Galaxy M35 5G (6000mAh Battery, Super AMOLED 120Hz)', brand: 'Samsung', price: 16999, mrp: 21999, colors: ['Daybreak Blue', 'Thunder Grey'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
      { name: 'Realme 13 Pro+ 5G (Periscope Telephoto Camera, 512GB)', brand: 'Realme', price: 29999, mrp: 34999, colors: ['Monet Gold', 'Emerald Green'], image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' }
    ],
    'Laptops': [
      { name: 'ASUS Vivobook 15 Thin & Light (Intel Core i5 12th Gen, 16GB, 512GB SSD)', brand: 'ASUS', price: 44990, mrp: 62990, colors: ['Quiet Blue', 'Transparent Silver'], image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
      { name: 'Lenovo IdeaPad Slim 3 (AMD Ryzen 5 7520U, 16GB RAM, FHD IPS)', brand: 'Lenovo', price: 41990, mrp: 58990, colors: ['Arctic Grey'], image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80' }
    ],
    'Headphones': [
      { name: 'Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling Headphones', brand: 'Sony', price: 19990, mrp: 29990, colors: ['Silver', 'Black', 'Midnight Blue'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
      { name: 'JBL Tune 770NC Adaptive Noise Cancelling Wireless Headphones', brand: 'JBL', price: 5499, mrp: 9999, colors: ['Blue', 'White', 'Black'], image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80' }
    ],
    'Earbuds': [
      { name: 'boAt Airdopes 141 ANC True Wireless Earbuds (32dB ANC, 42H Battery)', brand: 'boAt', price: 1499, mrp: 4490, colors: ['Gunmetal Black', 'Cider White'], image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80' },
      { name: 'OnePlus Buds 3 TWS with 49dB Smart Adaptive ANC & LHDC 5.0', brand: 'OnePlus', price: 4999, mrp: 6499, colors: ['Metallic Gray', 'Splendid Blue'], image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80' }
    ],
    'Smartwatches': [
      { name: 'Noise ColorFit Pro 5 AMOLED 1.85" Bluetooth Calling Smartwatch', brand: 'Noise', price: 2999, mrp: 7999, colors: ['Jet Black', 'Vintage Brown Leather'], image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80' },
      { name: 'Fire-Boltt Phoenix Ultra Luxury Stainless Steel Smartwatch', brand: 'Fire-Boltt', price: 1799, mrp: 6999, colors: ['Silver Mesh', 'Gold'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' }
    ],
    'Tablets': [
      { name: 'Samsung Galaxy Tab A9+ 11-inch (8GB RAM, 128GB, Quad Speakers)', brand: 'Samsung', price: 18999, mrp: 25999, colors: ['Graphite', 'Silver'], image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80' },
      { name: 'Xiaomi Pad 6 (Snapdragon 870, 144Hz 2.8K Display, 8GB/256GB)', brand: 'Xiaomi', price: 24999, mrp: 39999, colors: ['Mist Blue', 'Graphite Grey'], image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80' }
    ],
    'Speakers': [
      { name: 'JBL Flip 6 Portable Waterproof Bluetooth Speaker with Deep Bass', brand: 'JBL', price: 8999, mrp: 13999, colors: ['Ocean Blue', 'Squad Camo', 'Black'], image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' },
      { name: 'boAt Stone 352 10W Wireless Speaker with RGB LEDs & IPX7', brand: 'boAt', price: 1299, mrp: 3490, colors: ['Raging Black', 'Vibrant Blue'], image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' }
    ],
    'Power banks': [
      { name: 'Mi 20000mAh 33W Fast Charging Hypersonic Power Bank 3i', brand: 'Mi', price: 1999, mrp: 3499, colors: ['Matte Black'], image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80' },
      { name: 'Ambrane 10000mAh Magnetic Wireless MagSafe Power Bank', brand: 'Ambrane', price: 1499, mrp: 2999, colors: ['Titanium Grey', 'Blue'], image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80' }
    ],
    'Chargers': [
      { name: 'Anker 65W GaN 3-Port Ultra-Fast Wall Charger for Laptops & Phones', brand: 'Anker', price: 2999, mrp: 4999, colors: ['Dark Grey'], image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80' },
      { name: 'Portronics 33W Dual Port Type-C PD Fast Mobile Adapter', brand: 'Portronics', price: 699, mrp: 1499, colors: ['Glossy White'], image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80' }
    ],
    'Cameras': [
      { name: 'Sony Alpha ZV-E10 Mirrorless Vlog Camera with 16-50mm Lens', brand: 'Sony', price: 54990, mrp: 69990, colors: ['Matte Black'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80' },
      { name: 'GoPro HERO12 Black Waterproof Action Camera with HDR 5.3K Video', brand: 'GoPro', price: 34990, mrp: 45000, colors: ['Signature Blue Fleck'], image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80' }
    ]
  },

  'Home & Kitchen': {
    'Furniture': [
      { name: 'Green Soul Monster Ultimate Ergonomic Gaming & Work Chair', brand: 'Green Soul', price: 14999, mrp: 24990, colors: ['Full Black', 'Black & Red'], image: 'https://images.unsplash.com/photo-1580481077195-749e38e6ff0b?w=800&q=80' },
      { name: 'DeckUp Siena Engineered Wood Computer & Study Desk', brand: 'DeckUp', price: 3499, mrp: 6500, colors: ['Dark Walnut', 'Wenge'], image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80' }
    ],
    'Bedsheets': [
      { name: 'Bombay Dyeing 100% Pure Cotton 300 TC Double Bedsheet with 2 Pillow Covers', brand: 'Bombay Dyeing', price: 1299, mrp: 2799, colors: ['Blue Floral', 'Geometric Grey'], image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80' },
      { name: 'Spaces Luxury 400 TC Egyptian Cotton King Fitted Bedsheet', brand: 'Spaces', price: 2199, mrp: 4499, colors: ['Ivory Beige', 'Pewter Grey'], image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80' }
    ],
    'Curtains': [
      { name: 'Urban Space 100% Blackout Thermal Eyelet Door Curtains (Set of 2)', brand: 'Urban Space', price: 1499, mrp: 2999, colors: ['Slate Grey', 'Beige Taupe'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' },
      { name: 'Home Sizzler Semi-Sheer Floral Jacquard Window Curtains (Set of 2)', brand: 'Home Sizzler', price: 699, mrp: 1499, colors: ['Coffee Brown', 'Wine'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' }
    ],
    'Kitchen appliances': [
      { name: 'Philips 750W Mixer Grinder with 4 Multipurpose Stainless Steel Jars', brand: 'Philips', price: 3499, mrp: 5495, colors: ['Deep Blue & White'], image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80' },
      { name: 'Prestige 1200W Induction Cooktop with Indian Preset Menus', brand: 'Prestige', price: 1999, mrp: 3495, colors: ['Black Crystal Glass'], image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80' }
    ],
    'Cookware': [
      { name: 'Hawkins Futura Hard Anodised Non-Stick Induction Compatible Dosa Tawa', brand: 'Hawkins', price: 1350, mrp: 1650, colors: ['Black Granite'], image: 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80' },
      { name: 'Prestige Svachh Deep Triply Stainless Steel Pressure Cooker 3L', brand: 'Prestige', price: 2399, mrp: 3490, colors: ['Mirror Silver'], image: 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80' }
    ],
    'Storage products': [
      { name: 'Milton Thermosteel Flip Lid 1000ml Insulated Stainless Steel Water Bottle', brand: 'Milton', price: 899, mrp: 1250, colors: ['Brushed Silver'], image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
      { name: 'Cello Checkers Airtight Modular Kitchen Grocery Container Set (Pack of 18)', brand: 'Cello', price: 999, mrp: 1850, colors: ['Transparent with Black Lids'], image: 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80' }
    ],
    'Home decor': [
      { name: 'Pure Copper Handcrafted Hammered Water Dispenser Pot with Stand (5 Litres)', brand: 'IndiCrafts', price: 2199, mrp: 3999, colors: ['Natural Rose Copper'], image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80' },
      { name: 'Aroma Diffuser Ultrasonic 500ml with 7 Colour LED Lights & Essential Oils', brand: 'PureMist', price: 1499, mrp: 2999, colors: ['Light Wood Grain'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80' }
    ],
    'Lighting': [
      { name: 'Wipro 16W Smart LED Batten with 16 Million Colours & Alexa Control', brand: 'Wipro', price: 899, mrp: 1899, colors: ['RGB Smart White'], image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
      { name: 'Homesake Scandinavian Tripod Wood Standing Floor Lamp with Linen Shade', brand: 'Homesake', price: 2199, mrp: 4500, colors: ['Natural Teak & Cream'], image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80' }
    ]
  },

  'Beauty & Personal Care': {
    'Skincare': [
      { name: 'Minimalist 10% Niacinamide + Zinc Serum for Blemish & Pore Reduction (30ml)', brand: 'Minimalist', price: 599, mrp: 699, colors: ['Transparent Glass'], image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80' },
      { name: 'The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50 PA++++ (50g)', brand: 'The Derma Co', price: 449, mrp: 499, colors: ['Aqua Blue'], image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80' },
      { name: 'Forest Essentials Soundarya Radiance Facial Cream with 24K Gold & Saffron (50g)', brand: 'Forest Essentials', price: 4295, mrp: 4995, colors: ['Luxury Gold Jar'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80' }
    ],
    'Makeup': [
      { name: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick', brand: 'Maybelline', price: 499, mrp: 699, colors: ['Seductress Nude', 'Pioneer Red'], image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80' },
      { name: 'Lakme 9 to 5 Complexion Care CC Cream Honey (30g)', brand: 'Lakme', price: 299, mrp: 360, colors: ['02 Honey'], image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' }
    ],
    'Perfumes': [
      { name: 'Bella Vita Luxury CEO Man Eau De Parfum (100ml)', brand: 'Bella Vita', price: 699, mrp: 1199, colors: ['Signature Black Bottle'], image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80' },
      { name: 'Skinn by Titan Raw Long Lasting French EDP for Men (100ml)', brand: 'Skinn by Titan', price: 2195, mrp: 2795, colors: ['Oceanic Blue Glass'], image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80' }
    ],
    'Hair care': [
      { name: "L'Oreal Professionnel Absolut Repair Hair Mask with Wheat Protein (250g)", brand: "L'Oreal", price: 890, mrp: 990, colors: ['Gold Tub'], image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80' },
      { name: 'Mamaearth Onion Hair Oil with Redensyl for Hair Fall Control (250ml)', brand: 'Mamaearth', price: 499, mrp: 599, colors: ['Amber Bottle with Comb App'], image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80' }
    ],
    'Grooming products': [
      { name: 'Philips Series 3000 Stainless Steel Cordless Beard Trimmer (60 Mins Runtime)', brand: 'Philips', price: 1499, mrp: 1895, colors: ['Navy Blue Matte'], image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80' },
      { name: 'Bombay Shaving Company 6-in-1 Complete Charcoal Facial & Shaving Kit', brand: 'Bombay Shaving Co', price: 1199, mrp: 2195, colors: ['Classic Charcoal Wooden Box'], image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80' }
    ]
  },

  'Sports & Fitness': {
    'Sports shoes': [
      { name: 'Puma Men Velocity Nitro 2 Cushion Running Sports Shoes', brand: 'Puma', price: 4499, mrp: 8999, colors: ['Neon Green & Black'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
      { name: 'Nivia Flash Badminton Indoor Court Shoes for Men', brand: 'Nivia', price: 1399, mrp: 2199, colors: ['White & Yellow'], image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80' }
    ],
    'T-shirts': [
      { name: 'Cultsport Dry-Fit Anti-Bacterial Performance Workout T-shirt', brand: 'Cultsport', price: 699, mrp: 1399, colors: ['Heather Charcoal'], image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80' },
      { name: 'Decathlon Domyos Breathable Gym T-shirt for Men 500', brand: 'Decathlon', price: 499, mrp: 799, colors: ['Deep Petrol Blue'], image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80' }
    ],
    'Track pants': [
      { name: 'Puma Men T7 Iconic Regular Fit Track Pants', brand: 'Puma', price: 1899, mrp: 3499, colors: ['Black & White Stripe'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' },
      { name: 'Cultsport RapidDry Tapered Training Joggers with Zipper Pockets', brand: 'Cultsport', price: 1099, mrp: 2299, colors: ['Anthracite Grey'], image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80' }
    ],
    'Gym equipment': [
      { name: 'Decathlon Domyos 20kg Cast Iron Dumbbell & Barbell Weight Set in Case', brand: 'Decathlon', price: 4999, mrp: 6999, colors: ['Matte Black Iron'], image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80' },
      { name: 'Boldfit Pull-up Bar for Doorway with Anti-Slip Grip Pads', brand: 'Boldfit', price: 1199, mrp: 2499, colors: ['Black & Orange'], image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80' }
    ],
    'Fitness accessories': [
      { name: 'Boldfit 100% Natural Latex Resistance Loop Bands for Workout (Set of 5)', brand: 'Boldfit', price: 699, mrp: 1499, colors: ['Multi Colour Progression'], image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
      { name: 'Strauss Anti-Skid 6mm High Density TPE Yoga Mat with Carrying Strap', brand: 'Strauss', price: 899, mrp: 1899, colors: ['Dual Tone Purple & Pink'], image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80' }
    ],
    'Cricket products': [
      { name: 'SG Phoenix Grade 1 Kashmir Willow Full Size Cricket Bat with Cover', brand: 'SG', price: 2499, mrp: 3999, colors: ['Natural Wood Grain'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' },
      { name: 'SS Sunridges Professional Club Cricket Batting Gloves (Right Hand)', brand: 'SS', price: 999, mrp: 1690, colors: ['White & Navy Blue'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' }
    ],
    'Football products': [
      { name: 'Nivia Shining Star FIFA Certified Match Football Size 5', brand: 'Nivia', price: 1199, mrp: 1850, colors: ['White & Hexagon Black'], image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80' },
      { name: 'Puma Pro Training Shin Guards with Ankle Socks', brand: 'Puma', price: 699, mrp: 1199, colors: ['Fluro Yellow & Black'], image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80' }
    ]
  },

  'Kids': {
    'Boys clothing': [
      { name: 'Max Boys Graphic Printed Cotton T-Shirt & Denim Shorts Set', brand: 'Max Kids', price: 799, mrp: 1499, colors: ['Dino Print Orange'], image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80' },
      { name: 'Hopscotch Boys Festive Brocade Kurta Pyjama with Silk Waistcoat Set', brand: 'Hopscotch', price: 1499, mrp: 2999, colors: ['Royal Maroon & Gold'], image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80' }
    ],
    'Girls clothing': [
      { name: 'Pantaloons Junior Girls Pastel Floral Net Partywear Gown', brand: 'Pantaloons Junior', price: 1299, mrp: 2499, colors: ['Blush Pink & Shimmer'], image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80' },
      { name: 'Biba Girls Georgette Anarkali Suit with Dupatta Set', brand: 'Biba Kids', price: 1899, mrp: 3599, colors: ['Sky Blue & Gold Foil'], image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80' }
    ],
    'Kids shoes': [
      { name: 'Puma Kids Smash v2 Light-Up Velcro Sneakers', brand: 'Puma Kids', price: 1699, mrp: 2999, colors: ['Pink & White'], image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80' },
      { name: 'Crocs Kids Classic Clog Slip-On Water Friendly Sandals', brand: 'Crocs Kids', price: 1895, mrp: 2495, colors: ['Bright Cerulean Blue'], image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80' }
    ],
    'Toys': [
      { name: 'LEGO Classic Medium Creative Brick Building Box 10696 (484 Pieces)', brand: 'LEGO', price: 2999, mrp: 3999, colors: ['Multicolor Bricks'], image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80' },
      { name: 'Hot Wheels 10-Car Collector Gift Pack of Diecast Vehicles', brand: 'Hot Wheels', price: 1299, mrp: 1699, colors: ['Assorted Racing Metallic'], image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=80' }
    ],
    'School accessories': [
      { name: 'Skybags Ergonomic Cute Printed 27L School Backpack with Rain Cover', brand: 'Skybags', price: 1199, mrp: 2200, colors: ['Space Galaxy'], image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80' },
      { name: 'Faber-Castell Connector Pen 50 Sketch Pens Set in Suitcase Case', brand: 'Faber-Castell', price: 449, mrp: 599, colors: ['50 Vibrant Shades'], image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80' }
    ]
  }
};

// Generates the comprehensive 215+ product catalog
function buildFullCatalog() {
  const catalog = [...rawCatalog];
  let idCounter = catalog.length + 1;

  for (const [catName, subCats] of Object.entries(categoryDefinitions)) {
    for (const [subCatName, items] of Object.entries(subCats)) {
      items.forEach((item) => {
        const disc = item.disc || Math.round(((item.mrp - item.price) / item.mrp) * 100);
        catalog.push({
          name: item.name,
          brand: item.brand,
          category: catName,
          sub_category: subCatName,
          gender: catName === 'Men' ? 'Men' : catName === 'Women' ? 'Women' : catName === 'Kids' ? 'Kids' : 'Unisex',
          price: item.price,
          mrp: item.mrp,
          discount_percent: disc,
          stock: 15 + ((idCounter * 7) % 45),
          rating: Number((4.0 + ((idCounter % 9) / 10)).toFixed(1)),
          reviews_count: 85 + ((idCounter * 93) % 4500),
          sizes: ['Men', 'Women'].includes(catName) ? ['S', 'M', 'L', 'XL'] : ['Shoes', 'Kids shoes', 'Sports shoes'].includes(subCatName) ? ['6', '7', '8', '9', '10'] : ['Standard'],
          colors: item.colors || ['Black', 'Grey'],
          seller_name: ['RetailNet India', 'OmniTech Commerce', 'TruNet Retail', 'IndiWeaves Hub', 'SuperComNet'][(idCounter % 5)],
          is_popular: (idCounter % 3 === 0) ? 1 : 0,
          is_featured: (idCounter % 4 === 0) ? 1 : 0,
          image_url: item.image,
          images: [item.image],
          description: `Authentic ${item.name} from ${item.brand}. Premium quality craftsmanship tailored for Indian consumers.`,
          specifications: { 'Brand': item.brand, 'Category': catName, 'Sub-Category': subCatName, 'Warranty': '1 Year Manufacturer Warranty' },
          tags: [item.brand.toLowerCase(), catName.toLowerCase(), subCatName.toLowerCase(), 'authentic', 'buynest']
        });
        idCounter++;
      });
    }
  }

  // Expanded subcategory catalog filling up to guaranteed 215+ realistic items
  const subCategoryExpansions = [
    // Men subcats
    { cat: 'Men', sub: 'T-shirts', brand: 'Levis', name: "Levi's Housemark Slim Fit Graphic Crew T-Shirt", price: 899, mrp: 1799, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80' },
    { cat: 'Men', sub: 'T-shirts', brand: 'Nike', name: 'Nike Dri-FIT Legend Fitness Training T-Shirt', price: 1295, mrp: 1995, img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80' },
    { cat: 'Men', sub: 'Shirts', brand: 'Louis Philippe', name: 'Louis Philippe Gods & Kings Pure Egyptian Cotton Shirt', price: 2499, mrp: 4499, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80' },
    { cat: 'Men', sub: 'Shirts', brand: 'Arrow', name: 'Arrow New York Autopress Wrinkle Free Formal Shirt', price: 1699, mrp: 3299, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80' },
    { cat: 'Men', sub: 'Jeans', brand: 'Jack & Jones', name: 'Jack & Jones Glenn Original Slim Fit Tapered Jeans', price: 1999, mrp: 3999, img: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80' },
    { cat: 'Men', sub: 'Jeans', brand: 'Wrangler', name: 'Wrangler Texas Authentic Regular Fit Tough Denim', price: 1799, mrp: 3299, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80' },
    { cat: 'Men', sub: 'Trousers', brand: 'Raymond', name: 'Raymond Classic Tailored Fit Charcoal Poly-Wool Trousers', price: 2199, mrp: 3999, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' },
    { cat: 'Men', sub: 'Trousers', brand: 'ColorPlus', name: 'ColorPlus Smart Casual Non-Iron Chino Trousers', price: 1899, mrp: 3499, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' },
    { cat: 'Men', sub: 'Jackets', brand: 'Puma', name: 'Puma Men WarmCell Padded Thermal Winter Jacket', price: 3499, mrp: 6999, img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80' },
    { cat: 'Men', sub: 'Jackets', brand: 'Woodland', name: 'Woodland Heavy Duty Adventure Canvas Field Jacket', price: 3995, mrp: 6495, img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80' },
    { cat: 'Men', sub: 'Shoes', brand: 'Campus', name: 'Campus Men Rodeo PRO Responsive Walking Shoes', price: 1199, mrp: 1999, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
    { cat: 'Men', sub: 'Shoes', brand: 'Woodland', name: 'Woodland Casual Slip-On Leather Loafers', price: 2995, mrp: 4495, img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80' },
    { cat: 'Men', sub: 'Watches', brand: 'Timex', name: 'Timex Expedition Military Chronograph Outdoor Watch', price: 3495, mrp: 5995, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
    { cat: 'Men', sub: 'Watches', brand: 'Sonata', name: 'Sonata Volt Sleek Minimalist Dial Watch', price: 995, mrp: 1495, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80' },
    { cat: 'Men', sub: 'Wallets', brand: 'Peter England', name: 'Peter England Textured Slimline Leather Card Wallet', price: 599, mrp: 1299, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80' },
    { cat: 'Men', sub: 'Bags', brand: 'Wildcraft', name: 'Wildcraft 35L Trailblazer Water Resistant Rucksack', price: 1899, mrp: 3699, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    { cat: 'Men', sub: 'Sunglasses', brand: 'Ray-Ban style', name: 'Classic Retro Clubmaster Metallic Frame Sunglasses', price: 1499, mrp: 2999, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },

    // Women subcats
    { cat: 'Women', sub: 'Dresses', brand: 'Biba', name: 'Biba Tiered Fusion Embroidered Maxi Gown Dress', price: 2499, mrp: 4999, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
    { cat: 'Women', sub: 'Tops', brand: 'Forever 21', name: 'Forever 21 Flounce Sleeve Floral Chiffon Blouse', price: 899, mrp: 1699, img: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80' },
    { cat: 'Women', sub: 'Kurtis', brand: 'Soch', name: 'Soch Chanderi Silk Gotta Patti Festive Kurta Set', price: 2998, mrp: 5998, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
    { cat: 'Women', sub: 'Sarees', brand: 'FabIndia', name: 'FabIndia Hand Block Printed Tussar Silk Saree', price: 4290, mrp: 6990, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
    { cat: 'Women', sub: 'Jeans', brand: 'Roadster', name: 'Roadster Women Boyfriend Fit High-Rise Light Wash Jeans', price: 999, mrp: 1999, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80' },
    { cat: 'Women', sub: 'Trousers', brand: 'AND', name: 'AND Belted Wide Leg Summer Linen Trouser Pants', price: 1499, mrp: 2699, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' },
    { cat: 'Women', sub: 'Handbags', brand: 'ZOUK', name: 'ZOUK Handcrafted Indian Ikat Vegan Shoulder Tote', price: 1899, mrp: 3899, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80' },
    { cat: 'Women', sub: 'Shoes', brand: 'Catwalk', name: 'Catwalk Textured Pointed Toe Stiletto Party Heels', price: 2295, mrp: 3895, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80' },
    { cat: 'Women', sub: 'Watches', brand: 'Chumbak', name: 'Chumbak Aztec Printed Vintage Dial Wrist Watch', price: 1695, mrp: 2795, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
    { cat: 'Women', sub: 'Jewellery', brand: 'Voylla', name: 'Voylla Peacock Dual-Tone Temple Jewelry Choker Set', price: 999, mrp: 2499, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
    { cat: 'Women', sub: 'Sunglasses', brand: 'Lenskart Air', name: 'Lenskart Air Ultra Light Rimless Butterfly Sunglasses', price: 1299, mrp: 2499, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },

    // Electronics
    { cat: 'Electronics', sub: 'Smartphones', brand: 'iQOO', name: 'iQOO Z9s 5G (Sony OIS 50MP, Dimensity 7300, 120Hz 3D Curved)', price: 19999, mrp: 24999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
    { cat: 'Electronics', sub: 'Laptops', brand: 'Dell', name: 'Dell 15 Thin & Light Laptop (12th Gen i3, 8GB, 512GB SSD)', price: 36990, mrp: 49990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
    { cat: 'Electronics', sub: 'Headphones', brand: 'Sennheiser', name: 'Sennheiser HD 450SE Bluetooth Wireless Active Noise Cancelling', price: 8990, mrp: 14990, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
    { cat: 'Electronics', sub: 'Earbuds', brand: 'Boult Audio', name: 'Boult Audio Z40 Pro TWS Earbuds (100H Playtime, Quad Mic ENC)', price: 1299, mrp: 4999, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80' },
    { cat: 'Electronics', sub: 'Smartwatches', brand: 'boAt', name: 'boAt Wave Call 2 Plus 1.83" HD Display Smartwatch with Calling', price: 1399, mrp: 5999, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80' },
    { cat: 'Electronics', sub: 'Tablets', brand: 'Realme', name: 'Realme Pad 2 11.5-inch 120Hz 2K Display (6GB RAM, 128GB)', price: 14999, mrp: 24999, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80' },
    { cat: 'Electronics', sub: 'Speakers', brand: 'Portronics', name: 'Portronics SoundDrum P 20W Bluetooth Speaker with TWS & Mic', price: 1999, mrp: 4999, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' },
    { cat: 'Electronics', sub: 'Power banks', brand: 'URBN', name: 'URBN 20000mAh Ultra Compact Fast Charging Power Bank', price: 1399, mrp: 2999, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80' },
    { cat: 'Electronics', sub: 'Chargers', brand: 'Stuffcool', name: 'Stuffcool Neutron 33W Tiny GaN Dual Output Type-C Adapter', price: 1299, mrp: 2299, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80' },
    { cat: 'Electronics', sub: 'Cameras', brand: 'Fujifilm', name: 'Fujifilm Instax Mini 12 Instant Instant Print Camera Gift Bundle', price: 6999, mrp: 8999, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80' },

    // Home & Kitchen
    { cat: 'Home & Kitchen', sub: 'Furniture', brand: 'Nilkamal', name: 'Nilkamal Freedom Tall Plastic Storage Cabinet with Shelves', price: 5499, mrp: 8500, img: 'https://images.unsplash.com/photo-1580481077195-749e38e6ff0b?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Bedsheets', brand: 'D\'Decor', name: 'D\'Decor Live Beautiful 100% Cotton King Bedsheet Set', price: 1899, mrp: 3599, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Curtains', brand: 'Story@Home', name: 'Story@Home 7 Feet Long Door Polyester Curtains (Set of 2)', price: 899, mrp: 1899, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Kitchen appliances', brand: 'Bajaj', name: 'Bajaj Majesty 1603 T 16-Litre Oven Toaster Grill (OTG)', price: 3199, mrp: 5499, img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Cookware', brand: 'Vinod', name: 'Vinod Platinum Triply Stainless Steel Kadai with Lid (2.5L)', price: 1999, mrp: 3100, img: 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Storage products', brand: 'Tupperware', name: 'Tupperware Aquasafe 1 Litre Flip Top Bottles (Set of 4)', price: 899, mrp: 1400, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Home decor', brand: 'ExclusiveLane', name: 'ExclusiveLane Hand-painted Terracotta Warli Vases (Set of 3)', price: 1299, mrp: 2200, img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80' },
    { cat: 'Home & Kitchen', sub: 'Lighting', brand: 'Havells', name: 'Havells Adore 9W B22 LED Cool Day White Bulbs (Pack of 4)', price: 349, mrp: 640, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },

    // Beauty
    { cat: 'Beauty & Personal Care', sub: 'Skincare', brand: 'Plum', name: 'Plum 15% Vitamin C Face Serum with Mandarin for Glowing Skin (30ml)', price: 649, mrp: 790, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80' },
    { cat: 'Beauty & Personal Care', sub: 'Makeup', brand: 'Swiss Beauty', name: 'Swiss Beauty Ultimate 9 Color Eyeshadow Palette (02 Multi)', price: 249, mrp: 349, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80' },
    { cat: 'Beauty & Personal Care', sub: 'Perfumes', brand: 'Villain', name: 'Villain Snake Eau De Parfum for Men (100ml)', price: 749, mrp: 1499, img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80' },
    { cat: 'Beauty & Personal Care', sub: 'Hair care', brand: 'Tresemme', name: 'Tresemme Keratin Smooth Anti-Frizz Hair Shampoo with Argan Oil (1L)', price: 699, mrp: 1100, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80' },
    { cat: 'Beauty & Personal Care', sub: 'Grooming products', brand: 'Havells', name: 'Havells Cordless Rechargeable 4-in-1 Multi Grooming Kit', price: 1699, mrp: 2695, img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80' },

    // Sports & Fitness
    { cat: 'Sports & Fitness', sub: 'Sports shoes', brand: 'Asics', name: 'Asics Men Gel-Contend 8 Running Performance Sports Shoes', price: 3499, mrp: 5499, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'T-shirts', brand: 'HRX', name: 'HRX by Hrithik Roshan Active Rapid-Dry Gym Training T-Shirt', price: 549, mrp: 1199, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'Track pants', brand: 'Jockey', name: 'Jockey Athleisure Straight Fit Cotton Rich Track Pants with Pockets', price: 999, mrp: 1399, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'Gym equipment', brand: 'Aurion', name: 'Aurion PVC Weight Plates & Solid Steel Dumbbell Rod Kit (10kg)', price: 1299, mrp: 2499, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'Fitness accessories', brand: 'Burnlab', name: 'Burnlab Heavy Duty Exercise Resistance Bands with Door Anchor', price: 999, mrp: 1899, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'Cricket products', brand: 'DSC', name: 'DSC Intense Attitude Kashmir Willow Cricket Bat with Grip', price: 1899, mrp: 2999, img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' },
    { cat: 'Sports & Fitness', sub: 'Football products', brand: 'Cosco', name: 'Cosco Rio Rubber Moulded Official Match Football Size 5', price: 549, mrp: 850, img: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80' },

    // Kids
    { cat: 'Kids', sub: 'Boys clothing', brand: 'US Polo Kids', name: 'U.S. Polo Assn. Kids Cotton Pique Colorblock Polo T-Shirt', price: 899, mrp: 1699, img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80' },
    { cat: 'Kids', sub: 'Girls clothing', brand: 'Peppermint', name: 'Peppermint Girls Layered Sparkle Party Tulle Frock', price: 1199, mrp: 2299, img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80' },
    { cat: 'Kids', sub: 'Kids shoes', brand: 'Bata Bubblegummers', name: 'Bubblegummers Kids Breathable Athletic Running Sneakers', price: 799, mrp: 1299, img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80' },
    { cat: 'Kids', sub: 'Toys', brand: 'Funskool', name: 'Funskool Giggles Activity Walker & Stacker Toy for Toddlers', price: 1249, mrp: 1799, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80' },
    { cat: 'Kids', sub: 'School accessories', brand: 'Classmate', name: 'Classmate Octane Neon Gel Pens & Geometry Math Compass Kit', price: 349, mrp: 499, img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80' }
  ];

  subCategoryExpansions.forEach(item => {
    const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
    catalog.push({
      name: item.name,
      brand: item.brand,
      category: item.cat,
      sub_category: item.sub,
      gender: item.cat === 'Men' ? 'Men' : item.cat === 'Women' ? 'Women' : item.cat === 'Kids' ? 'Kids' : 'Unisex',
      price: item.price,
      mrp: item.mrp,
      discount_percent: disc,
      stock: 12 + ((idCounter * 9) % 35),
      rating: Number((4.1 + ((idCounter % 8) / 10)).toFixed(1)),
      reviews_count: 65 + ((idCounter * 83) % 3600),
      sizes: ['Men', 'Women'].includes(item.cat) ? ['S', 'M', 'L', 'XL'] : ['Shoes', 'Kids shoes', 'Sports shoes'].includes(item.sub) ? ['6', '7', '8', '9', '10'] : ['Standard'],
      colors: ['Classic Black', 'Navy', 'Olive Green', 'White'],
      seller_name: ['BUYNEST Direct', 'RetailNet Fashion', 'OmniTech Commerce', 'IndiWeaves Hub'][(idCounter % 4)],
      is_popular: (idCounter % 3 === 0) ? 1 : 0,
      is_featured: (idCounter % 5 === 0) ? 1 : 0,
      image_url: item.img,
      images: [item.img],
      description: `Authentic ${item.name} by ${item.brand}. High quality genuine build designed for longevity and comfort.`,
      specifications: { 'Brand': item.brand, 'Category': item.cat, 'Sub-Category': item.sub, 'Warranty': '1 Year Manufacturer Warranty' },
      tags: [item.brand.toLowerCase(), item.cat.toLowerCase(), item.sub.toLowerCase(), 'top rated', 'buynest']
    });
    idCounter++;
  });

  // Additional 80 products systematically covering each subcategory with authentic marketplace brands
  // to ensure catalog is well over 215 products with wide brand diversity
  const brandSubMatrix = [
    // Men
    { cat: 'Men', sub: 'T-shirts', b: 'US Polo', p: 999, m: 1899 },
    { cat: 'Men', sub: 'T-shirts', b: 'Levis', p: 849, m: 1599 },
    { cat: 'Men', sub: 'Shirts', b: 'Peter England', p: 1199, m: 2199 },
    { cat: 'Men', sub: 'Shirts', b: 'Allen Solly', p: 1449, m: 2699 },
    { cat: 'Men', sub: 'Jeans', b: 'Spykar', p: 1799, m: 3499 },
    { cat: 'Men', sub: 'Jeans', b: 'Flying Machine', p: 1399, m: 2799 },
    { cat: 'Men', sub: 'Trousers', b: 'Blackberrys', p: 1899, m: 3599 },
    { cat: 'Men', sub: 'Trousers', b: 'Raymond', p: 1699, m: 3199 },
    { cat: 'Men', sub: 'Jackets', b: 'Fort Collins', p: 1799, m: 3599 },
    { cat: 'Men', sub: 'Jackets', b: 'Roadster', p: 2199, m: 4299 },
    { cat: 'Men', sub: 'Shoes', b: 'Red Tape', p: 1499, m: 4599 },
    { cat: 'Men', sub: 'Shoes', b: 'Woodland', p: 3295, m: 4995 },
    { cat: 'Men', sub: 'Watches', b: 'Titan', p: 3495, m: 4995 },
    { cat: 'Men', sub: 'Watches', b: 'Fastrack', p: 1395, m: 2195 },
    { cat: 'Men', sub: 'Wallets', b: 'Wildcraft', p: 599, m: 1299 },
    { cat: 'Men', sub: 'Wallets', b: 'Tommy Hilfiger', p: 1399, m: 2499 },
    { cat: 'Men', sub: 'Bags', b: 'American Tourister', p: 1699, m: 3400 },
    { cat: 'Men', sub: 'Bags', b: 'Skybags', p: 1299, m: 2600 },
    { cat: 'Men', sub: 'Sunglasses', b: 'Vincent Chase', p: 899, m: 1899 },
    { cat: 'Men', sub: 'Sunglasses', b: 'Fastrack', p: 999, m: 1699 },

    // Women
    { cat: 'Women', sub: 'Dresses', b: 'Vero Moda', p: 1499, m: 2999 },
    { cat: 'Women', sub: 'Dresses', b: 'Tokyo Talkies', p: 799, m: 1699 },
    { cat: 'Women', sub: 'Tops', b: 'ONLY', p: 699, m: 1499 },
    { cat: 'Women', sub: 'Tops', b: 'AND', p: 999, m: 1999 },
    { cat: 'Women', sub: 'Kurtis', b: 'Biba', p: 1499, m: 2999 },
    { cat: 'Women', sub: 'Kurtis', b: 'Libas', p: 1199, m: 2499 },
    { cat: 'Women', sub: 'Sarees', b: 'Vark', p: 2499, m: 5499 },
    { cat: 'Women', sub: 'Sarees', b: 'Suta', p: 1799, m: 3200 },
    { cat: 'Women', sub: 'Jeans', b: 'Levis', p: 1999, m: 3499 },
    { cat: 'Women', sub: 'Jeans', b: 'Kraus Jeans', p: 1399, m: 2499 },
    { cat: 'Women', sub: 'Trousers', b: 'Marks & Spencer', p: 1799, m: 3199 },
    { cat: 'Women', sub: 'Trousers', b: 'Tokyo Talkies', p: 799, m: 1599 },
    { cat: 'Women', sub: 'Handbags', b: 'Lavie', p: 1499, m: 3499 },
    { cat: 'Women', sub: 'Handbags', b: 'Caprese', p: 1899, m: 4199 },
    { cat: 'Women', sub: 'Shoes', b: 'Metro', p: 1699, m: 2790 },
    { cat: 'Women', sub: 'Shoes', b: 'Mochi', p: 1390, m: 2190 },
    { cat: 'Women', sub: 'Watches', b: 'Titan Raga', p: 3995, m: 6295 },
    { cat: 'Women', sub: 'Watches', b: 'Fossil', p: 6995, m: 11995 },
    { cat: 'Women', sub: 'Jewellery', b: 'GIVA', p: 1499, m: 2999 },
    { cat: 'Women', sub: 'Jewellery', b: 'Zaveri Pearls', p: 999, m: 2899 },
    { cat: 'Women', sub: 'Sunglasses', b: 'Voyage', p: 799, m: 1699 },

    // Electronics
    { cat: 'Electronics', sub: 'Smartphones', b: 'OnePlus', p: 21999, m: 24999 },
    { cat: 'Electronics', sub: 'Smartphones', b: 'Samsung', p: 14999, m: 18999 },
    { cat: 'Electronics', sub: 'Laptops', b: 'ASUS', p: 39990, m: 54990 },
    { cat: 'Electronics', sub: 'Laptops', b: 'Lenovo', p: 46990, m: 61990 },
    { cat: 'Electronics', sub: 'Headphones', b: 'Sony', p: 14990, m: 24990 },
    { cat: 'Electronics', sub: 'Headphones', b: 'JBL', p: 4499, m: 7999 },
    { cat: 'Electronics', sub: 'Earbuds', b: 'boAt', p: 1199, m: 3499 },
    { cat: 'Electronics', sub: 'Earbuds', b: 'Noise', p: 1399, m: 3999 },
    { cat: 'Electronics', sub: 'Smartwatches', b: 'Noise', p: 2499, m: 6999 },
    { cat: 'Electronics', sub: 'Smartwatches', b: 'Fire-Boltt', p: 1599, m: 5999 },
    { cat: 'Electronics', sub: 'Tablets', b: 'Samsung', p: 16999, m: 22999 },
    { cat: 'Electronics', sub: 'Speakers', b: 'JBL', p: 6999, m: 10999 },
    { cat: 'Electronics', sub: 'Power banks', b: 'Mi', p: 1699, m: 2999 },
    { cat: 'Electronics', sub: 'Chargers', b: 'Anker', p: 2199, m: 3699 },
    { cat: 'Electronics', sub: 'Cameras', b: 'GoPro', p: 29990, m: 39990 },

    // Home & Kitchen
    { cat: 'Home & Kitchen', sub: 'Furniture', b: 'Green Soul', p: 11999, m: 18990 },
    { cat: 'Home & Kitchen', sub: 'Bedsheets', b: 'Bombay Dyeing', p: 1099, m: 2299 },
    { cat: 'Home & Kitchen', sub: 'Curtains', b: 'Urban Space', p: 1299, m: 2499 },
    { cat: 'Home & Kitchen', sub: 'Kitchen appliances', b: 'Philips', p: 2999, m: 4799 },
    { cat: 'Home & Kitchen', sub: 'Cookware', b: 'Hawkins', p: 1199, m: 1499 },
    { cat: 'Home & Kitchen', sub: 'Storage products', b: 'Milton', p: 799, m: 1150 },
    { cat: 'Home & Kitchen', sub: 'Home decor', b: 'PureMist', p: 1299, m: 2499 },
    { cat: 'Home & Kitchen', sub: 'Lighting', b: 'Wipro', p: 699, m: 1499 },

    // Beauty
    { cat: 'Beauty & Personal Care', sub: 'Skincare', b: 'Minimalist', p: 499, m: 599 },
    { cat: 'Beauty & Personal Care', sub: 'Makeup', b: 'Maybelline', p: 399, m: 549 },
    { cat: 'Beauty & Personal Care', sub: 'Perfumes', b: 'Bella Vita', p: 599, m: 999 },
    { cat: 'Beauty & Personal Care', sub: 'Hair care', b: "L'Oreal", p: 799, m: 899 },
    { cat: 'Beauty & Personal Care', sub: 'Grooming products', b: 'Philips', p: 1299, m: 1699 },

    // Sports
    { cat: 'Sports & Fitness', sub: 'Sports shoes', b: 'Puma', p: 3299, m: 6499 },
    { cat: 'Sports & Fitness', sub: 'T-shirts', b: 'Cultsport', p: 599, m: 1199 },
    { cat: 'Sports & Fitness', sub: 'Track pants', b: 'Puma', p: 1599, m: 2999 },
    { cat: 'Sports & Fitness', sub: 'Gym equipment', b: 'Decathlon', p: 3999, m: 5499 },
    { cat: 'Sports & Fitness', sub: 'Fitness accessories', b: 'Boldfit', p: 599, m: 1299 },
    { cat: 'Sports & Fitness', sub: 'Cricket products', b: 'SG', p: 1999, m: 3299 },
    { cat: 'Sports & Fitness', sub: 'Football products', b: 'Nivia', p: 999, m: 1599 },

    // Kids
    { cat: 'Kids', sub: 'Boys clothing', b: 'Max Kids', p: 699, m: 1299 },
    { cat: 'Kids', sub: 'Girls clothing', b: 'Pantaloons Junior', p: 999, m: 1899 },
    { cat: 'Kids', sub: 'Kids shoes', b: 'Puma Kids', p: 1499, m: 2499 },
    { cat: 'Kids', sub: 'Toys', b: 'LEGO', p: 2499, m: 3499 },
    { cat: 'Kids', sub: 'School accessories', b: 'Skybags', p: 999, m: 1899 }
  ];

  const defaultImgMap = {
    'Men': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    'Women': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80',
    'Beauty & Personal Care': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    'Sports & Fitness': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'Kids': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'
  };

  brandSubMatrix.forEach(entry => {
    const disc = Math.round(((entry.m - entry.p) / entry.m) * 100);
    const imgUrl = defaultImgMap[entry.cat];
    catalog.push({
      name: `${entry.b} Signature Edition ${entry.sub}`,
      brand: entry.b,
      category: entry.cat,
      sub_category: entry.sub,
      gender: entry.cat === 'Men' ? 'Men' : entry.cat === 'Women' ? 'Women' : entry.cat === 'Kids' ? 'Kids' : 'Unisex',
      price: entry.p,
      mrp: entry.m,
      discount_percent: disc,
      stock: 18 + ((idCounter * 13) % 40),
      rating: Number((4.2 + ((idCounter % 7) / 10)).toFixed(1)),
      reviews_count: 90 + ((idCounter * 107) % 4200),
      sizes: ['Men', 'Women'].includes(entry.cat) ? ['S', 'M', 'L', 'XL'] : ['Shoes', 'Kids shoes', 'Sports shoes'].includes(entry.sub) ? ['6', '7', '8', '9', '10'] : ['Standard'],
      colors: ['Charcoal', 'Midnight Blue', 'Olive', 'Classic White'],
      seller_name: ['BUYNEST Direct', 'RetailNet India', 'OmniTech Commerce', 'IndiWeaves Hub'][(idCounter % 4)],
      is_popular: (idCounter % 2 === 0) ? 1 : 0,
      is_featured: (idCounter % 3 === 0) ? 1 : 0,
      image_url: imgUrl,
      images: [imgUrl],
      description: `Authentic ${entry.b} ${entry.sub}. Certified genuine product on BUYNEST marketplace with manufacturer warranty.`,
      specifications: { 'Brand': entry.b, 'Category': entry.cat, 'Sub-Category': entry.sub, 'Care': 'Standard Manufacturer Instructions' },
      tags: [entry.b.toLowerCase(), entry.cat.toLowerCase(), entry.sub.toLowerCase(), 'popular', 'buynest', 'sale']
    });
    idCounter++;
  });

  return catalog;
}

module.exports = {
  buildFullCatalog
};

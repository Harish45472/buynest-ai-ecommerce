// Grocery Catalog Data (10 subcategories)
module.exports = [
  {
    cat: 'Grocery', sub: 'Snacks', gender: 'Unisex', gst: 12,
    sizes: ['150g Pack', '400g Family Pack', '1kg Party Pack'], colors: ['Classic Masala', 'Pudina Treat', 'Tangy Tomato', 'Salted'],
    items: [
      { b: 'Haldiram\'s', n: 'Nagpur All In One Spicy Savoury Mixture (400g)', p: 135, m: 150 },
      { b: 'Haldiram\'s', n: 'Aloo Bhujia Crispy Potato Mint Noodles (1kg)', p: 265, m: 310 },
      { b: 'Bikaji', n: 'Bhujia Sev Authentic Bikaneri Besan Namkeen (1kg)', p: 279, m: 330 },
      { b: 'Lay\'s', n: 'India\'s Magic Masala Crunchy Potato Chips Party Pack', p: 85, m: 95 },
      { b: 'Kurkure', n: 'Masala Munch Crispy Corn & Rice Puffs (380g)', p: 80, m: 90 },
      { b: 'Doritos', n: 'Nacho Cheese Flavour Crispy Tortilla Chips (150g)', p: 110, m: 130 },
      { b: 'Bingo', n: 'Mad Angles Achaari Masti Triangle Chips (130g)', p: 45, m: 50 },
      { b: 'Haldiram\'s', n: 'Moong Dal Crispy Salted Fried Pulses (400g)', p: 135, m: 155 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Beverages', gender: 'Unisex', gst: 18,
    sizes: ['100g Jar', '200g Jar', '500g Pack', '1 Litre'], colors: ['Rich Aroma', 'Classic Roast', 'Lemon Green', 'Masala Chai'],
    items: [
      { b: 'Nescafe', n: 'Classic 100% Pure Instant Coffee Glass Jar (200g)', p: 685, m: 760 },
      { b: 'Tata Tea', n: 'Gold Premium Assam Tea with Long Leaf (1kg)', p: 589, m: 699 },
      { b: 'Lipton', n: 'Pure & Light Green Tea Bags (100 Tea Bags Pack)', p: 510, m: 600 },
      { b: 'Bru', n: 'Instant Coffee-Chicory Blend Jar (200g)', p: 425, m: 490 },
      { b: 'Paper Boat', n: 'Aamras Real Mango Juice Tetra Pack (1 Litre)', p: 119, m: 140 },
      { b: 'Real', n: 'Mixed Fruit Fruit Power 100% Juice (1 Litre Pack of 2)', p: 235, m: 280 },
      { b: 'Red Bull', n: 'Energy Drink Vitalizes Body and Mind (250ml Pack of 4)', p: 460, m: 500 },
      { b: 'Tata Tea', n: 'Premium Desh Ki Chai Leaf Tea (1kg)', p: 460, m: 530 },
      { b: 'Red Label', n: 'Natural Care Tea with 5 Ayurvedic Herbs (1kg)', p: 540, m: 620 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Rice', gender: 'Unisex', gst: 5,
    sizes: ['1kg Pouch', '5kg Bag', '10kg Bag'], colors: ['Aged Basmati', 'Raw White', 'Steamed Long Grain'],
    items: [
      { b: 'India Gate', n: 'Classic Aged Basmati Rice with Extra Long Grain (5kg)', p: 1099, m: 1350 },
      { b: 'Daawat', n: 'Rozana Super Long Grain Basmati Rice (5kg)', p: 549, m: 699 },
      { b: 'Fortune', n: 'Biryani Special Basmati Rice Extra Fluffy (5kg)', p: 799, m: 999 },
      { b: 'Kohinoor', n: 'Charminar Select Long Grain Basmati Rice (5kg)', p: 499, m: 650 },
      { b: 'Lal Qilla', n: 'Traditional Royale Basmati Rice Aged 2 Years (5kg)', p: 1249, m: 1550 },
      { b: 'India Gate', n: 'Super Premium Basmati Rice (5kg)', p: 899, m: 1120 },
      { b: 'Daawat', n: 'Super Basmati Rice Delicate Fragrance (5kg)', p: 980, m: 1250 },
      { b: 'Fortune', n: 'Everyday Basmati Rice Long Grain Fragrant (5kg)', p: 489, m: 600 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Atta', gender: 'Unisex', gst: 5,
    sizes: ['5kg Bag', '10kg Bag'], colors: ['Whole Wheat', 'Multi-grain', 'Sharbati'],
    items: [
      { b: 'Aashirvaad', n: 'Shuddh Chakki Whole Wheat Atta 100% Sampoorna (10kg)', p: 489, m: 560 },
      { b: 'Aashirvaad', n: 'Select 100% Sharbati Wheat Premium Atta (10kg)', p: 649, m: 750 },
      { b: 'Aashirvaad', n: 'Multigrain Atta with 6 Grain Goodness & High Fibre (5kg)', p: 329, m: 395 },
      { b: 'Fortune', n: 'Chakki Fresh Pure Wheat Soft Roti Atta (10kg)', p: 459, m: 530 },
      { b: 'Pillsbury', n: 'Chakki Fresh Whole Wheat High-Fibre Atta (10kg)', p: 469, m: 540 },
      { b: 'Nature Fresh', n: 'Sampoorna Chakki Atta Traditional Stone Ground (10kg)', p: 445, m: 510 },
      { b: 'Organic Tattva', n: 'Certified Organic Whole Wheat Wheat Atta (5kg)', p: 365, m: 430 },
      { b: 'Tata Sampann', n: '100% Chana Dal Besan Fine Ground Flour (1kg)', p: 110, m: 130 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Pulses', gender: 'Unisex', gst: 5,
    sizes: ['500g Pack', '1kg Pack', '2kg Combo'], colors: ['Unpolished Natural', 'Protein Rich'],
    items: [
      { b: 'Tata Sampann', n: 'Unpolished Toor Dal Pigeon Pea High Protein (1kg)', p: 195, m: 235 },
      { b: 'Tata Sampann', n: 'Unpolished Moong Dal Yellow Split Lentils (1kg)', p: 175, m: 210 },
      { b: 'Tata Sampann', n: 'Unpolished Chana Dal Bengal Gram (1kg)', p: 135, m: 165 },
      { b: 'Organic Tattva', n: 'Certified Organic Kabuli Chana Chickpeas (1kg)', p: 245, m: 290 },
      { b: 'Fortune', n: 'Premium Unpolished Urad Dal Whole Gota (1kg)', p: 185, m: 220 },
      { b: 'Tata Sampann', n: 'Unpolished Masoor Dal Red Lentils (1kg)', p: 145, m: 175 },
      { b: '24 Mantra', n: 'Organic Rajma Chitra Kidney Beans (1kg)', p: 239, m: 285 },
      { b: '24 Mantra', n: 'Organic Moong Whole Green Gram (1kg)', p: 195, m: 240 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Spices', gender: 'Unisex', gst: 5,
    sizes: ['100g Box', '200g Box', '500g Pack'], colors: ['Pure Aromatic Ground', 'Natural Whole'],
    items: [
      { b: 'Everest', n: 'Garam Masala Authentic Blend of 13 Spices (100g)', p: 89, m: 98 },
      { b: 'MDH', n: 'Deggi Mirch Kashmiri Red Chilli Powder Natural Color (100g)', p: 98, m: 110 },
      { b: 'MDH', n: 'Chana Masala Authentic Punjabi Chickpea Spice Blend (100g)', p: 85, m: 95 },
      { b: 'Catch', n: 'Turmeric Haldi Powder High Curcumin Content (500g)', p: 165, m: 195 },
      { b: 'Tata Sampann', n: 'Coriander Dhaniya Powder with Natural Oils (500g)', p: 155, m: 185 },
      { b: 'Everest', n: 'Kitchen King All-Purpose Vegetable Spice Mix (100g)', p: 92, m: 102 },
      { b: 'Badshah', n: 'Royal Biryani Masala Aromatic Rice Spice (100g)', p: 95, m: 110 },
      { b: 'MDH', n: 'Chunky Chat Masala Tangy Spice Blend (100g)', p: 78, m: 88 },
      { b: 'Catch', n: 'Black Pepper Kali Mirch Powder Sprinkler (100g)', p: 125, m: 145 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Cooking Oil', gender: 'Unisex', gst: 5,
    sizes: ['1 Litre Pouch', '1 Litre Bottle', '5 Litre Jar'], colors: ['Refined Gold', 'Cold Pressed Virgin', 'Filtered Pure'],
    items: [
      { b: 'Fortune', n: 'Sunlite Refined Sunflower Oil Enriched with Vitamins (1L)', p: 149, m: 175 },
      { b: 'Saffola', n: 'Gold Pro Healthy Heart Blended Cooking Oil (5L Jar)', p: 899, m: 1150 },
      { b: 'Fortune', n: 'Kachi Ghani Pure Mustard Oil Traditional Cold-Pressed (1L)', p: 159, m: 185 },
      { b: 'Figaro', n: 'Pure Olive Oil for Everyday Cooking & Sautéing (1L)', p: 899, m: 1199 },
      { b: 'Borges', n: 'Extra Virgin Olive Oil Cold Extracted from Spain (1L)', p: 1149, m: 1499 },
      { b: 'Dhara', n: 'Refined Groundnut Oil Authentic Peanut Flavour (1L)', p: 195, m: 230 },
      { b: 'Fortune', n: 'Soya Health Refined Soyabean Oil with Omega 3 (5L)', p: 689, m: 820 },
      { b: 'Emami', n: 'Healthy & Tasty Refined Rice Bran Oil (1L)', p: 155, m: 185 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Breakfast Foods', gender: 'Unisex', gst: 12,
    sizes: ['400g Box', '800g Pouch', '1kg Value Pack'], colors: ['Original Crisp', 'Fruit & Nut', 'Honey Almond', 'Chocolate Crunch'],
    items: [
      { b: 'Kellogg\'s', n: 'Corn Flakes Original High in Iron & B-Vitamins (1.2kg)', p: 395, m: 460 },
      { b: 'Kellogg\'s', n: 'Chocos Crunchy Chocolate Cereal Value Pack (1.2kg)', p: 445, m: 520 },
      { b: 'Quaker', n: 'Rolled Oats 100% Whole Grain High Fibre Breakfast (1kg)', p: 189, m: 225 },
      { b: 'Saffola', n: 'Masala Oats Classic Masala Burst with Real Veggies (1kg)', p: 210, m: 250 },
      { b: 'Bagrry\'s', n: 'Crunchy Muesli Fruit & Nut with 40% Cranberry & Almonds (1kg)', p: 489, m: 625 },
      { b: 'Kellogg\'s', n: 'Muesli with 21% Fruit Magic 4 Grains (750g)', p: 385, m: 475 },
      { b: 'Pintola', n: 'All-Natural Creamy Peanut Butter High Protein (1kg)', p: 425, m: 499 },
      { b: 'Kellogg\'s', n: 'All-Bran Wheat Flakes High Fibre (440g)', p: 215, m: 250 },
      { b: 'Alpino', n: 'Natural Crunchy Peanut Butter Unsweetened (1kg)', p: 415, m: 499 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Chocolates', gender: 'Unisex', gst: 18,
    sizes: ['150g Bar', '300g Gift Pack', '16 Pieces Box'], colors: ['Rich Cocoa', 'Milk Chocolate', 'Hazelnut Praline', 'Dark Intense'],
    items: [
      { b: 'Cadbury', n: 'Dairy Milk Silk Chocolate Bar Smooth & Creamy (150g)', p: 175, m: 195 },
      { b: 'Cadbury', n: 'Dairy Milk Silk Roast Almond Chocolate Bar (143g)', p: 185, m: 200 },
      { b: 'Ferrero Rocher', n: 'Crisp Hazelnut and Milk Chocolate Pralines Box (16 Pieces)', p: 649, m: 749 },
      { b: 'Amul', n: 'Dark Chocolate 55% Rich Cocoa Butter (150g)', p: 110, m: 125 },
      { b: 'Lindt', n: 'Excellence 70% Cocoa Intense Dark Chocolate Bar (100g)', p: 349, m: 399 },
      { b: 'Cadbury', n: 'Celebrations Rich Premium Dry Fruit Gift Pack (177g)', p: 299, m: 350 },
      { b: 'Nestle', n: 'KitKat 4 Finger Crunchy Wafer Chocolate Share Pack (Pack of 6)', p: 150, m: 165 },
      { b: 'Hershey\'s', n: 'Kisses Milk Chocolate Deluxe Bag (150g)', p: 165, m: 190 }
    ]
  },
  {
    cat: 'Grocery', sub: 'Dry Fruits', gender: 'Unisex', gst: 12,
    sizes: ['250g Pouch', '500g Jar', '1kg Value Pack'], colors: ['Natural Raw', 'Roasted & Lightly Salted', 'Jumbo Organic'],
    items: [
      { b: 'Happilo', n: 'Premium California Inshell / Shelled Almonds (500g)', p: 449, m: 625 },
      { b: 'Happilo', n: 'Premium Whole Cashews Mangalore W320 Grade (500g)', p: 499, m: 699 },
      { b: 'Nutraj', n: 'Bactopure California Walnut Kernels Halves (500g)', p: 589, m: 850 },
      { b: 'Happilo', n: 'Premium Afghan Green Seedless Raisins Kishmish (500g)', p: 229, m: 325 },
      { b: 'Solimo', n: 'Premium Iranian Roasted & Salted Pistachios (500g)', p: 699, m: 950 },
      { b: 'Happilo', n: '100% Natural Premium Kashmiri Mukhwas Medjoul Dates (500g)', p: 349, m: 499 },
      { b: 'Rostaa', n: 'Gourmet Berries & Seeds Trail Mix Antioxidant Rich (400g)', p: 475, m: 625 },
      { b: 'Happilo', n: 'Raw Pumpkin Seeds Roasted Crunchy (250g)', p: 249, m: 345 },
      { b: 'Nutraj', n: 'Classic Dried Turkish Apricots Khubani (500g)', p: 429, m: 599 }
    ]
  }
];

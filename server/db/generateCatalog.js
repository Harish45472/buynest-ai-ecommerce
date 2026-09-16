// Generator for 650+ realistic Indian e-commerce products
const fs = require('fs');
const path = require('path');

// Curated high quality Unsplash product photography per category/subcategory
const categoryImages = {
  // Men
  'Men_T-shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'
  ],
  'Men_Shirts': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80'
  ],
  'Men_Jeans': [
    'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80'
  ],
  'Men_Trousers': [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'
  ],
  'Men_Hoodies': [
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'
  ],
  'Men_Jackets': [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80',
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80'
  ],
  'Men_Ethnic wear': [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
  ],
  'Men_Formal wear': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
  ],
  'Men_Innerwear': [
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80'
  ],
  'Men_Shoes': [
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'
  ],
  'Men_Sneakers': [
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80'
  ],
  'Men_Sandals': [
    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80'
  ],
  'Men_Watches': [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
  ],
  'Men_Wallets': [
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'
  ],
  'Men_Belts': [
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'
  ],
  'Men_Sunglasses': [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'
  ],
  'Men_Bags': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
  ],

  // Women
  'Women_Dresses': [
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80'
  ],
  'Women_Tops': [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80'
  ],
  'Women_Kurtis': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'
  ],
  'Women_Sarees': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    'https://images.unsplash.com/photo-1583391733975-ae92c10b7b12?w=800&q=80'
  ],
  'Women_Lehengas': [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'
  ],
  'Women_Salwar suits': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
  ],
  'Women_Jeans': [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80'
  ],
  'Women_Trousers': [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'
  ],
  'Women_Ethnic wear': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
  ],
  'Women_Western wear': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80'
  ],
  'Women_Heels': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=800&q=80'
  ],
  'Women_Sneakers': [
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'
  ],
  'Women_Sandals': [
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80'
  ],
  'Women_Handbags': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'
  ],
  'Women_Watches': [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'
  ],
  'Women_Jewellery': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80'
  ],
  'Women_Sunglasses': [
    'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
  ],

  // Kids
  'Kids_Boys clothing': [
    'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80'
  ],
  'Kids_Girls clothing': [
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80',
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80'
  ],
  'Kids_Baby clothing': [
    'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80'
  ],
  'Kids_Kids shoes': [
    'https://images.unsplash.com/photo-1514989940743-e8e12909be75?w=800&q=80'
  ],
  'Kids_Toys': [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80'
  ],
  'Kids_School accessories': [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80'
  ],

  // Electronics
  'Electronics_Smartphones': [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
  ],
  'Electronics_Laptops': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80'
  ],
  'Electronics_Tablets': [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80'
  ],
  'Electronics_Smart TVs': [
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'
  ],
  'Electronics_Earbuds': [
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80'
  ],
  'Electronics_Headphones': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
  ],
  'Electronics_Smartwatches': [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80'
  ],
  'Electronics_Speakers': [
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
  ],
  'Electronics_Cameras': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    'https://images.unsplash.com/photo-1502982720700-bfff97f2da6d?w=800&q=80'
  ],
  'Electronics_Gaming accessories': [
    'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
    'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80'
  ],
  'Electronics_Power banks': [
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'
  ],
  'Electronics_Chargers': [
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80'
  ],
  'Electronics_Computer accessories': [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
  ],

  // Home & Kitchen
  'Home & Kitchen_Furniture': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
  ],
  'Home & Kitchen_Bedsheets': [
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80'
  ],
  'Home & Kitchen_Curtains': [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
  ],
  'Home & Kitchen_Kitchen appliances': [
    'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80',
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80'
  ],
  'Home & Kitchen_Cookware': [
    'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80'
  ],
  'Home & Kitchen_Storage products': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  ],
  'Home & Kitchen_Home decor': [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&q=80'
  ],
  'Home & Kitchen_Lighting': [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&q=80'
  ],

  // Beauty & Personal Care
  'Beauty & Personal Care_Skincare': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80'
  ],
  'Beauty & Personal Care_Makeup': [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80'
  ],
  'Beauty & Personal Care_Perfumes': [
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80'
  ],
  'Beauty & Personal Care_Hair care': [
    'https://images.unsplash.com/photo-1608248597358-005d76d49cb0?w=800&q=80',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80'
  ],
  'Beauty & Personal Care_Grooming products': [
    'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80'
  ],
  'Beauty & Personal Care_Personal hygiene': [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'
  ],

  // Sports & Fitness
  'Sports & Fitness_Sports shoes': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80'
  ],
  'Sports & Fitness_T-shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'
  ],
  'Sports & Fitness_Track pants': [
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80'
  ],
  'Sports & Fitness_Gym equipment': [
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
  ],
  'Sports & Fitness_Fitness accessories': [
    'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80'
  ],
  'Sports & Fitness_Cricket products': [
    'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=800&q=80'
  ],
  'Sports & Fitness_Football products': [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80'
  ],
  'Sports & Fitness_Badminton racquets': [
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80'
  ],
  'Sports & Fitness_Yoga mats': [
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'
  ]
};

// Fallback images for any category
const fallbackImages = {
  'Men': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  'Women': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  'Kids': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80',
  'Beauty & Personal Care': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
  'Sports & Fitness': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
};

// Subcategories with 8-10 authentic Indian e-commerce products each
const subcategoryDefinitions = [
  // ----------------------------------------------------
  // MEN (17 subcategories)
  // ----------------------------------------------------
  {
    category: 'Men',
    sub_category: 'T-shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue', 'Maroon', 'Olive Green', 'Black', 'White'],
    gst: 5,
    items: [
      { name: 'Roadster Pure Cotton Solid Crew Neck T-shirt', brand: 'Roadster', p: 499, m: 999, desc: 'Breathable 100% combed bio-washed cotton round neck t-shirt for everyday casual comfort.' },
      { name: 'Wrogn Typography Printed Slim Fit T-shirt', brand: 'Wrogn', p: 799, m: 1599, desc: 'Trendy graphic streetwear t-shirt crafted with premium cotton blend for modern urban styles.' },
      { name: 'U.S. Polo Assn. Classic Pique Polo T-shirt', brand: 'U.S. Polo Assn.', p: 1199, m: 2199, desc: 'Iconic polo collar t-shirt with embroidered brand logo and ribbed collar cuffs.' },
      { name: 'Puma Men Graphic Active Cotton Tee', brand: 'Puma', p: 899, m: 1799, desc: 'Sporty activewear casual t-shirt with moisture wicking dryCELL finish.' },
      { name: 'Levi’s Men Batwing Logo Printed T-shirt', brand: 'Levi’s', p: 1049, m: 1699, desc: 'Timeless casual tee featuring the signature red batwing Levi’s chest graphic.' },
      { name: 'HRX by Hrithik Roshan Rapid-Dry Training T-shirt', brand: 'HRX', p: 649, m: 1299, desc: 'Lightweight performance gym t-shirt featuring anti-microbial rapid-dry fabric.' },
      { name: 'Jack & Jones Striped Regular Fit T-shirt', brand: 'Jack & Jones', p: 849, m: 1499, desc: 'Maritime yarn-dyed horizontal stripe crew t-shirt with soft handfeel.' },
      { name: 'Under Armour Sportstyle Chest Logo T-shirt', brand: 'Under Armour', p: 1499, m: 2299, desc: 'Charged Cotton fabric that dries fast while maintaining supreme softness.' },
      { name: 'Flying Machine Solid Henley Neck T-shirt', brand: 'Flying Machine', p: 699, m: 1399, desc: '3-button placket waffle knit henley t-shirt for rugged weekend casuals.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Shirts',
    gender: 'Men',
    sizes: ['38', '40', '42', '44'],
    colors: ['Sky Blue', 'Crisp White', 'Soft Pink', 'Navy', 'Olive'],
    gst: 12,
    items: [
      { name: 'Allen Solly Men Slim Fit Formal Poplin Shirt', brand: 'Allen Solly', p: 1399, m: 2499, desc: 'Crisp poplin weave tailored shirt designed for corporate workwear and formal meetings.' },
      { name: 'Highlander Buffalo Checked Casual Cotton Shirt', brand: 'Highlander', p: 749, m: 1699, desc: 'Bold buffalo check flannel shirt with twin chest pockets and button-down collar.' },
      { name: 'Peter England Classic Fit Easy-Care Formal Shirt', brand: 'Peter England', p: 999, m: 1799, desc: 'Wrinkle-resistant blended formal shirt engineered for all-day office comfort.' },
      { name: 'Louis Philippe Premium Luxure Pure Giza Cotton Shirt', brand: 'Louis Philippe', p: 2499, m: 3999, desc: 'Ultra-luxurious 100% long-staple Egyptian Giza cotton luxury dress shirt.' },
      { name: 'Arrow New York Men Manhattan Slim Fit Shirt', brand: 'Arrow', p: 1599, m: 2799, desc: 'Sleek metropolitan cut dress shirt with semi-cutaway collar and French placket.' },
      { name: 'Van Heusen Men Antibacterial Solid Dress Shirt', brand: 'Van Heusen', p: 1449, m: 2299, desc: 'Smart formal shirt enhanced with silver-ion antibacterial odor resistance.' },
      { name: 'Roadster Washed Denim Button-Down Casual Shirt', brand: 'Roadster', p: 899, m: 1999, desc: 'Heavyweight indigo washed denim shirt with pearl snap buttons and curved hem.' },
      { name: 'Raymond Tailored Fine Micro-Structure Cotton Shirt', brand: 'Raymond', p: 1799, m: 2999, desc: 'Signature Raymond bespoke finish shirt woven from 80s two-ply combed yarns.' },
      { name: 'Blackberrys Tech-Stretch Slim Formal Shirt', brand: 'Blackberrys', p: 1699, m: 2699, desc: '4-way mobility stretch fabric shirt that keeps you crisp from desk to dinner.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Jeans',
    gender: 'Men',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Dark Indigo', 'Washed Light Blue', 'Charcoal Black', 'Distressed Grey'],
    gst: 12,
    items: [
      { name: 'Levi’s Men 511 Slim Fit Stretchable Jeans', brand: 'Levi’s', p: 2399, m: 3999, desc: 'Modern slim fit cut with added stretch flexibility for comfort without losing shape.' },
      { name: 'Wrangler Skanders Authentic Low Rise Slim Jeans', brand: 'Wrangler', p: 1899, m: 3299, desc: 'Heritage American denim with reinforced rivets and 7-icon Wrangler waistband.' },
      { name: 'Spykar Men Super Skinny Fit Washed Jeans', brand: 'Spykar', p: 1649, m: 3499, desc: 'High recovery power-stretch denim with stylish hand-scraped whiskering.' },
      { name: 'Pepe Jeans London Men Finham Tapered Jeans', brand: 'Pepe Jeans', p: 2199, m: 3799, desc: 'Contemporary tapered leg denim washed with eco-friendly ozone technology.' },
      { name: 'Flying Machine Men Michael Jackson Tapered Jeans', brand: 'Flying Machine', p: 1499, m: 2799, desc: 'Youthful urban fit denim with clean back pockets and stone-wash tint.' },
      { name: 'Killer Men Authentic Rugged Casual Denim', brand: 'Killer', p: 1599, m: 3199, desc: 'Durable twill weave denim with contrast copper stitching and reinforced seat.' },
      { name: 'Jack & Jones Glenn Original Slim Fit Jeans', brand: 'Jack & Jones', p: 1999, m: 3499, desc: 'Classic 5-pocket styling updated with Danish minimalist wash aesthetics.' },
      { name: 'Mufti Men Mild Distress Urban Indigo Jeans', brand: 'Mufti', p: 1899, m: 3599, desc: 'Original expressive casual wear jeans with signature Mufti wave embroidery.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Trousers',
    gender: 'Men',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy Blue', 'Olive Drab', 'Slate Grey', 'Jet Black'],
    gst: 12,
    items: [
      { name: 'Dockers Signature Khaki Lux Cotton Stretch Pant', brand: 'Dockers', p: 2499, m: 4499, desc: 'The gold standard in flat front khakis featuring Stain Defender technology.' },
      { name: 'Park Avenue Men Regular Fit Formal Poly-Viscose Trousers', brand: 'Park Avenue', p: 1499, m: 2499, desc: 'Sharp formal trousers with permanent press crease and stretch waistband.' },
      { name: 'Peter England Men Slim Fit Business Chinos', brand: 'Peter England', p: 1199, m: 1999, desc: 'Smart casual stretch chinos perfect for boardroom or casual weekend evenings.' },
      { name: 'Raymond Classic Pleated Wool Blend Trousers', brand: 'Raymond', p: 1999, m: 3299, desc: 'Refined double pleated executive trousers made from premium Australian merino blend.' },
      { name: 'Indian Terrain Brooklyn Solid Slim Fit Chinos', brand: 'Indian Terrain', p: 1699, m: 2699, desc: 'Peach finished twill cotton trousers designed for rugged Indian elegance.' },
      { name: 'Blackberrys Phoenix Slim Fit Formal Trousers', brand: 'Blackberrys', p: 1849, m: 2899, desc: 'Tapered silhouette with flexi-waistband for sophisticated corporate styling.' },
      { name: 'Van Heusen Men Travel Smart Wrinkle-Free Trousers', brand: 'Van Heusen', p: 1749, m: 2799, desc: 'Engineered for the jet-setting professional with water and stain repellent fabric.' },
      { name: 'ColorPlus Men Classic Fit Casual Chinos', brand: 'ColorPlus', p: 2199, m: 3499, desc: 'Golfball wash brushed cotton chinos with unmatched velvet softness.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Hoodies',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Heather Grey', 'Charcoal', 'Burgundy', 'Mustard', 'Black'],
    gst: 12,
    items: [
      { name: 'Roadster Heavyweight Fleece Kangaroo Pocket Hoodie', brand: 'Roadster', p: 1099, m: 2499, desc: 'Cozy 320 GSM brushed fleece pullover hoodie with metal aglets and rib trim.' },
      { name: 'Puma Men Graphic French Terry Pullover Hoodie', brand: 'Puma', p: 2199, m: 3999, desc: 'Athletic lifestyle hoodie featuring oversized Puma No.1 rubberized chest print.' },
      { name: 'Nike Sportswear Club Fleece Full-Zip Hoodie', brand: 'Nike', p: 3299, m: 4995, desc: 'Standard fit full zip fleece hoodie offering warmth, comfort, and street credibility.' },
      { name: 'Wrogn Men Colorblocked Cotton Fleece Hoodie', brand: 'Wrogn', p: 1499, m: 2999, desc: 'Edgy streetwear colorblock pattern with adjustable toggle drawstring hood.' },
      { name: 'H&M Relaxed Fit French Terry Cotton Hoodie', brand: 'H&M', p: 1499, m: 2299, desc: 'Drop-shoulder relaxed hoodie in pure organic cotton loopback knit.' },
      { name: 'Superdry Vintage Logo Embroidered Zip Hoodie', brand: 'Superdry', p: 4499, m: 6999, desc: 'Heavyweight loopback fleece hoodie with three-color vintage cracked chest graphic.' },
      { name: 'Under Armour Rival Fleece Pullover Hoodie', brand: 'Under Armour', p: 2799, m: 4299, desc: 'Warm, ultra-soft cotton-blend fleece with brushed interior for extra chill protection.' },
      { name: 'Adidas Originals Trefoil Classic Adicolor Hoodie', brand: 'Adidas', p: 3599, m: 5599, desc: 'Iconic adidas Trefoil heritage hoodie crafted from heavyweight BCI cotton fleece.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Jackets',
    gender: 'Men',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Tan', 'Racer Black', 'Army Green', 'Dark Navy'],
    gst: 12,
    items: [
      { name: 'Roadster Distressed Faux Biker Leather Jacket', brand: 'Roadster', p: 2699, m: 5999, desc: 'Asymmetrical zipper moto jacket with quilted shoulder panels and snap collar.' },
      { name: 'Wildcraft Men Packable Lightweight Down Puffer Jacket', brand: 'Wildcraft', p: 2999, m: 4999, desc: 'Heat-retaining insulated winter jacket compressible into its own self-pocket.' },
      { name: 'Fort Collins Men Reversible Bomber Winter Jacket', brand: 'Fort Collins', p: 1699, m: 3499, desc: 'Two-in-one reversible padded jacket with windproof matte nylon shell.' },
      { name: 'Columbia Men Flash Forward Windbreaker Jacket', brand: 'Columbia', p: 3999, m: 5999, desc: 'Water-resistant lightweight shell designed for trail hiking and rainy commutes.' },
      { name: 'Woodland Men Rugged Adventure Utility Jacket', brand: 'Woodland', p: 3499, m: 6495, desc: 'Heavy canvas outdoor jacket with cargo chest pockets and storm flap zipper.' },
      { name: 'US Polo Assn Men Quilted Stand Collar Vest Jacket', brand: 'U.S. Polo Assn.', p: 1899, m: 3599, desc: 'Sleeveless lightweight gilet with warm polyester fill and brand embroidery.' },
      { name: 'Puma Men WarmCELL Padded Winter Jacket', brand: 'Puma', p: 3799, m: 6999, desc: 'Thermal insulation traps heat close to the body to keep you warm in freezing conditions.' },
      { name: 'Levi’s Men Authentic Sherpa Lined Trucker Denim Jacket', brand: 'Levi’s', p: 4899, m: 7999, desc: 'Legendary denim trucker jacket lined with cozy fuzzy faux shearling.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Ethnic wear',
    gender: 'Men',
    sizes: ['38', '40', '42', '44'],
    colors: ['Maroon Gold', 'Ivory Cream', 'Royal Blue', 'Emerald Green', 'Mustard Yellow'],
    gst: 12,
    items: [
      { name: 'Manyavar Embroidered Silk Blend Sherwani Set', brand: 'Manyavar', p: 8999, m: 14999, desc: 'Opulent wedding sherwani with zari embroidery, churidar pants, and regal buttons.' },
      { name: 'Fabindia Men Pure Silk Tussar Long Kurta', brand: 'Fabindia', p: 2999, m: 4590, desc: 'Handcrafted tussar silk kurta featuring traditional mandarin collar and side slits.' },
      { name: 'Kisan Craft Men Cotton Jacquard Kurta Pyjama Set', brand: 'Manyavar', p: 2199, m: 3999, desc: 'Breathable festive woven jacquard kurta paired with relaxed drawstring pyjamas.' },
      { name: 'Sanwara Men Embroidered Nehru Jacket Bundi', brand: 'Sanwara', p: 1499, m: 2999, desc: 'Sleeveless mandarin collar Modi jacket in rich brocade silk with welt pockets.' },
      { name: 'Ethnix by Raymond Pure Linen Festive Kurta', brand: 'Raymond', p: 2499, m: 3999, desc: 'Woven from 100% fine French flax linen for breezy celebratory comfort.' },
      { name: 'Sojanya Men Royal Silk Blend Kurta Dhoti Set', brand: 'Sojanya', p: 1899, m: 3499, desc: 'Traditional festive ensemble with ready-to-wear pleated dhoti and gold-trim kurta.' },
      { name: 'Vastramay Men Asymmetric Indo-Western Achkan Kurta', brand: 'Vastramay', p: 2299, m: 4299, desc: 'Modern diagonal crossover button closure designed for sangeet and reception nights.' },
      { name: 'House of Pataudi Men Rozana Printed Kurta', brand: 'House of Pataudi', p: 1299, m: 2499, desc: 'Inspired by royal Awadhi motifs printed on soft breathable cambric cotton.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Formal wear',
    gender: 'Men',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Midnight Black', 'Charcoal Grey', 'Navy Blue'],
    gst: 12,
    items: [
      { name: 'Raymond Men Slim Fit 2-Piece Single Breasted Suit', brand: 'Raymond', p: 7999, m: 12999, desc: 'Finest poly-wool tailored 2-button jacket and matching flat-front formal trousers.' },
      { name: 'Park Avenue Men Formal Evening Blazer', brand: 'Park Avenue', p: 4499, m: 7999, desc: 'Structured single breasted blazer with notch lapel and dual back vents.' },
      { name: 'Louis Philippe Men Permapress Formal Two-Piece Suit', brand: 'Louis Philippe', p: 9999, m: 16999, desc: 'Impeccably tailored luxury executive suit with wrinkle-resistant finish.' },
      { name: 'Van Heusen Men Tuxedo Dinner Jacket with Satin Lapel', brand: 'Van Heusen', p: 5499, m: 8999, desc: 'Black-tie dinner blazer with peak satin lapels and bespoke covered buttons.' },
      { name: 'Blackberrys Men Slim Fit Textured Formal Blazer', brand: 'Blackberrys', p: 4199, m: 6999, desc: 'Micro-houndstooth patterned tailored coat ideal for conferences and galas.' },
      { name: 'Arrow Men Formal Executive Three-Piece Vest Suit', brand: 'Arrow', p: 8499, m: 13999, desc: 'Includes tailored blazer, matching waistcoat, and trousers for full formality.' },
      { name: 'Peter England Elite Textured Evening Blazer', brand: 'Peter England', p: 3299, m: 5999, desc: 'Sophisticated lightweight poly-viscose blazer with contrast interior piping.' },
      { name: 'Manq Men Slim Fit Formal Casual Blazer', brand: 'MANQ', p: 2499, m: 4999, desc: 'Budget-friendly modern cut blazer suitable for formal interviews and party wear.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Innerwear',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey Melange', 'Navy', 'White'],
    gst: 5,
    items: [
      { name: 'Jockey Men Modern Classic Cotton Boxer Briefs (Pack of 2)', brand: 'Jockey', p: 599, m: 699, desc: 'Super combed cotton rib fabric with ultrasoft waistband and double-layered pouch.' },
      { name: 'Calvin Klein Men Cotton Stretch Trunks (Pack of 3)', brand: 'Calvin Klein', p: 2899, m: 3999, desc: 'Iconic CK logo elastic waistband with 4-way stretch body-defining fit.' },
      { name: 'XYXX Men Bamboo Micro Modal Super Soft Trunks', brand: 'XYXX', p: 649, m: 899, desc: 'Crafted from sustainable beechwood micro modal, 3x softer than cotton.' },
      { name: 'Jockey Zone Breathable Active Performance Trunks', brand: 'Jockey', p: 379, m: 429, desc: 'Moisture wicking microfiber waistband with side mesh panels for ventilation.' },
      { name: 'U.S. Polo Assn. Men Printed Cotton Woven Boxers', brand: 'U.S. Polo Assn.', p: 699, m: 999, desc: 'Pure cotton loose lounge boxers with back patch pocket and button fly.' },
      { name: 'Van Heusen Men Anti-Bacterial Cotton Rich Vests (Pack of 2)', brand: 'Van Heusen', p: 499, m: 649, desc: 'Contoured armholes and flat seams for smooth invisible wear beneath dress shirts.' },
      { name: 'Damensch Deo-Soft Micromodal Odor-Resistant Trunks', brand: 'Damensch', p: 599, m: 799, desc: 'Thermally regulating fabric that stays fresh through 14 hours of humid wear.' },
      { name: 'Dollar Bigboss Men Combed Cotton Ribbed Briefs (Pack of 4)', brand: 'Dollar', p: 449, m: 599, desc: 'Value pack of durable 100% cotton briefs with snug elastic leg openings.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Shoes',
    gender: 'Men',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: ['Tan Brown', 'Glossy Black', 'Oxblood', 'Dark Brown'],
    gst: 18,
    items: [
      { name: 'Bata Men Formal Genuine Leather Oxford Shoes', brand: 'Bata', p: 1899, m: 2999, desc: 'Handcrafted genuine leather closed-lace formal shoes with anti-skid TPR sole.' },
      { name: 'Clarks Men Whiddon Cap Leather Derby Shoes', brand: 'Clarks', p: 4499, m: 6999, desc: 'Cushion Soft technology footbed providing supreme shock absorption and formal class.' },
      { name: 'Hush Puppies Men Formal Slip-On Leather Loafers', brand: 'Hush Puppies', p: 3499, m: 5499, desc: 'ZeroG lightweight outsole with memory foam padded insole for all-day standing.' },
      { name: 'Woodland Men Genuine Leather Casual Rugged Derbys', brand: 'Woodland', p: 3295, m: 4995, desc: 'Heavy-duty oil pull-up leather upper with deep lug rubber traction outsole.' },
      { name: 'Red Tape Men Genuine Leather Perforated Brogues', brand: 'Red Tape', p: 2199, m: 4795, desc: 'Classic wingtip brogue detailing with burnished toe and soft leather lining.' },
      { name: 'Louis Philippe Men Handcrafted Tan Leather Penny Loafers', brand: 'Louis Philippe', p: 3999, m: 5999, desc: 'Sleek driving loafers adorned with saddle strap and flexible moccasin construction.' },
      { name: 'Lee Cooper Men Formal Leather Slip-On Shoes', brand: 'Lee Cooper', p: 1999, m: 3499, desc: 'Elastic side gussets for easy on-and-off with clean polished cap-toe design.' },
      { name: 'Ruosh Men Handcrafted Crust Leather Double Monk Straps', brand: 'Ruosh', p: 4990, m: 7990, desc: 'Dual buckle monk strap dress shoe with rich artisan hand-patina finish.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Sneakers',
    gender: 'Men',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: ['Triple White', 'Core Black', 'Panda (Black/White)', 'Grey/Navy'],
    gst: 18,
    items: [
      { name: 'Nike Court Vision Low Casual Retro Sneakers', brand: 'Nike', p: 4495, m: 5695, desc: '1980s basketball fastbreak style recreated with crisp leather upper and pivot-point sole.' },
      { name: 'Puma Smash v2 Leather Casual Heritage Sneakers', brand: 'Puma', p: 2499, m: 4499, desc: 'Clean tennis silhouette with soft leather upper and comfortable SoftFoam+ insert.' },
      { name: 'Adidas Originals Stan Smith Classic White Sneakers', brand: 'Adidas', p: 5999, m: 7999, desc: 'The quintessential minimalist court sneaker featuring perforated 3-Stripes.' },
      { name: 'Converse Chuck Taylor All Star Canvas High Tops', brand: 'Converse', p: 3299, m: 4499, desc: 'Iconic vulcanized rubber sole and star ankle patch worn by rock and street icons.' },
      { name: 'Red Tape Men Air Cushion Walking Lifestyle Sneakers', brand: 'Red Tape', p: 1699, m: 5599, desc: 'Dynamic flyknit breathable upper with responsive visible air bubble unit.' },
      { name: 'Vans Old Skool Suede & Canvas Skate Sneakers', brand: 'Vans', p: 3799, m: 4999, desc: 'Padded collars for support and signature rubber waffle outsoles.' },
      { name: 'US Polo Assn Men Panal Low Top Casual Sneakers', brand: 'U.S. Polo Assn.', p: 1899, m: 3299, desc: 'Versatile low-top trainers with contrast color heel tab and embossed logo.' },
      { name: 'New Balance 574 Core Retro Heritage Sneakers', brand: 'New Balance', p: 6499, m: 8999, desc: 'ENCAP midsole cushioning combines lightweight foam with a durable polyurethane rim.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Sandals',
    gender: 'Men',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: ['Camel Brown', 'Navy Black', 'Olive Tan'],
    gst: 12,
    items: [
      { name: 'Woodland Men Camel Brown Nubuck Leather Sandals', brand: 'Woodland', p: 2795, m: 3995, desc: 'Rugged outdoor leather strappy sandals with adjustable velcro fastenings.' },
      { name: 'Bata Men Comfit Cushion Foam Daily Sandals', brand: 'Bata', p: 999, m: 1499, desc: 'Ergonomic footbed with arch support for comfortable day-long walking.' },
      { name: 'Crocs Classic Clog Slip-On Waterproof Sandals', brand: 'Crocs', p: 2495, m: 3495, desc: 'Legendary Croslite foam footbed that molds to feet with ventilation ports.' },
      { name: 'Puma Softride Adjustable Strap Outdoor Slides', brand: 'Puma', p: 1499, m: 2499, desc: 'Softride foam midsole paired with padded synthetic leather strap.' },
      { name: 'Paragon Vertex Men Casual Sporty Sandals', brand: 'Paragon', p: 599, m: 899, desc: 'Durable PU sole with tough webbed straps for reliable monsoon performance.' },
      { name: 'Red Chief Men Genuine Leather Fisherman Sandals', brand: 'Red Chief', p: 2199, m: 3895, desc: 'Enclosed toe gladiator design with breathable perforations and rubber tread.' },
      { name: 'Sparx Men Athletic Grip Outdoor Floater Sandals', brand: 'Sparx', p: 799, m: 1199, desc: 'High-traction grooved outsole with quick-drying synthetic straps.' },
      { name: 'Birkenstock Arizona Two-Strap Cork Footbed Sandals', brand: 'Birkenstock', p: 5990, m: 7990, desc: 'Anatomically shaped cork-latex footbed delivering orthotic spinal alignment.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Watches',
    gender: 'Men',
    sizes: ['Free Size (Dial 42mm)', 'Dial 44mm'],
    colors: ['Silver Stainless', 'Matte Black', 'Rose Gold & Brown Leather'],
    gst: 18,
    items: [
      { name: 'Titan Karishma Analog Dial Stainless Steel Watch', brand: 'Titan', p: 2495, m: 3495, desc: 'Dependable quartz mechanism with date window, mineral glass, and metallic jubilee bracelet.' },
      { name: 'Casio Vintage Digital Illuminator Silver Watch A168W', brand: 'Casio', p: 2695, m: 2995, desc: 'Cult retro icon featuring electro-luminescent backlight, daily alarm, and 1/100 sec stopwatch.' },
      { name: 'Fossil Grant Chronograph Blue Dial Brown Leather Watch', brand: 'Fossil', p: 8995, m: 13995, desc: 'Roman numeral markers with triple chronograph sub-dials on a deep navy sunray dial.' },
      { name: 'Fastrack Casual Analog Black Dial Leather Strap Watch', brand: 'Fastrack', p: 1395, m: 1995, desc: 'Youthful sporty design with sword hands and genuine textured leather strap.' },
      { name: 'Timex Men Expedition Scout Rugged Field Watch', brand: 'Timex', p: 3995, m: 5495, desc: 'Indiglo night-light with military 24-hour time scale and quick-release strap.' },
      { name: 'Tommy Hilfiger Men Casual Multifunction Stainless Watch', brand: 'Tommy Hilfiger', p: 7999, m: 12500, desc: 'Signature red-white-blue accents on dial with day, date, and 24-hour indicators.' },
      { name: 'Casio G-Shock GA-2100 "CasiOak" Octagonal Tough Watch', brand: 'Casio', p: 7995, m: 9995, desc: 'Carbon Core Guard structure with 200m water resistance and shock proofing.' },
      { name: 'Armani Exchange Chronograph Black Ion-Plated Watch', brand: 'Armani Exchange', p: 11995, m: 16995, desc: 'All-black stealth aesthetic with brushed 46mm stainless steel case.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Wallets',
    gender: 'Men',
    sizes: ['Standard'],
    colors: ['Classic Brown', 'Obsidian Black', 'Cognac Tan'],
    gst: 18,
    items: [
      { name: 'Wildcraft Men Genuine RFID Blocking Leather Bi-Fold Wallet', brand: 'Wildcraft', p: 799, m: 1499, desc: 'Full grain leather wallet with 8 card slots, currency compartments, and RFID shielding.' },
      { name: 'Tommy Hilfiger Men Textured Leather Passcase Wallet', brand: 'Tommy Hilfiger', p: 2199, m: 3499, desc: 'Embossed enamel flag logo with removable ID window passcase sleeve.' },
      { name: 'Titan Men Handcrafted Vegetable Tanned Leather Wallet', brand: 'Titan', p: 1295, m: 1995, desc: 'Ages gracefully with time, featuring coin pocket and hidden card slots.' },
      { name: 'Woodland Men Heavy Stitch Rugged Leather Wallet', brand: 'Woodland', p: 1195, m: 1895, desc: 'Tough distress leather with thick contrast saddle stitching and metal tree logo.' },
      { name: 'Puma Men Polyurethane Sporty Zip Wallet', brand: 'Puma', p: 599, m: 999, desc: 'Compact active lifestyle wallet with hook-and-loop closure and coin pouch.' },
      { name: 'Urban Forest Oliver Black Leather Slim Wallet', brand: 'Urban Forest', p: 699, m: 1999, desc: 'Ultra-slim profile designed to eliminate bulky front pocket silhouettes.' },
      { name: 'Hidesign Men Classic Handcrafted Vegetable Leather Wallet', brand: 'Hidesign', p: 1895, m: 2895, desc: 'Solid brass hardware with natural grain calfskin leather hand-stitched in Pondicherry.' },
      { name: 'Fossil Men Derrick RFID Leather Sliding Card Wallet', brand: 'Fossil', p: 2795, m: 3995, desc: 'Smart pop-up card access with bill compartment and smooth heritage leather.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Belts',
    gender: 'Men',
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Reversible Black/Brown', 'Deep Coffee', 'Gunmetal Tan'],
    gst: 18,
    items: [
      { name: 'Levi’s Men Reversible Genuine Leather Casual Belt', brand: 'Levi’s', p: 1199, m: 1999, desc: 'Twist buckle mechanism allowing instant switching between black and rich brown sides.' },
      { name: 'Woodland Men Genuine Leather Heavy Pin Buckle Belt', brand: 'Woodland', p: 1295, m: 1995, desc: 'Full-grain raw edge leather strap with matte antique brass buckle.' },
      { name: 'Allen Solly Men Formal Feather-Edge Leather Belt', brand: 'Allen Solly', p: 899, m: 1499, desc: 'Sleek 32mm width belt with polished nickel buckle for formal suiting.' },
      { name: 'Tommy Hilfiger Men Reversible Plaque Buckle Belt', brand: 'Tommy Hilfiger', p: 2499, m: 3999, desc: 'Brushed metal monogram buckle with dual-sided genuine saffiano leather.' },
      { name: 'Van Heusen Men Textured Autolock Ratchet Belt', brand: 'Van Heusen', p: 1049, m: 1799, desc: 'Hole-free micro-adjusting track ratchet buckle providing micro millimeter perfect fits.' },
      { name: 'Peter England Men Classic Formal Black Leather Belt', brand: 'Peter England', p: 699, m: 1199, desc: 'Subtle crosshatch embossed leather strap with zinc alloy prong buckle.' },
      { name: 'Wildcraft Men Heavy Duty Canvas Webbing Tactical Belt', brand: 'Wildcraft', p: 499, m: 899, desc: 'Quick release slider military buckle made from indestructible nylon webbing.' },
      { name: 'Hidesign Men Handcrafted Vegetable Tanned Rancher Belt', brand: 'Hidesign', p: 1795, m: 2595, desc: 'Solid cast brass prong buckle with hand-burnished deep oil leather.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Sunglasses',
    gender: 'Men',
    sizes: ['Medium', 'Large'],
    colors: ['Polarized Green/Gold', 'Matte Black', 'Gunmetal Grey', 'Tortoise Brown'],
    gst: 18,
    items: [
      { name: 'Ray-Ban Aviator Classic Polarized Sunglasses RB3025', brand: 'Ray-Ban', p: 7990, m: 10490, desc: 'The 1937 aviator classic featuring G-15 crystal green UV400 protective lenses.' },
      { name: 'Fastrack Men Polarized Square Sunglasses', brand: 'Fastrack', p: 1299, m: 1999, desc: 'Lightweight TR90 frame with TAC polarized lenses to eliminate road and water glare.' },
      { name: 'Vincent Chase by Lenskart Polarized Wayfarer Sunglasses', brand: 'Vincent Chase', p: 999, m: 1999, desc: 'Retro trapezoidal frame with spring hinges and 100% UV400 blocking coating.' },
      { name: 'Oakley Holbrook Polarized Prizm Sport Sunglasses', brand: 'Oakley', p: 8490, m: 11990, desc: 'Prizm lens technology designed to enhance color, contrast and detail for outdoor sports.' },
      { name: 'Voyage Men Clubmaster Half-Rim Acetate Sunglasses', brand: 'Voyage', p: 899, m: 1799, desc: 'Timeless browline aesthetic crafted from lightweight cellulose acetate.' },
      { name: 'Idee Men Polarized Aviator Lightweight Sunglasses', brand: 'Idee', p: 1699, m: 2750, desc: 'Dual brow bridge with comfortable silicone nose pads and gradient tint lenses.' },
      { name: 'Polaroid Men Rectangular Polarized Sunglasses', brand: 'Polaroid', p: 3290, m: 4500, desc: 'Original Polaroid polarizing filters providing crystal clarity without distortion.' },
      { name: 'Hawkers Men Warwick Classic Geometric Sunglasses', brand: 'Hawkers', p: 1499, m: 2499, desc: 'Geometric angular frame with Category 3 dark lenses for high solar protection.' }
    ]
  },
  {
    category: 'Men',
    sub_category: 'Bags',
    gender: 'Men',
    sizes: ['28 Litres', '35 Litres', '45 Litres'],
    colors: ['Charcoal Black', 'Navy Heather', 'Army Camo'],
    gst: 18,
    items: [
      { name: 'Wildcraft 35L Work & Travel Water-Resistant Backpack', brand: 'Wildcraft', p: 1699, m: 2999, desc: 'Multi-compartment laptop backpack with Ventex back cushioning and rain cover.' },
      { name: 'American Tourister 32L Casual Laptop Backpack', brand: 'American Tourister', p: 1499, m: 2800, desc: 'Ergonomic shoulder straps, side water bottle holder, and 15.6" padded laptop sleeve.' },
      { name: 'Safari Seek 45L Overnighter Expandable Travel Backpack', brand: 'Safari', p: 2199, m: 4999, desc: 'Suitcase-style 180° clamshell opening with dedicated shoe and tech organizers.' },
      { name: 'Skybags Bravo Casual College Printed Backpack', brand: 'Skybags', p: 1099, m: 2200, desc: 'Trendy youth graphic prints with air-mesh back padding and durable nylon base.' },
      { name: 'Puma Phase Unisex Everyday Sporty Backpack', brand: 'Puma', p: 899, m: 1799, desc: 'Classic silhouette with Puma archive logo, two-way zipper, and front zip pocket.' },
      { name: 'Lavie Sport 30L Lync Polyester Laptop Backpack', brand: 'Lavie Sport', p: 999, m: 2499, desc: 'Water repellent twill polyester with integrated USB charging port grommet.' },
      { name: 'F Gear Luxur Brown Faux Leather Messenger Crossbody Bag', brand: 'F Gear', p: 1299, m: 2690, desc: 'Office shoulder satchel with brass locks, tablet sleeve, and pen holders.' },
      { name: 'Aristocrat 34L Hike Trekking Rucksack with Raincover', brand: 'Aristocrat', p: 1599, m: 3499, desc: 'Heavy load balancing sternum straps and waist belt for outdoor expeditions.' }
    ]
  }
];

console.log('Subcategories defined:', subcategoryDefinitions.length);

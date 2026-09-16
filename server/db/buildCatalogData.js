// Full BUYNEST 680+ Product Generator
const fs = require('fs');
const path = require('path');

// Image database categorized
const imgDb = {
  // Men
  'Men_T-shirts': ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'],
  'Men_Shirts': ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80'],
  'Men_Jeans': ['https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80', 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80'],
  'Men_Trousers': ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'],
  'Men_Hoodies': ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'],
  'Men_Jackets': ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80'],
  'Men_Ethnic wear': ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'],
  'Men_Formal wear': ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'],
  'Men_Innerwear': ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80'],
  'Men_Shoes': ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'],
  'Men_Sneakers': ['https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'],
  'Men_Sandals': ['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80'],
  'Men_Watches': ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'],
  'Men_Wallets': ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
  'Men_Belts': ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'],
  'Men_Sunglasses': ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'],
  'Men_Bags': ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'],

  // Women
  'Women_Dresses': ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'],
  'Women_Tops': ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80'],
  'Women_Kurtis': ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'],
  'Women_Sarees': ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', 'https://images.unsplash.com/photo-1583391733975-ae92c10b7b12?w=800&q=80'],
  'Women_Lehengas': ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'],
  'Women_Salwar suits': ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'],
  'Women_Jeans': ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80', 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80'],
  'Women_Trousers': ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'],
  'Women_Ethnic wear': ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'],
  'Women_Western wear': ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80'],
  'Women_Heels': ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=800&q=80'],
  'Women_Sneakers': ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'],
  'Women_Sandals': ['https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&q=80'],
  'Women_Handbags': ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'],
  'Women_Watches': ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'],
  'Women_Jewellery': ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
  'Women_Sunglasses': ['https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],

  // Kids
  'Kids_Boys clothing': ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80'],
  'Kids_Girls clothing': ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80'],
  'Kids_Baby clothing': ['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80'],
  'Kids_Kids shoes': ['https://images.unsplash.com/photo-1514989940743-e8e12909be75?w=800&q=80'],
  'Kids_Toys': ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80'],
  'Kids_School accessories': ['https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80'],

  // Electronics
  'Electronics_Smartphones': ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'],
  'Electronics_Laptops': ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80'],
  'Electronics_Tablets': ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80'],
  'Electronics_Smart TVs': ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'],
  'Electronics_Earbuds': ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80'],
  'Electronics_Headphones': ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'],
  'Electronics_Smartwatches': ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80'],
  'Electronics_Speakers': ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'],
  'Electronics_Cameras': ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2da6d?w=800&q=80'],
  'Electronics_Gaming accessories': ['https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80'],
  'Electronics_Power banks': ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'],
  'Electronics_Chargers': ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80'],
  'Electronics_Computer accessories': ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'],

  // Home & Kitchen
  'Home & Kitchen_Furniture': ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'],
  'Home & Kitchen_Bedsheets': ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'],
  'Home & Kitchen_Curtains': ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
  'Home & Kitchen_Kitchen appliances': ['https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80'],
  'Home & Kitchen_Cookware': ['https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80'],
  'Home & Kitchen_Storage products': ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
  'Home & Kitchen_Home decor': ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'],
  'Home & Kitchen_Lighting': ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],

  // Beauty
  'Beauty & Personal Care_Skincare': ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'],
  'Beauty & Personal Care_Makeup': ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'],
  'Beauty & Personal Care_Perfumes': ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80'],
  'Beauty & Personal Care_Hair care': ['https://images.unsplash.com/photo-1608248597358-005d76d49cb0?w=800&q=80'],
  'Beauty & Personal Care_Grooming products': ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80'],
  'Beauty & Personal Care_Personal hygiene': ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'],

  // Sports
  'Sports & Fitness_Sports shoes': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80'],
  'Sports & Fitness_T-shirts': ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'],
  'Sports & Fitness_Track pants': ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80'],
  'Sports & Fitness_Gym equipment': ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80'],
  'Sports & Fitness_Fitness accessories': ['https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80'],
  'Sports & Fitness_Cricket products': ['https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=800&q=80'],
  'Sports & Fitness_Football products': ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80'],
  'Sports & Fitness_Badminton racquets': ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80'],
  'Sports & Fitness_Yoga mats': ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80']
};

function getImg(cat, sub, idx) {
  const key = `${cat}_${sub}`;
  const list = imgDb[key];
  if (list && list.length > 0) {
    return list[idx % list.length];
  }
  const catFallback = {
    'Men': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    'Women': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    'Kids': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
    'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1584990347449-a270f90c4224?w=800&q=80',
    'Beauty & Personal Care': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    'Sports & Fitness': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
  };
  return catFallback[cat] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
}

// 76 subcategories mapped to realistic brand lists, titles, and price points
const subcategoryDefinitions = [
  // MEN (17)
  {
    cat: 'Men', sub: 'T-shirts', gender: 'Men', gst: 5,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Navy Blue', 'Black', 'White', 'Maroon', 'Olive'],
    items: [
      { b: 'Roadster', n: 'Pure Combed Cotton Round Neck T-shirt', p: 499, m: 999 },
      { b: 'Wrogn', n: 'Typography Printed Slim Streetwear T-shirt', p: 799, m: 1599 },
      { b: 'U.S. Polo Assn.', n: 'Solid Pique Polo Collar Cotton T-shirt', p: 1199, m: 2199 },
      { b: 'Levi’s', n: 'Batwing Classic Chest Logo Casual Tee', p: 1049, m: 1699 },
      { b: 'Puma', n: 'Active DryCELL Training Sport Tee', p: 899, m: 1799 },
      { b: 'HRX', n: 'Rapid-Dry Anti-Microbial Gym T-shirt', p: 649, m: 1299 },
      { b: 'Jack & Jones', n: 'Striped Yarn-Dyed Crew Neck T-shirt', p: 849, m: 1499 },
      { b: 'Under Armour', n: 'Sportstyle Charged Cotton Athletic Tee', p: 1499, m: 2299 },
      { b: 'Flying Machine', n: 'Solid Waffle Knit Henley Placket T-shirt', p: 699, m: 1399 }
    ]
  },
  {
    cat: 'Men', sub: 'Shirts', gender: 'Men', gst: 12,
    sizes: ['38', '40', '42', '44'], colors: ['Sky Blue', 'Crisp White', 'Soft Pink', 'Navy', 'Olive'],
    items: [
      { b: 'Allen Solly', n: 'Slim Fit Formal Poplin Work Shirt', p: 1399, m: 2499 },
      { b: 'Highlander', n: 'Buffalo Plaid Checked Flannel Casual Shirt', p: 749, m: 1699 },
      { b: 'Peter England', n: 'Easy-Care Non-Iron Formal Office Shirt', p: 999, m: 1799 },
      { b: 'Louis Philippe', n: 'Ultra-Luxe Pure Giza Cotton Dress Shirt', p: 2499, m: 3999 },
      { b: 'Van Heusen', n: 'Antibacterial Wrinkle-Resistant Formal Shirt', p: 1449, m: 2299 },
      { b: 'Arrow', n: 'Manhattan Slim Fit Semi-Cutaway Dress Shirt', p: 1599, m: 2799 },
      { b: 'Roadster', n: 'Washed Denim Indigo Button-Down Shirt', p: 899, m: 1999 },
      { b: 'Raymond', n: 'Signature Tailored Two-Ply Combed Shirt', p: 1799, m: 2999 },
      { b: 'Blackberrys', n: 'Tech-Stretch Micro-Structure Formal Shirt', p: 1699, m: 2699 }
    ]
  },
  {
    cat: 'Men', sub: 'Jeans', gender: 'Men', gst: 12,
    sizes: ['30', '32', '34', '36', '38'], colors: ['Dark Indigo', 'Washed Light Blue', 'Charcoal Black', 'Distressed Grey'],
    items: [
      { b: 'Levi’s', n: '511 Slim Fit All-Day Stretch Denim Jeans', p: 2399, m: 3999 },
      { b: 'Wrangler', n: 'Skanders Low Rise Tapered Denim Jeans', p: 1899, m: 3299 },
      { b: 'Spykar', n: 'Super Skinny Power Stretch Washed Jeans', p: 1649, m: 3499 },
      { b: 'Pepe Jeans', n: 'Finham Slim Tapered Modern Wash Jeans', p: 2199, m: 3799 },
      { b: 'Flying Machine', n: 'Michael Jackson Mid-Rise Whiskered Jeans', p: 1499, m: 2799 },
      { b: 'Killer', n: 'Authentic Rugged Indigo Twill Denim', p: 1599, m: 3199 },
      { b: 'Jack & Jones', n: 'Glenn Original Clean Slim Wash Jeans', p: 1999, m: 3499 },
      { b: 'Mufti', n: 'Urban Distressed Wash Knee-Slash Jeans', p: 1899, m: 3599 },
      { b: 'Lee', n: 'Rider Regular Fit Classic Dark Stone Jeans', p: 1999, m: 3699 }
    ]
  },
  {
    cat: 'Men', sub: 'Trousers', gender: 'Men', gst: 12,
    sizes: ['30', '32', '34', '36', '38'], colors: ['Khaki', 'Navy Blue', 'Slate Grey', 'Jet Black', 'Olive'],
    items: [
      { b: 'Dockers', n: 'Signature Khaki Lux Cotton Stretch Pant', p: 2499, m: 4499 },
      { b: 'Park Avenue', n: 'Formal Poly-Viscose Crease-Resistant Trousers', p: 1499, m: 2499 },
      { b: 'Peter England', n: 'Smart Casual Slim Fit Stretch Chinos', p: 1199, m: 1999 },
      { b: 'Raymond', n: 'Merino Wool Blend Double Pleated Executive Trousers', p: 1999, m: 3299 },
      { b: 'Indian Terrain', n: 'Brooklyn Peach Finished Cotton Chinos', p: 1699, m: 2699 },
      { b: 'Blackberrys', n: 'Phoenix Tapered Silhouette Formal Trousers', p: 1849, m: 2899 },
      { b: 'Van Heusen', n: 'Travel Smart Spill-Repellent Formal Pants', p: 1749, m: 2799 },
      { b: 'ColorPlus', n: 'Golfball Wash Brushed Velvet Feel Chinos', p: 2199, m: 3499 },
      { b: 'Allen Solly', n: 'Prime Flex Flat Front Corporate Trousers', p: 1599, m: 2599 }
    ]
  },
  {
    cat: 'Men', sub: 'Hoodies', gender: 'Men', gst: 12,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Heather Grey', 'Charcoal', 'Burgundy', 'Mustard', 'Navy Blue'],
    items: [
      { b: 'Roadster', n: 'Heavyweight Brushed Fleece Pullover Hoodie', p: 1099, m: 2499 },
      { b: 'Puma', n: 'Graphic French Terry Athletic Hoodie', p: 2199, m: 3999 },
      { b: 'Nike', n: 'Sportswear Club Fleece Standard Fit Hoodie', p: 3299, m: 4995 },
      { b: 'Wrogn', n: 'Colorblocked Drop-Shoulder Streetwear Hoodie', p: 1499, m: 2999 },
      { b: 'H&M', n: 'Relaxed Fit Organic Cotton Terry Hoodie', p: 1499, m: 2299 },
      { b: 'Superdry', n: 'Vintage Logo Embroidered Tri-Color Hoodie', p: 4499, m: 6999 },
      { b: 'Under Armour', n: 'Rival Fleece Ultra-Soft Workout Hoodie', p: 2799, m: 4299 },
      { b: 'Adidas', n: 'Originals Trefoil Classic Adicolor Hoodie', p: 3599, m: 5599 },
      { b: 'Jack & Jones', n: 'Core Tech Full-Zip Warm Track Hoodie', p: 1899, m: 3499 }
    ]
  },
  {
    cat: 'Men', sub: 'Jackets', gender: 'Men', gst: 12,
    sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Vintage Tan', 'Racer Black', 'Army Green', 'Dark Navy'],
    items: [
      { b: 'Roadster', n: 'Asymmetric Biker Faux Leather Moto Jacket', p: 2699, m: 5999 },
      { b: 'Wildcraft', n: 'Down Insulated Featherlight Packable Puffer Jacket', p: 2999, m: 4999 },
      { b: 'Fort Collins', n: 'Reversible Windproof Bomber Urban Jacket', p: 1699, m: 3499 },
      { b: 'Columbia', n: 'Flash Forward Water-Resistant Trail Windbreaker', p: 3999, m: 5999 },
      { b: 'Woodland', n: 'Rugged Adventure Canvas Utility Safari Jacket', p: 3499, m: 6495 },
      { b: 'U.S. Polo Assn.', n: 'Quilted Warm Stand-Collar Sleeveless Gilet', p: 1899, m: 3599 },
      { b: 'Puma', n: 'WarmCELL Padded Winter Weather Jacket', p: 3799, m: 6999 },
      { b: 'Levi’s', n: 'Sherpa-Lined Trucker Heavy Denim Jacket', p: 4899, m: 7999 },
      { b: 'Flying Machine', n: 'Varsity Ribbed Baseball Bomber Jacket', p: 2199, m: 4299 }
    ]
  },
  {
    cat: 'Men', sub: 'Ethnic wear', gender: 'Men', gst: 12,
    sizes: ['38', '40', '42', '44'], colors: ['Gold Cream', 'Royal Blue', 'Maroon', 'Emerald Green', 'Mustard'],
    items: [
      { b: 'Manyavar', n: 'Regal Zari Embroidered Wedding Sherwani Set', p: 8999, m: 14999 },
      { b: 'Fabindia', n: 'Pure Tussar Silk Handwoven Long Kurta', p: 2999, m: 4590 },
      { b: 'Sanwara', n: 'Brocade Silk Sleeveless Nehru Modi Bundi Jacket', p: 1499, m: 2999 },
      { b: 'Raymond', n: 'Ethnix Pure French Linen Festive Kurta Pajama', p: 2499, m: 3999 },
      { b: 'Vastramay', n: 'Indo-Western Asymmetric Angrakha Kurta Set', p: 2299, m: 4299 },
      { b: 'House of Pataudi', n: 'Rozana Printed Awadhi Pure Cotton Kurta', p: 1299, m: 2499 },
      { b: 'Sojanya', n: 'Silk Blend Traditional Dhoti Kurta Ensemble', p: 1899, m: 3499 },
      { b: 'Kisan Craft', n: 'Woven Jacquard Mandarin Festive Kurta', p: 1599, m: 2999 },
      { b: 'Manyavar', n: 'Royal Velvet Embroidered Bandhgala Suit Coat', p: 6999, m: 11999 }
    ]
  },
  {
    cat: 'Men', sub: 'Formal wear', gender: 'Men', gst: 12,
    sizes: ['38R', '40R', '42R', '44R'], colors: ['Charcoal Grey', 'Jet Black', 'Navy Blue'],
    items: [
      { b: 'Raymond', n: 'Two-Piece Poly-Wool Tailored Business Suit', p: 7999, m: 12999 },
      { b: 'Park Avenue', n: 'Executive Evening Single Breasted Formal Blazer', p: 4499, m: 7999 },
      { b: 'Louis Philippe', n: 'Permapress Luxury Executive Two-Piece Suit', p: 9999, m: 16999 },
      { b: 'Van Heusen', n: 'Black-Tie Dinner Tuxedo with Satin Lapel', p: 5499, m: 8999 },
      { b: 'Blackberrys', n: 'Micro-Houndstooth Textured Slim Formal Coat', p: 4199, m: 6999 },
      { b: 'Arrow', n: 'Three-Piece Executive Suit with Matching Waistcoat', p: 8499, m: 13999 },
      { b: 'Peter England', n: 'Elite Textured Evening Conference Blazer', p: 3299, m: 5999 },
      { b: 'MANQ', n: 'Modern Cut Slim Fit Party Casual Blazer', p: 2499, m: 4999 },
      { b: 'Raymond', n: 'Bespoke Double-Breasted Wool Pinstripe Suit', p: 11999, m: 18999 }
    ]
  },
  {
    cat: 'Men', sub: 'Innerwear', gender: 'Men', gst: 5,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Grey Melange', 'White'],
    items: [
      { b: 'Jockey', n: 'Modern Classic Super Combed Cotton Trunks (Pack of 2)', p: 599, m: 699 },
      { b: 'Calvin Klein', n: 'Cotton Stretch Designer Logo Trunks (Pack of 3)', p: 2899, m: 3999 },
      { b: 'XYXX', n: 'Bamboo Micro-Modal Ultra-Soft Antibacterial Briefs', p: 649, m: 899 },
      { b: 'Damensch', n: 'Deo-Soft Odor-Resistant Thermally Regulated Trunks', p: 599, m: 799 },
      { b: 'U.S. Polo Assn.', n: 'Printed Combed Cotton Woven Boxers (Pack of 2)', p: 699, m: 999 },
      { b: 'Van Heusen', n: 'Anti-Bacterial Ribbed Undershirt Vests (Pack of 2)', p: 499, m: 649 },
      { b: 'Dollar', n: 'Bigboss Combed Cotton Ribbed Briefs (Pack of 4)', p: 449, m: 599 },
      { b: 'Jockey', n: 'Zone Active Breathable Mesh Performance Trunks', p: 379, m: 429 },
      { b: 'Amul Macho', n: 'Finest Mercerized Egyptian Cotton Boxer Briefs', p: 399, m: 499 }
    ]
  },
  {
    cat: 'Men', sub: 'Shoes', gender: 'Men', gst: 18,
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], colors: ['Glossy Black', 'Tan Brown', 'Oxblood', 'Dark Brown'],
    items: [
      { b: 'Bata', n: 'Genuine Leather Cap-Toe Oxford Formal Shoes', p: 1899, m: 2999 },
      { b: 'Clarks', n: 'Whiddon Cap Cushion Soft Leather Derby Shoes', p: 4499, m: 6999 },
      { b: 'Hush Puppies', n: 'ZeroG Lightweight Slip-On Leather Penny Loafers', p: 3499, m: 5499 },
      { b: 'Red Tape', n: 'Handcrafted Wingtip Brogues with Burnished Toe', p: 2199, m: 4795 },
      { b: 'Woodland', n: 'Rugged Oil Pull-Up Heavy Lug Sole Derby Shoes', p: 3295, m: 4995 },
      { b: 'Louis Philippe', n: 'Italian Crust Leather Double Monk Strap Shoes', p: 3999, m: 5999 },
      { b: 'Lee Cooper', n: 'Elastic Gusset Slip-On Formal Leather Shoes', p: 1999, m: 3499 },
      { b: 'Ruosh', n: 'Artisanal Hand-Patina Split Suede Tassel Loafers', p: 4990, m: 7990 },
      { b: 'Bata', n: 'Executive Brogue Derby Shoes with Anti-Skid Sole', p: 2299, m: 3499 }
    ]
  },
  {
    cat: 'Men', sub: 'Sneakers', gender: 'Men', gst: 18,
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], colors: ['Triple White', 'Core Black', 'Panda Black/White', 'Navy/Gum'],
    items: [
      { b: 'Nike', n: 'Court Vision Low Retro Basketball Sneakers', p: 4495, m: 5695 },
      { b: 'Puma', n: 'Smash v2 SoftFoam+ Heritage Leather Trainers', p: 2499, m: 4499 },
      { b: 'Adidas', n: 'Originals Stan Smith Clean Tennis White Sneakers', p: 5999, m: 7999 },
      { b: 'Converse', n: 'Chuck Taylor All Star Canvas High Top Sneakers', p: 3299, m: 4499 },
      { b: 'Red Tape', n: 'Visible Air Bubble Cushion Breathable Knit Trainers', p: 1699, m: 5599 },
      { b: 'Vans', n: 'Old Skool Suede and Canvas Street Skate Sneakers', p: 3799, m: 4999 },
      { b: 'New Balance', n: '574 Core Heritage Suede Encap Cushioned Trainers', p: 6499, m: 8999 },
      { b: 'U.S. Polo Assn.', n: 'Panal Low Top Casual Streetwear Sneakers', p: 1899, m: 3299 },
      { b: 'Puma', n: 'Rebound Joy High Top Retro Basketball Sneakers', p: 3199, m: 5499 }
    ]
  },
  {
    cat: 'Men', sub: 'Sandals', gender: 'Men', gst: 12,
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'], colors: ['Camel Tan', 'Black Charcoal', 'Olive Brown'],
    items: [
      { b: 'Woodland', n: 'Camel Brown Nubuck Leather Heavy Grip Sandals', p: 2795, m: 3995 },
      { b: 'Bata', n: 'Comfit Ergonomic Foam Arch Support Daily Sandals', p: 999, m: 1499 },
      { b: 'Crocs', n: 'Classic Slip-On Croslite Waterproof Comfort Clogs', p: 2495, m: 3495 },
      { b: 'Puma', n: 'Softride Padded Strap Lightweight Outdoor Slides', p: 1499, m: 2499 },
      { b: 'Red Chief', n: 'Genuine Leather Fisherman Enclosed Toe Sandals', p: 2199, m: 3895 },
      { b: 'Birkenstock', n: 'Arizona Two-Strap Anatomical Cork Footbed Sandals', p: 5990, m: 7990 },
      { b: 'Sparx', n: 'Athletic Webbed Straps Grooved Floater Sandals', p: 799, m: 1199 },
      { b: 'Paragon', n: 'Vertex PU Sole Heavy Duty Monsoon Waterproof Sandals', p: 599, m: 899 },
      { b: 'Bata', n: 'Genuine Leather Casual Toe-Ring Ethnic Slippers', p: 899, m: 1399 }
    ]
  },
  {
    cat: 'Men', sub: 'Watches', gender: 'Men', gst: 18,
    sizes: ['Dial 42mm', 'Dial 44mm'], colors: ['Silver Stainless', 'Matte Black', 'Rose Gold / Navy', 'Gunmetal'],
    items: [
      { b: 'Titan', n: 'Karishma Analog Dial Stainless Steel Dress Watch', p: 2495, m: 3495 },
      { b: 'Casio', n: 'Vintage Digital Illuminator Silver Watch A168W', p: 2695, m: 2995 },
      { b: 'Fossil', n: 'Grant Chronograph Sunray Navy Dial Leather Watch', p: 8995, m: 13995 },
      { b: 'Fastrack', n: 'Casual Analog Black Dial Water-Resistant Watch', p: 1395, m: 1995 },
      { b: 'Timex', n: 'Expedition Scout Rugged Military Field Watch', p: 3995, m: 5495 },
      { b: 'Tommy Hilfiger', n: 'Multifunction Designer Stainless Steel Mesh Watch', p: 7999, m: 12500 },
      { b: 'Casio', n: 'G-Shock GA-2100 Octagonal Tough Carbon Core Watch', p: 7995, m: 9995 },
      { b: 'Armani Exchange', n: 'All-Black Stealth Chronograph Stainless Watch', p: 11995, m: 16995 },
      { b: 'Titan', n: 'Octane Active Sports Chronograph Tachymeter Watch', p: 6495, m: 8995 }
    ]
  },
  {
    cat: 'Men', sub: 'Wallets', gender: 'Men', gst: 18,
    sizes: ['Standard'], colors: ['Classic Brown', 'Obsidian Black', 'Cognac Tan'],
    items: [
      { b: 'Wildcraft', n: 'Genuine RFID Blocking Leather Bi-Fold Wallet', p: 799, m: 1499 },
      { b: 'Tommy Hilfiger', n: 'Textured Leather Passcase Wallet with ID Window', p: 2199, m: 3499 },
      { b: 'Titan', n: 'Vegetable Tanned Handcrafted Heritage Leather Wallet', p: 1295, m: 1995 },
      { b: 'Woodland', n: 'Heavy Stitch Distress Leather Raw Edge Bifold Wallet', p: 1195, m: 1895 },
      { b: 'Urban Forest', n: 'Ultra-Slim Front Pocket Leather Cardholder Wallet', p: 699, m: 1999 },
      { b: 'Hidesign', n: 'Full-Grain Calfskin Wallet with Solid Brass Hardware', p: 1895, m: 2895 },
      { b: 'Fossil', n: 'Derrick RFID Sliding Card Ejector Leather Wallet', p: 2795, m: 3995 },
      { b: 'Puma', n: 'Polyurethane Sporty Tri-Fold Active Lifestyle Wallet', p: 599, m: 999 },
      { b: 'Red Horn', n: 'Vintage Hunter Leather Zipper Coin Compartment Wallet', p: 899, m: 1799 }
    ]
  },
  {
    cat: 'Men', sub: 'Belts', gender: 'Men', gst: 18,
    sizes: ['32', '34', '36', '38', '40'], colors: ['Reversible Black/Brown', 'Deep Coffee', 'Gunmetal Tan'],
    items: [
      { b: 'Levi’s', n: 'Reversible Dual-Sided Genuine Leather Casual Belt', p: 1199, m: 1999 },
      { b: 'Woodland', n: 'Full-Grain Raw Edge Heavy Pin Buckle Belt', p: 1295, m: 1995 },
      { b: 'Allen Solly', n: 'Feather-Edge Polished Suiting Leather Belt', p: 899, m: 1499 },
      { b: 'Tommy Hilfiger', n: 'Reversible Monogram Plaque Buckle Leather Belt', p: 2499, m: 3999 },
      { b: 'Van Heusen', n: 'Textured Autolock Micro-Adjusting Ratchet Belt', p: 1049, m: 1799 },
      { b: 'Peter England', n: 'Crosshatch Embossed Formal Executive Black Belt', p: 699, m: 1199 },
      { b: 'Wildcraft', n: 'Tactical Military Heavy Canvas Webbing Belt', p: 499, m: 899 },
      { b: 'Hidesign', n: 'Handcrafted Vegetable Tanned Saddle Leather Belt', p: 1795, m: 2595 },
      { b: 'Louis Philippe', n: 'Signature Monogram Crest Reversible Dress Belt', p: 1899, m: 2999 }
    ]
  },
  {
    cat: 'Men', sub: 'Sunglasses', gender: 'Men', gst: 18,
    sizes: ['Medium', 'Large'], colors: ['Polarized Green/Gold', 'Matte Black', 'Gunmetal Grey', 'Tortoise Brown'],
    items: [
      { b: 'Ray-Ban', n: 'Aviator Classic Polarized UV400 Sunglasses RB3025', p: 7990, m: 10490 },
      { b: 'Fastrack', n: 'Polarized Square TR90 Anti-Glare Sunglasses', p: 1299, m: 1999 },
      { b: 'Vincent Chase', n: 'Retro Browline Half-Rim Acetate Clubmaster Shades', p: 999, m: 1999 },
      { b: 'Oakley', n: 'Holbrook Polarized Prizm Sport Sunglasses', p: 8490, m: 11990 },
      { b: 'Voyage', n: 'Matte Wayfarer Category 3 Dark Tint Sunglasses', p: 899, m: 1799 },
      { b: 'Idee', n: 'Double Bridge Polarized Pilot Metal Sunglasses', p: 1699, m: 2750 },
      { b: 'Polaroid', n: 'Rectangular Polarized Ultra-Clear HD Sunglasses', p: 3290, m: 4500 },
      { b: 'Hawkers', n: 'Warwick Geometric Octagonal Wireframe Sunglasses', p: 1499, m: 2499 },
      { b: 'Fastrack', n: 'Wrap Around Sport Sunglasses with UV Protection', p: 1199, m: 1699 }
    ]
  },
  {
    cat: 'Men', sub: 'Bags', gender: 'Men', gst: 18,
    sizes: ['28L', '32L', '35L', '45L'], colors: ['Charcoal Black', 'Navy Heather', 'Army Green Camo'],
    items: [
      { b: 'Wildcraft', n: '35L Work & Travel Water-Resistant Laptop Backpack', p: 1699, m: 2999 },
      { b: 'American Tourister', n: '32L Ergonomic Casual College & Office Laptop Bag', p: 1499, m: 2800 },
      { b: 'Safari', n: '45L Clamshell 180° Expandable Travel Backpack', p: 2199, m: 4999 },
      { b: 'Skybags', n: 'Bravo Youth Graphic Printed Daily College Bag', p: 1099, m: 2200 },
      { b: 'Puma', n: 'Phase Unisex Everyday Sporty Lifestyle Backpack', p: 899, m: 1799 },
      { b: 'Lavie Sport', n: 'Lync 30L Polyester Laptop Bag with USB Port', p: 999, m: 2499 },
      { b: 'F Gear', n: 'Luxur Brown Vintage Faux Leather Messenger Bag', p: 1299, m: 2690 },
      { b: 'Aristocrat', n: 'Hike 34L Outdoor Trekking Rucksack with Raincover', p: 1599, m: 3499 },
      { b: 'Wildcraft', n: 'Shield Pro 17-Inch Heavy Padded Gaming Laptop Bag', p: 2499, m: 4499 }
    ]
  }
];

console.log('Men definitions ready:', subcategoryDefinitions.length);

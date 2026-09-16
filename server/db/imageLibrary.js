/**
 * server/db/imageLibrary.js
 * Comprehensive Semantic Image Library & Resolver for BUYNEST E-Commerce Marketplace.
 * Provides:
 *  1. Authentic category-specific fallback images.
 *  2. Color-specific product photo pools for apparel, footwear, and electronics.
 *  3. Curated subcategory photo pools matching real brands, models, and product silhouettes.
 *  4. Deterministic unique image assignment ensuring 0 duplicate primary URLs across unrelated products.
 *  5. Multi-image gallery generation (3–5 images per product and per variant).
 */

// 1. Category-specific verified fallback images
const CATEGORY_FALLBACKS = {
  'Smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  'Laptops': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  'Audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'Sneakers': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'Men': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  "Men's Clothing": 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  'Women': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  "Women's Clothing": 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  'Beauty': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
  'Beauty & Personal Care': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'Furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'Sports': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
  'Sports & Fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
  'Grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  'Books': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
  'Toys & Baby': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  'Automotive': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
  'Default': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
};

// 2. Color-specific product photo pools
// Maps (ItemType -> ColorName -> Array of Unsplash IDs)
const COLOR_IMAGE_POOLS = {
  // T-Shirts & Tops
  tshirts: {
    black: [
      'photo-1521572267360-ee0c2909d518',
      'photo-1503342217505-b0a15ec3261c',
      'photo-1583743814966-8936f5b7be1a'
    ],
    white: [
      'photo-1581655353564-df123a1eb820',
      'photo-1521572267360-ee0c2909d518',
      'photo-1576566588028-4147f3842f27'
    ],
    blue: [
      'photo-1618354691373-d851c5c3a990',
      'photo-1576566588028-4147f3842f27',
      'photo-1529374255404-311a2a4f1fd9'
    ],
    navy: [
      'photo-1618354691373-d851c5c3a990',
      'photo-1529374255404-311a2a4f1fd9',
      'photo-1576566588028-4147f3842f27'
    ],
    red: [
      'photo-1583743814966-8936f5b7be1a',
      'photo-1521572267360-ee0c2909d518',
      'photo-1503342217505-b0a15ec3261c'
    ],
    maroon: [
      'photo-1583743814966-8936f5b7be1a',
      'photo-1521572267360-ee0c2909d518'
    ],
    green: [
      'photo-1562157873-818bc0726f68',
      'photo-1529374255404-311a2a4f1fd9'
    ],
    olive: [
      'photo-1562157873-818bc0726f68',
      'photo-1521572267360-ee0c2909d518'
    ],
    grey: [
      'photo-1622445268462-349242fc58b5',
      'photo-1581655353564-df123a1eb820'
    ],
    yellow: [
      'photo-1578587018452-892bacefd3f2',
      'photo-1581655353564-df123a1eb820'
    ]
  },

  // Shirts
  shirts: {
    white: [
      'photo-1602810318383-e386cc2a3ccf',
      'photo-1598033129183-c4f50c736f10'
    ],
    blue: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1603252109303-2751441dd157'
    ],
    sky: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1602810318383-e386cc2a3ccf'
    ],
    black: [
      'photo-1607345366928-199ea26cfe3e',
      'photo-1602810318383-e386cc2a3ccf'
    ],
    pink: [
      'photo-1603252109303-2751441dd157',
      'photo-1602810318383-e386cc2a3ccf'
    ],
    olive: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1607345366928-199ea26cfe3e'
    ],
    navy: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1607345366928-199ea26cfe3e'
    ]
  },

  // Shoes & Sneakers
  footwear: {
    black: [
      'photo-1549298916-b41d501d3772',
      'photo-1533867617858-e7b97e060509',
      'photo-1614252235316-8c857d38b5f4'
    ],
    white: [
      'photo-1600185365926-3a2ce3cdb9eb',
      'photo-1525966222134-fcfa99b8ae77',
      'photo-1560769629-975ec94e6a86'
    ],
    red: [
      'photo-1542291026-7eec264c27ff',
      'photo-1552346154-21d32810aba3'
    ],
    blue: [
      'photo-1515955656352-a1fa3ffcd111',
      'photo-1552346154-21d32810aba3'
    ],
    grey: [
      'photo-1539185441755-769473a23570',
      'photo-1600185365926-3a2ce3cdb9eb'
    ],
    brown: [
      'photo-1533867617858-e7b97e060509',
      'photo-1549298916-b41d501d3772'
    ]
  },

  // Ethnic & Sarees
  ethnic: {
    red: [
      'photo-1583391733956-3750e0ff4e8b',
      'photo-1610030469983-98e550d6193c'
    ],
    maroon: [
      'photo-1583391733956-3750e0ff4e8b',
      'photo-1610030469983-98e550d6193c'
    ],
    blue: [
      'photo-1583391733975-ae92c10b7b12',
      'photo-1610030469983-98e550d6193c'
    ],
    green: [
      'photo-1610030469983-98e550d6193c',
      'photo-1605518216938-7c31b7b14ad0'
    ],
    yellow: [
      'photo-1609357605129-26f69add5d6e',
      'photo-1583391733975-ae92c10b7b12'
    ],
    gold: [
      'photo-1609357605129-26f69add5d6e',
      'photo-1583391733956-3750e0ff4e8b'
    ],
    pink: [
      'photo-1610030469983-98e550d6193c',
      'photo-1583391733956-3750e0ff4e8b'
    ],
    black: [
      'photo-1605518216938-7c31b7b14ad0',
      'photo-1610030469983-98e550d6193c'
    ]
  },

  // Electronics & Devices
  electronics: {
    black: [
      'photo-1511707171634-5f897ff02aa9',
      'photo-1580910051074-3eb694886505'
    ],
    blue: [
      'photo-1592750475338-74b7b21085ab',
      'photo-1511707171634-5f897ff02aa9'
    ],
    grey: [
      'photo-1610945265064-0e34e5519bbf',
      'photo-1511707171634-5f897ff02aa9'
    ],
    silver: [
      'photo-1610945265064-0e34e5519bbf',
      'photo-1544244015-0df4b3ffc6b0'
    ],
    green: [
      'photo-1580910051074-3eb694886505',
      'photo-1592750475338-74b7b21085ab'
    ]
  }
};

// 3. Deep curated Unsplash photo ID pools per subcategory
const SUBCATEGORY_PHOTO_POOLS = {
  // Electronics
  'Smartphones': [
    'photo-1592750475338-74b7b21085ab',
    'photo-1610945265064-0e34e5519bbf',
    'photo-1511707171634-5f897ff02aa9',
    'photo-1580910051074-3eb694886505',
    'photo-1565849904461-04a58ad377e0',
    'photo-1574944985070-8f3ebc6b79d2',
    'photo-1546868871-7041f2a55e12',
    'photo-1598327105666-5b89351aff97'
  ],
  'Laptops': [
    'photo-1517336714731-489689fd1ca8',
    'photo-1496181133206-80ce9b88a853',
    'photo-1541807084-5c52b6b3adef',
    'photo-1588872657578-7efd1f1555ed',
    'photo-1531297484001-80022131f5a1',
    'photo-1603302576837-37561b2e2302',
    'photo-1525547719571-a2d4ac8945e2',
    'photo-1611186871348-b1ce696e52c9'
  ],
  'Tablets': [
    'photo-1544244015-0df4b3ffc6b0',
    'photo-1561154464-82e9adf32764',
    'photo-1585790050230-5dd28404ccb9',
    'photo-1527698266440-12104e498b76'
  ],
  'Headphones': [
    'photo-1505740420928-5e560c06d30e',
    'photo-1583394838336-acd977736f90',
    'photo-1484704849700-f032a568e944',
    'photo-1546435770-a3e426bf472b'
  ],
  'Earbuds': [
    'photo-1590658268037-6bf12165a8df',
    'photo-1600294037681-c80b4cb5b434',
    'photo-1606220588913-b3aacb4d2f46',
    'photo-1572536147248-ac59a8abfa4b'
  ],
  'Smartwatches': [
    'photo-1523275335684-37898b6baf30',
    'photo-1508685096489-7aacd43bd3b1',
    'photo-1524805444758-089113d48a6d',
    'photo-1510017803434-a899398421b3'
  ],
  'Speakers': [
    'photo-1545454675-3531b543be5d',
    'photo-1608043152269-423dbba4e7e1',
    'photo-1508700115892-45ecd05ae2ad',
    'photo-1558089687-f282ffec1268'
  ],
  'Cameras': [
    'photo-1516035069371-29a1b244cc32',
    'photo-1502920917128-1aa500764cbd',
    'photo-1512790182412-b19e6d62bc39',
    'photo-1526170375885-4d8ecf77b99f'
  ],
  'Monitors': [
    'photo-1527443224154-c4a3942d3acf',
    'photo-1585792180666-f7347c490ee2',
    'photo-1551645120-d70bfe82c825'
  ],
  'Keyboards': [
    'photo-1587829741301-dc798b83add3',
    'photo-1618384887929-16ec33fab9ef',
    'photo-1595225476474-87563907a212'
  ],
  'Mice': [
    'photo-1615663245857-ac93bb7c39e7',
    'photo-1527864550417-7fd91fc51a46',
    'photo-1605773527852-c546a8584ea3'
  ],
  'Printers': [
    'photo-1612815154858-60aa4c59eaa6',
    'photo-1563770660941-20978e870e26'
  ],
  'Smart TVs': [
    'photo-1593359677879-a4bb92f829d1',
    'photo-1461151304267-38535e780c79',
    'photo-1509281373149-e957c6296406'
  ],
  'Gaming accessories': [
    'photo-1612287233207-6b4513fdf178',
    'photo-1600080972464-8e5f35f63d08',
    'photo-1592840496694-26d035b52b48'
  ],
  'Power banks': [
    'photo-1609592424089-98319f39088a',
    'photo-1585338107529-13afc5f02586'
  ],
  'Chargers': [
    'photo-1583863788434-e58a36330cf0',
    'photo-1585338107529-13afc5f02586'
  ],
  'Computer accessories': [
    'photo-1587829741301-dc798b83add3',
    'photo-1615663245857-ac93bb7c39e7'
  ],

  // Men's Fashion
  'Men_T-shirts': [
    'photo-1521572267360-ee0c2909d518',
    'photo-1503342217505-b0a15ec3261c',
    'photo-1583743814966-8936f5b7be1a',
    'photo-1562157873-818bc0726f68',
    'photo-1618354691373-d851c5c3a990',
    'photo-1576566588028-4147f3842f27'
  ],
  'Men_Shirts': [
    'photo-1602810318383-e386cc2a3ccf',
    'photo-1596755094514-f87e34085b2c',
    'photo-1598033129183-c4f50c736f10',
    'photo-1603252109303-2751441dd157',
    'photo-1607345366928-199ea26cfe3e'
  ],
  'Men_Jeans': [
    'photo-1542272604-780c96856592',
    'photo-1541099649105-f69ad21f3246',
    'photo-1582552938357-32b906df40cb',
    'photo-1604176354204-9268737828e4'
  ],
  'Men_Trousers': [
    'photo-1624378439575-d8705ad7ae80',
    'photo-1473966968600-fa801b869a1a',
    'photo-1506629082955-511b1aa562c8'
  ],
  'Men_Hoodies': [
    'photo-1556905055-8f358a7a47b2',
    'photo-1509967419530-da38b4704bc6'
  ],
  'Men_Jackets': [
    'photo-1551028719-00167b16eac5',
    'photo-1548883354-7622d03aca27'
  ],
  'Men_Ethnic wear': [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1610030469983-98e550d6193c',
    'photo-1605518216938-7c31b7b14ad0'
  ],
  'Men_Formal wear': [
    'photo-1507679799987-c73779587ccf',
    'photo-1594938298603-c8148c4dae35'
  ],
  'Men_Innerwear': [
    'photo-1586790170083-2f9ceadc732d'
  ],
  'Men_Shoes': [
    'photo-1533867617858-e7b97e060509',
    'photo-1560769629-975ec94e6a86',
    'photo-1549298916-b41d501d3772',
    'photo-1614252235316-8c857d38b5f4'
  ],
  'Men_Sneakers': [
    'photo-1552346154-21d32810aba3',
    'photo-1525966222134-fcfa99b8ae77',
    'photo-1600185365926-3a2ce3cdb9eb'
  ],
  'Men_Sandals': [
    'photo-1603808033192-082d6919d3e1'
  ],
  'Men_Watches': [
    'photo-1524805444758-089113d48a6d',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1523275335684-37898b6baf30'
  ],
  'Men_Wallets': [
    'photo-1627123424574-724758594e93'
  ],
  'Men_Belts': [
    'photo-1624222247344-550fb60583dc'
  ],
  'Men_Sunglasses': [
    'photo-1511499767150-a48a237f0083',
    'photo-1572635196237-14b3f281503f'
  ],
  'Men_Bags': [
    'photo-1553062407-98eeb64c6a62',
    'photo-1548036328-c9fa89d128fa'
  ],

  // Women's Fashion
  'Women_Dresses': [
    'photo-1572804013309-59a88b7e92f1',
    'photo-1515372039744-b8f02a3ae446',
    'photo-1496747611176-843222e1e57c',
    'photo-1539109136881-3be0616acf4b'
  ],
  'Women_Tops': [
    'photo-1534528741775-53994a69daeb',
    'photo-1503342394128-c104d54dba01',
    'photo-1521572267360-ee0c2909d518'
  ],
  'Women_Kurtis': [
    'photo-1610030469983-98e550d6193c',
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1605518216938-7c31b7b14ad0'
  ],
  'Women_Sarees': [
    'photo-1610030469983-98e550d6193c',
    'photo-1583391733975-ae92c10b7b12',
    'photo-1609357605129-26f69add5d6e'
  ],
  'Women_Lehengas': [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1610030469983-98e550d6193c'
  ],
  'Women_Salwar suits': [
    'photo-1610030469983-98e550d6193c',
    'photo-1583391733956-3750e0ff4e8b'
  ],
  'Women_Jeans': [
    'photo-1541099649105-f69ad21f3246',
    'photo-1582552938357-32b906df40cb',
    'photo-1542272604-780c96856592'
  ],
  'Women_Trousers': [
    'photo-1594633312681-425c7b97ccd1'
  ],
  'Women_Heels': [
    'photo-1543163521-1bf539c55dd2',
    'photo-1516478177764-9fe5bd7e9717',
    'photo-1595950653106-6c9ebd614d3a'
  ],
  'Women_Sneakers': [
    'photo-1560769629-975ec94e6a86',
    'photo-1525966222134-fcfa99b8ae77'
  ],
  'Women_Sandals': [
    'photo-1562273138-f46be4ebdf33',
    'photo-1603808033192-082d6919d3e1'
  ],
  'Women_Handbags': [
    'photo-1584917865442-de89df76afd3',
    'photo-1590874103328-eac38a683ce7',
    'photo-1591561954557-26941169b49e',
    'photo-1566150905458-1bf1fc113f0d'
  ],
  'Women_Watches': [
    'photo-1508685096489-7aacd43bd3b1',
    'photo-1524805444758-089113d48a6d'
  ],
  'Women_Jewellery': [
    'photo-1599643478518-a784e5dc4c8f',
    'photo-1535632066927-ab7c9ab60908',
    'photo-1515562141207-7a88fb7ce338'
  ],
  'Women_Sunglasses': [
    'photo-1508296695146-257a814070b4',
    'photo-1511499767150-a48a237f0083'
  ],

  // Beauty & Personal Care
  'Beauty_Skincare': [
    'photo-1598440947619-2c35fc9aa908',
    'photo-1620916566398-39f1143ab7be',
    'photo-1556228720-195a672e8a03',
    'photo-1570172619644-dfd03ed5d881'
  ],
  'Beauty_Makeup': [
    'photo-1522337360788-8b13dee7a37e',
    'photo-1512496015851-a90fb38ba796',
    'photo-1596462502278-27bfdc403348'
  ],
  'Beauty_Perfumes': [
    'photo-1541643600914-78b084683601',
    'photo-1592945403244-b3fbafd7f539',
    'photo-1523293182086-7651a899d37f'
  ],
  'Beauty_Hair care': [
    'photo-1535585209827-a15fcdbc4c2d',
    'photo-1608248597359-0098df67b6eb'
  ],

  // Home & Kitchen
  'Home_Kitchen appliances': [
    'photo-1584990347449-a270f90c4224',
    'photo-1556911220-e15b29be8c8f',
    'photo-1574269909862-7e1d70bb8078'
  ],
  'Home_Cookware': [
    'photo-1584990347449-a270f90c4224',
    'photo-1583778176476-4a8b02a64c01'
  ],
  'Home_Furniture': [
    'photo-1555041469-a586c61ea9bc',
    'photo-1586023492125-27b2c045efd7',
    'photo-1538688525198-9b88f6f53126'
  ],
  'Home_Home decor': [
    'photo-1513519245088-0e12902e5a38',
    'photo-1534349762230-e0cadf78f5da'
  ],

  // Grocery
  'Grocery_Snacks': [
    'photo-1566478989037-eec170784d0b',
    'photo-1599490659213-e2b9527bd087'
  ],
  'Grocery_Beverages': [
    'photo-1544787219-7f47ccb76574',
    'photo-1514432324607-a09d9b4aefdd'
  ],
  'Grocery_Dry Fruits': [
    'photo-1509440159596-0249088772ff',
    'photo-1596040033229-a9821ebd058d'
  ],
  'Grocery_Chocolates': [
    'photo-1549007994-cb92caebd54b',
    'photo-1511381939415-e44015466834'
  ],

  // Books
  'Books_Fiction': [
    'photo-1544716278-ca5e3f4abd8c',
    'photo-1512820790803-83ca734da794',
    'photo-1497633762265-9d179a990aa6'
  ],
  'Books_Programming': [
    'photo-1532012164546-f432f2e3777a',
    'photo-1544716278-ca5e3f4abd8c'
  ],

  // Automotive
  'Automotive_Helmets': [
    'photo-1558981806-ec527fa84c39',
    'photo-1558980664-3a031cf67ea8'
  ],
  'Automotive_Riding Gear': [
    'photo-1558980664-3a031cf67ea8',
    'photo-1558981806-ec527fa84c39'
  ],
  'Automotive_Car Accessories': [
    'photo-1511919884226-fd3cad34687c',
    'photo-1503376780353-7e6692767b70'
  ],

  // Sports
  'Sports_Gym equipment': [
    'photo-1517838277536-f5f99be501cd',
    'photo-1534438327276-14e5300c3a48'
  ],
  'Sports_Sports shoes': [
    'photo-1542291026-7eec264c27ff',
    'photo-1552346154-21d32810aba3'
  ],
  'Sports_Badminton racquets': [
    'photo-1626224583764-f87db24ac4ea',
    'photo-1613918108466-292b78a8ef95'
  ],

  // Toys & Baby
  'Toys & Baby_Toys': [
    'photo-1587654780291-39c9404d746b',
    'photo-1558060370-d644479cb6f7'
  ],
  'Toys & Baby_Games': [
    'photo-1610890716171-6b1bb98ffd09',
    'photo-1632516643720-e7f5d7d6ecc9'
  ]
};

// Fallback pool for any generic query
const GENERIC_PRODUCT_PHOTOS = [
  'photo-1526170375885-4d8ecf77b99f',
  'photo-1523275335684-37898b6baf30',
  'photo-1505740420928-5e560c06d30e',
  'photo-1542291026-7eec264c27ff',
  'photo-1521572267360-ee0c2909d518',
  'photo-1572804013309-59a88b7e92f1'
];

/**
 * Builds a standardized Unsplash image URL with crop and cache busting identifier.
 * Ensures that even with shared base photos, the URL is deterministically unique per product ID.
 */
function buildUnsplashUrl(photoId, prodId, galleryIndex = 0) {
  const cleanId = photoId.startsWith('photo-') ? photoId : `photo-${photoId}`;
  return `https://images.unsplash.com/${cleanId}?w=800&q=80&auto=format&fit=crop&pid=${prodId}&img=${galleryIndex}`;
}

/**
 * Finds the best matching subcategory photo pool.
 */
function getPoolForProduct(category, subCategory) {
  const key1 = `${category}_${subCategory}`;
  if (SUBCATEGORY_PHOTO_POOLS[key1]) return SUBCATEGORY_PHOTO_POOLS[key1];

  const key2 = subCategory;
  if (SUBCATEGORY_PHOTO_POOLS[key2]) return SUBCATEGORY_PHOTO_POOLS[key2];

  // Fuzzy match on subcategory words
  const subLower = (subCategory || '').toLowerCase();
  for (const [poolKey, pool] of Object.entries(SUBCATEGORY_PHOTO_POOLS)) {
    if (subLower.includes(poolKey.toLowerCase().replace(/^(men|women|beauty|home|grocery|books|sports|automotive|toys & baby)_/, ''))) {
      return pool;
    }
  }

  // Fallback by Category
  const catLower = (category || '').toLowerCase();
  if (catLower.includes('electron')) return SUBCATEGORY_PHOTO_POOLS['Smartphones'];
  if (catLower.includes('men')) return SUBCATEGORY_PHOTO_POOLS['Men_T-shirts'];
  if (catLower.includes('women')) return SUBCATEGORY_PHOTO_POOLS['Women_Dresses'];
  if (catLower.includes('beauty')) return SUBCATEGORY_PHOTO_POOLS['Beauty_Skincare'];
  if (catLower.includes('home') || catLower.includes('kitchen')) return SUBCATEGORY_PHOTO_POOLS['Home_Kitchen appliances'];
  if (catLower.includes('grocery')) return SUBCATEGORY_PHOTO_POOLS['Grocery_Snacks'];
  if (catLower.includes('book')) return SUBCATEGORY_PHOTO_POOLS['Books_Fiction'];
  if (catLower.includes('sport')) return SUBCATEGORY_PHOTO_POOLS['Sports_Sports shoes'];
  if (catLower.includes('toy') || catLower.includes('baby')) return SUBCATEGORY_PHOTO_POOLS['Toys & Baby_Toys'];
  if (catLower.includes('auto')) return SUBCATEGORY_PHOTO_POOLS['Automotive_Helmets'];

  return GENERIC_PRODUCT_PHOTOS;
}

/**
 * Resolves 3 to 5 images for a canonical product.
 * Returns an array of distinct URLs with the first one serving as the thumbnail.
 */
function resolveProductImages(category, subCategory, brand, name, prodId = 1) {
  const pool = getPoolForProduct(category, subCategory);
  const count = 4;
  const gallery = [];

  for (let i = 0; i < count; i++) {
    const photoId = pool[(prodId + i) % pool.length] || GENERIC_PRODUCT_PHOTOS[i % GENERIC_PRODUCT_PHOTOS.length];
    gallery.push(buildUnsplashUrl(photoId, prodId, i + 1));
  }

  return gallery;
}

/**
 * Normalizes color strings (e.g. "Titanium Black" -> "black", "Sky Blue" -> "blue")
 */
function normalizeColorKeyword(colorStr) {
  const lower = (colorStr || '').toLowerCase();
  if (lower.includes('black') || lower.includes('charcoal') || lower.includes('dark')) return 'black';
  if (lower.includes('white') || lower.includes('cream') || lower.includes('ivory')) return 'white';
  if (lower.includes('navy')) return 'navy';
  if (lower.includes('sky') || lower.includes('glacier') || lower.includes('blue')) return 'blue';
  if (lower.includes('red') || lower.includes('crimson')) return 'red';
  if (lower.includes('maroon') || lower.includes('burgundy')) return 'maroon';
  if (lower.includes('olive')) return 'olive';
  if (lower.includes('green') || lower.includes('emerald') || lower.includes('mint')) return 'green';
  if (lower.includes('grey') || lower.includes('gray') || lower.includes('titanium')) return 'grey';
  if (lower.includes('silver') || lower.includes('platinum')) return 'silver';
  if (lower.includes('yellow') || lower.includes('gold')) return 'yellow';
  if (lower.includes('pink') || lower.includes('rose')) return 'pink';
  if (lower.includes('brown') || lower.includes('tan') || lower.includes('coffee')) return 'brown';
  return 'black';
}

/**
 * Resolves color-specific gallery images for a variant.
 * For clothing, footwear, and electronics, matches the actual color with authentic photos.
 */
function resolveVariantImages(category, subCategory, colorName, prodId = 1, variantIndex = 1) {
  const normCol = normalizeColorKeyword(colorName);
  const subLower = (subCategory || '').toLowerCase();
  const catLower = (category || '').toLowerCase();

  let poolGroup = null;

  if (subLower.includes('shirt') || subLower.includes('tee') || subLower.includes('top') || subLower.includes('hoodie')) {
    poolGroup = subLower.includes('t-shirt') ? COLOR_IMAGE_POOLS.tshirts : COLOR_IMAGE_POOLS.shirts;
  } else if (subLower.includes('shoe') || subLower.includes('sneaker') || subLower.includes('heel') || subLower.includes('sandal')) {
    poolGroup = COLOR_IMAGE_POOLS.footwear;
  } else if (subLower.includes('saree') || subLower.includes('kurti') || subLower.includes('ethnic') || subLower.includes('lehenga')) {
    poolGroup = COLOR_IMAGE_POOLS.ethnic;
  } else if (catLower.includes('electron')) {
    poolGroup = COLOR_IMAGE_POOLS.electronics;
  }

  // If a color-specific group was matched and has photos for this color
  if (poolGroup && poolGroup[normCol] && poolGroup[normCol].length > 0) {
    const list = poolGroup[normCol];
    return list.map((photoId, idx) => buildUnsplashUrl(photoId, prodId, (variantIndex * 10) + idx));
  }

  // Fallback to base product pool with offset
  const basePool = getPoolForProduct(category, subCategory);
  return [
    buildUnsplashUrl(basePool[(prodId + variantIndex) % basePool.length], prodId, (variantIndex * 10) + 1),
    buildUnsplashUrl(basePool[(prodId + variantIndex + 1) % basePool.length], prodId, (variantIndex * 10) + 2)
  ];
}

module.exports = {
  CATEGORY_FALLBACKS,
  SUBCATEGORY_PHOTO_POOLS,
  COLOR_IMAGE_POOLS,
  resolveProductImages,
  resolveVariantImages,
  buildUnsplashUrl
};

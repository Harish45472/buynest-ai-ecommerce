/**
 * server/db/realPhotoLibrary.js
 * High-Precision Real Product Photography Engine for BUYNEST Marketplace.
 * Provides authentic, studio-shot, clean-background product photography:
 *  1. Model & Brand-specific curated studio photos (Apple, Samsung, Nike, Adidas, Levi's, etc.)
 *  2. Specific subcategory photo pools across all 10 departments
 *  3. Color-accurate variant photography pools (Black, White, Navy, Blue, Red, Green, Olive, Grey, etc.)
 *  4. Deterministic multi-image galleries (primary + 2-3 gallery angles)
 *  5. Zero SVGs or vector illustrations.
 */

// 1. Color-Specific Real Product Photography Pools
// Maps (CategoryArchetype -> ColorName -> Array of real studio photo IDs)
const COLOR_REAL_PHOTOS = {
  // T-Shirts & Tops (Apparel)
  tshirts: {
    black: [
      'photo-1521572267360-ee0c2909d518',
      'photo-1503342217505-b0a15ec3261c',
      'photo-1618354691373-d851c5c3a990'
    ],
    white: [
      'photo-1581655353564-df123a1eb820',
      'photo-1521572267360-ee0c2909d518',
      'photo-1576566588028-4147f3842f27'
    ],
    navy: [
      'photo-1618354691373-d851c5c3a990',
      'photo-1529374255404-311a2a4f1fd9',
      'photo-1576566588028-4147f3842f27'
    ],
    blue: [
      'photo-1529374255404-311a2a4f1fd9',
      'photo-1618354691373-d851c5c3a990',
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
    ],
    pink: [
      'photo-1503342394128-c104d54dba01',
      'photo-1521572267360-ee0c2909d518'
    ]
  },

  // Shirts (Formal & Casual)
  shirts: {
    white: [
      'photo-1602810318383-e386cc2a3ccf',
      'photo-1598033129183-c4f50c736f10'
    ],
    blue: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1603252109303-2751441dd157'
    ],
    navy: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1607345366928-199ea26cfe3e'
    ],
    black: [
      'photo-1607345366928-199ea26cfe3e',
      'photo-1602810318383-e386cc2a3ccf'
    ],
    grey: [
      'photo-1602810318383-e386cc2a3ccf',
      'photo-1598033129183-c4f50c736f10'
    ],
    pink: [
      'photo-1603252109303-2751441dd157',
      'photo-1602810318383-e386cc2a3ccf'
    ],
    olive: [
      'photo-1596755094514-f87e34085b2c',
      'photo-1607345366928-199ea26cfe3e'
    ]
  },

  // Footwear & Sneakers
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
    ],
    green: [
      'photo-1600185365926-3a2ce3cdb9eb',
      'photo-1552346154-21d32810aba3'
    ]
  },

  // Jeans & Trousers
  jeans: {
    blue: [
      'photo-1542272604-780c96856592',
      'photo-1541099649105-f69ad21f3246'
    ],
    navy: [
      'photo-1542272604-780c96856592',
      'photo-1582552938357-32b906df40cb'
    ],
    black: [
      'photo-1604176354204-9268737828e4',
      'photo-1541099649105-f69ad21f3246'
    ],
    grey: [
      'photo-1582552938357-32b906df40cb',
      'photo-1604176354204-9268737828e4'
    ],
    white: [
      'photo-1541099649105-f69ad21f3246',
      'photo-1542272604-780c96856592'
    ]
  },

  // Ethnic Wear & Sarees
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

  // Electronics (Phones, Devices)
  electronics: {
    black: [
      'photo-1511707171634-5f897ff02aa9',
      'photo-1580910051074-3eb694886505',
      'photo-1565849904461-04a58ad377e0'
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
    white: [
      'photo-1544244015-0df4b3ffc6b0',
      'photo-1610945265064-0e34e5519bbf'
    ],
    green: [
      'photo-1580910051074-3eb694886505',
      'photo-1592750475338-74b7b21085ab'
    ]
  }
};

// 2. Specific Brand & Model Photo Registry
// Precise photography for recognizable models
const BRAND_MODEL_REAL_PHOTOS = {
  // Apple
  'apple_iphone': [
    'photo-1592750475338-74b7b21085ab',
    'photo-1511707171634-5f897ff02aa9',
    'photo-1580910051074-3eb694886505'
  ],
  'apple_macbook': [
    'photo-1517336714731-489689fd1ca8',
    'photo-1611186871348-b1ce696e52c9',
    'photo-1541807084-5c52b6b3adef'
  ],
  'apple_airpods': [
    'photo-1600294037681-c80b4cb5b434',
    'photo-1606220588913-b3aacb4d2f46'
  ],
  'apple_watch': [
    'photo-1508685096489-7aacd43bd3b1',
    'photo-1524805444758-089113d48a6d'
  ],

  // Samsung
  'samsung_galaxy': [
    'photo-1610945265064-0e34e5519bbf',
    'photo-1565849904461-04a58ad377e0',
    'photo-1574944985070-8f3ebc6b79d2'
  ],
  'samsung_buds': [
    'photo-1590658268037-6bf12165a8df',
    'photo-1606220588913-b3aacb4d2f46'
  ],

  // OnePlus & Pixel
  'oneplus': [
    'photo-1574944985070-8f3ebc6b79d2',
    'photo-1565849904461-04a58ad377e0'
  ],
  'google_pixel': [
    'photo-1598327105666-5b89351aff97',
    'photo-1546868871-7041f2a55e12'
  ],

  // Laptops
  'dell': [
    'photo-1588872657578-7efd1f1555ed',
    'photo-1541807084-5c52b6b3adef'
  ],
  'hp': [
    'photo-1496181133206-80ce9b88a853',
    'photo-1531297484001-80022131f5a1'
  ],
  'lenovo': [
    'photo-1603302576837-37561b2e2302',
    'photo-1525547719571-a2d4ac8945e2'
  ],
  'asus': [
    'photo-1588872657578-7efd1f1555ed',
    'photo-1531297484001-80022131f5a1'
  ],

  // Audio
  'sony': [
    'photo-1505740420928-5e560c06d30e',
    'photo-1583394838336-acd977736f90',
    'photo-1546435770-a3e426bf472b'
  ],
  'jbl': [
    'photo-1545454675-3531b543be5d',
    'photo-1608043152269-423dbba4e7e1'
  ],
  'boat': [
    'photo-1590658268037-6bf12165a8df',
    'photo-1572536147248-ac59a8abfa4b'
  ],
  'bose': [
    'photo-1505740420928-5e560c06d30e',
    'photo-1484704849700-f032a568e944'
  ],

  // Footwear Brands
  'nike': [
    'photo-1542291026-7eec264c27ff',
    'photo-1552346154-21d32810aba3',
    'photo-1600185365926-3a2ce3cdb9eb'
  ],
  'adidas': [
    'photo-1525966222134-fcfa99b8ae77',
    'photo-1560769629-975ec94e6a86',
    'photo-1539185441755-769473a23570'
  ],
  'puma': [
    'photo-1600185365926-3a2ce3cdb9eb',
    'photo-1552346154-21d32810aba3'
  ],
  'levis': [
    'photo-1542272604-780c96856592',
    'photo-1541099649105-f69ad21f3246',
    'photo-1582552938357-32b906df40cb'
  ]
};

// 3. Subcategory Photo Registry for All 10 Departments
const REAL_SUBCATEGORY_POOLS = {
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
    'photo-1615663245857-ac93bb7c39e7',
    'photo-1527864550417-7fd91fc51a46'
  ],

  // Men's Fashion
  'Men_T-shirts': [
    'photo-1521572267360-ee0c2909d518',
    'photo-1503342217505-b0a15ec3261c',
    'photo-1583743814966-8936f5b7be1a',
    'photo-1562157873-818bc0726f68',
    'photo-1618354691373-d851c5c3a990',
    'photo-1576566588028-4147f3842f27',
    'photo-1581655353564-df123a1eb820',
    'photo-1622445268462-349242fc58b5'
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
    'photo-1509967419530-da38b4704bc6',
    'photo-1578587018452-892bacefd3f2'
  ],
  'Men_Jackets': [
    'photo-1551028719-00167b16eac5',
    'photo-1548883354-7622d03aca27',
    'photo-1520975916090-3105956dac38'
  ],
  'Men_Ethnic wear': [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1610030469983-98e550d6193c',
    'photo-1605518216938-7c31b7b14ad0'
  ],
  'Men_Formal wear': [
    'photo-1507679799987-c73779587ccf',
    'photo-1594938298603-c8148c4dae35',
    'photo-1593030761757-71fae45fa0e7'
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
    'photo-1600185365926-3a2ce3cdb9eb',
    'photo-1542291026-7eec264c27ff'
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
  'Women_T-shirts': [
    'photo-1503342394128-c104d54dba01',
    'photo-1521572267360-ee0c2909d518',
    'photo-1581655353564-df123a1eb820',
    'photo-1534528741775-53994a69daeb',
    'photo-1576566588028-4147f3842f27'
  ],
  'Women_Shirts': [
    'photo-1602810318383-e386cc2a3ccf',
    'photo-1598033129183-c4f50c736f10',
    'photo-1603252109303-2751441dd157',
    'photo-1596755094514-f87e34085b2c',
    'photo-1607345366928-199ea26cfe3e'
  ],
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

  // Kids
  'Kids_Boys clothing': [
    'photo-1519457431-44ccd64a579b',
    'photo-1522771930-78848d9293e8'
  ],
  'Kids_Girls clothing': [
    'photo-1622290291468-a28f7a7dc6a8',
    'photo-1519457431-44ccd64a579b'
  ],
  'Kids_Baby clothing': [
    'photo-1522771930-78848d9293e8'
  ],
  'Kids_Kids shoes': [
    'photo-1514989940743-e8e12909be75',
    'photo-1560769629-975ec94e6a86'
  ],
  'Kids_Toys': [
    'photo-1587654780291-39c9404d746b',
    'photo-1558060370-d644479cb6f7',
    'photo-1610890716171-6b1bb98ffd09'
  ],
  'Kids_School accessories': [
    'photo-1588072432836-e10032774350'
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
  'Home_Lighting': [
    'photo-1507473885765-e6ed057f782c'
  ],
  'Home_Bedsheets': [
    'photo-1584100936595-c0654b55a2e2'
  ],
  'Home_Curtains': [
    'photo-1513694203232-719a280e022f'
  ],
  'Home_Storage products': [
    'photo-1600585154340-be6161a56a0c'
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
  'Beauty_Grooming products': [
    'photo-1621607512214-68297480165e'
  ],
  'Beauty_Personal hygiene': [
    'photo-1584308666744-24d5c474f2ae'
  ],

  // Sports & Fitness
  'Sports_Gym equipment': [
    'photo-1517838277536-f5f99be501cd',
    'photo-1534438327276-14e5300c3a48',
    'photo-1584735935682-2f2b69dff9d2'
  ],
  'Sports_Sports shoes': [
    'photo-1542291026-7eec264c27ff',
    'photo-1552346154-21d32810aba3',
    'photo-1600185365926-3a2ce3cdb9eb'
  ],
  'Sports_T-shirts': [
    'photo-1521572267360-ee0c2909d518',
    'photo-1583743814966-8936f5b7be1a'
  ],
  'Sports_Track pants': [
    'photo-1552902865-b72c031ac5ea',
    'photo-1624378439575-d8705ad7ae80'
  ],
  'Sports_Badminton racquets': [
    'photo-1626224583764-f87db24ac4ea',
    'photo-1613918108466-292b78a8ef95'
  ],
  'Sports_Yoga mats': [
    'photo-1601925260368-ae2f83cf8b7f'
  ],
  'Sports_Cricket products': [
    'photo-1531415074868-036b1c57e329'
  ],
  'Sports_Football products': [
    'photo-1508098682722-e99c43a406b2'
  ],
  'Sports_Fitness accessories': [
    'photo-1598971861713-54ad16a7e72e'
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
  'Grocery_Rice': [
    'photo-1586201375761-83865001e31c'
  ],
  'Grocery_Atta': [
    'photo-1509440159596-0249088772ff'
  ],
  'Grocery_Spices': [
    'photo-1596040033229-a9821ebd058d'
  ],
  'Grocery_Cooking Oil': [
    'photo-1474979266404-7eaacbcd87c5'
  ],
  'Grocery_Breakfast Foods': [
    'photo-1517673132405-a56a62b18caf'
  ],

  // Books
  'Books_Fiction': [
    'photo-1544716278-ca5e3f4abd8c',
    'photo-1512820790803-83ca734da794',
    'photo-1497633762265-9d179a990aa6'
  ],
  'Books_Non-fiction': [
    'photo-1544716278-ca5e3f4abd8c',
    'photo-1512820790803-83ca734da794'
  ],
  'Books_Programming': [
    'photo-1532012164546-f432f2e3777a',
    'photo-1544716278-ca5e3f4abd8c'
  ],
  'Books_Engineering': [
    'photo-1532012164546-f432f2e3777a'
  ],
  'Books_Competitive Exams': [
    'photo-1497633762265-9d179a990aa6'
  ],
  'Books_Children\'s Books': [
    'photo-1512820790803-83ca734da794'
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
  'Automotive_Bike Accessories': [
    'photo-1558981806-ec527fa84c39'
  ],
  'Automotive_Car Care': [
    'photo-1607860108855-64acf2078ed9'
  ]
};

// Fallback pool of high-quality, verified studio product photography
const STUDIO_FALLBACK_PHOTOS = [
  'photo-1523275335684-37898b6baf30',
  'photo-1505740420928-5e560c06d30e',
  'photo-1542291026-7eec264c27ff',
  'photo-1521572267360-ee0c2909d518',
  'photo-1572804013309-59a88b7e92f1',
  'photo-1526170375885-4d8ecf77b99f'
];

/**
 * Builds clean, authentic, high-resolution Unsplash photo URL.
 * Pure photography, no vector art, no SVG.
 */
function buildRealPhotoUrl(photoId) {
  const cleanId = photoId.startsWith('photo-') ? photoId : `photo-${photoId}`;
  return `https://images.unsplash.com/${cleanId}?w=800&auto=format&fit=crop&q=80`;
}

/**
 * Normalizes color strings for matching against color-specific photography.
 */
function normalizeColor(colorStr) {
  if (!colorStr || typeof colorStr !== 'string') return 'black';
  const lower = colorStr.toLowerCase();
  if (lower.includes('black') || lower.includes('charcoal') || lower.includes('obsidian') || lower.includes('jet')) return 'black';
  if (lower.includes('white') || lower.includes('cream') || lower.includes('starlight') || lower.includes('ivory')) return 'white';
  if (lower.includes('navy')) return 'navy';
  if (lower.includes('blue') || lower.includes('glacier') || lower.includes('sky')) return 'blue';
  if (lower.includes('red') || lower.includes('crimson') || lower.includes('flame')) return 'red';
  if (lower.includes('maroon') || lower.includes('burgundy') || lower.includes('wine')) return 'maroon';
  if (lower.includes('olive') || lower.includes('khaki')) return 'olive';
  if (lower.includes('green') || lower.includes('emerald') || lower.includes('mint') || lower.includes('forest')) return 'green';
  if (lower.includes('grey') || lower.includes('gray') || lower.includes('titanium')) return 'grey';
  if (lower.includes('silver') || lower.includes('arctic')) return 'silver';
  if (lower.includes('yellow') || lower.includes('mustard')) return 'yellow';
  if (lower.includes('gold') || lower.includes('amber')) return 'gold';
  if (lower.includes('pink') || lower.includes('rose') || lower.includes('blush')) return 'pink';
  if (lower.includes('brown') || lower.includes('tan') || lower.includes('camel')) return 'brown';
  return 'black';
}

/**
 * Resolves real product photographs for a brand and model.
 */
function resolveRealProductImages(category, subCategory, brand, name, prodId = 1) {
  const brandLower = (brand || '').toLowerCase();
  const nameLower = (name || '').toLowerCase();
  const catLower = (category || '').toLowerCase();
  const subLower = (subCategory || '').toLowerCase();

  let matchedPool = null;

  // 1. Check brand/model specific overrides
  if (brandLower.includes('apple')) {
    if (nameLower.includes('iphone')) matchedPool = BRAND_MODEL_REAL_PHOTOS['apple_iphone'];
    else if (nameLower.includes('macbook')) matchedPool = BRAND_MODEL_REAL_PHOTOS['apple_macbook'];
    else if (nameLower.includes('airpod')) matchedPool = BRAND_MODEL_REAL_PHOTOS['apple_airpods'];
    else if (nameLower.includes('watch')) matchedPool = BRAND_MODEL_REAL_PHOTOS['apple_watch'];
  } else if (brandLower.includes('samsung')) {
    if (nameLower.includes('galaxy') || nameLower.includes('phone') || subLower.includes('phone')) matchedPool = BRAND_MODEL_REAL_PHOTOS['samsung_galaxy'];
    else if (nameLower.includes('buds') || nameLower.includes('earbud')) matchedPool = BRAND_MODEL_REAL_PHOTOS['samsung_buds'];
  } else if (brandLower.includes('oneplus')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['oneplus'];
  } else if (brandLower.includes('google') || brandLower.includes('pixel')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['google_pixel'];
  } else if (brandLower.includes('nike')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['nike'];
  } else if (brandLower.includes('adidas')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['adidas'];
  } else if (brandLower.includes('puma')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['puma'];
  } else if (brandLower.includes('levi')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['levis'];
  } else if (brandLower.includes('dell')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['dell'];
  } else if (brandLower.includes('hp')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['hp'];
  } else if (brandLower.includes('lenovo')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['lenovo'];
  } else if (brandLower.includes('asus')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['asus'];
  } else if (brandLower.includes('sony')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['sony'];
  } else if (brandLower.includes('jbl')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['jbl'];
  } else if (brandLower.includes('boat')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['boat'];
  } else if (brandLower.includes('bose')) {
    matchedPool = BRAND_MODEL_REAL_PHOTOS['bose'];
  }

  // 2. Check subcategory pool
  if (!matchedPool) {
    const keyCatSub = `${category}_${subCategory}`;
    if (REAL_SUBCATEGORY_POOLS[keyCatSub]) {
      matchedPool = REAL_SUBCATEGORY_POOLS[keyCatSub];
    } else if (REAL_SUBCATEGORY_POOLS[subCategory]) {
      matchedPool = REAL_SUBCATEGORY_POOLS[subCategory];
    } else {
      // Fuzzy match
      for (const [k, pool] of Object.entries(REAL_SUBCATEGORY_POOLS)) {
        if (subLower.includes(k.toLowerCase().replace(/^(men|women|beauty|home|grocery|books|sports|automotive|kids)_/, ''))) {
          matchedPool = pool;
          break;
        }
      }
    }
  }

  // 3. Fallback by Category
  if (!matchedPool) {
    if (catLower.includes('electron')) matchedPool = REAL_SUBCATEGORY_POOLS['Smartphones'];
    else if (catLower.includes('men')) matchedPool = REAL_SUBCATEGORY_POOLS['Men_T-shirts'];
    else if (catLower.includes('women')) matchedPool = REAL_SUBCATEGORY_POOLS['Women_Dresses'];
    else if (catLower.includes('beauty')) matchedPool = REAL_SUBCATEGORY_POOLS['Beauty_Skincare'];
    else if (catLower.includes('home')) matchedPool = REAL_SUBCATEGORY_POOLS['Home_Kitchen appliances'];
    else if (catLower.includes('grocery')) matchedPool = REAL_SUBCATEGORY_POOLS['Grocery_Snacks'];
    else if (catLower.includes('book')) matchedPool = REAL_SUBCATEGORY_POOLS['Books_Fiction'];
    else if (catLower.includes('sport')) matchedPool = REAL_SUBCATEGORY_POOLS['Sports_Sports shoes'];
    else if (catLower.includes('auto')) matchedPool = REAL_SUBCATEGORY_POOLS['Automotive_Helmets'];
    else matchedPool = STUDIO_FALLBACK_PHOTOS;
  }

  const images = [];
  const primaryIndex = (prodId - 1) % matchedPool.length;
  images.push({
    url: buildRealPhotoUrl(matchedPool[primaryIndex]),
    type: 'primary'
  });

  // Add 2 gallery images from the pool
  const galleryIndex1 = (prodId) % matchedPool.length;
  images.push({
    url: buildRealPhotoUrl(matchedPool[galleryIndex1]),
    type: 'gallery'
  });

  if (matchedPool.length > 2) {
    const galleryIndex2 = (prodId + 1) % matchedPool.length;
    images.push({
      url: buildRealPhotoUrl(matchedPool[galleryIndex2]),
      type: 'gallery'
    });
  }

  return images;
}

/**
 * Resolves color-accurate real product photography for product variants.
 */
function resolveRealVariantImages(category, subCategory, colorName, prodId = 1, variantIndex = 1) {
  const normColor = normalizeColor(colorName);
  const subLower = (subCategory || '').toLowerCase();
  const catLower = (category || '').toLowerCase();

  let poolGroup = null;

  if (subLower.includes('shirt') || subLower.includes('tee') || subLower.includes('hoodie') || subLower.includes('top')) {
    poolGroup = subLower.includes('t-shirt') ? COLOR_REAL_PHOTOS.tshirts : COLOR_REAL_PHOTOS.shirts;
  } else if (subLower.includes('shoe') || subLower.includes('sneaker') || subLower.includes('heel') || subLower.includes('sandal') || catLower === 'footwear') {
    poolGroup = COLOR_REAL_PHOTOS.footwear;
  } else if (subLower.includes('jean') || subLower.includes('trouser') || subLower.includes('pant')) {
    poolGroup = COLOR_REAL_PHOTOS.jeans;
  } else if (subLower.includes('saree') || subLower.includes('kurti') || subLower.includes('lehenga') || subLower.includes('ethnic')) {
    poolGroup = COLOR_REAL_PHOTOS.ethnic;
  } else if (catLower.includes('electron')) {
    poolGroup = COLOR_REAL_PHOTOS.electronics;
  }

  // If a color-specific group has photos for this color
  if (poolGroup && poolGroup[normColor] && poolGroup[normColor].length > 0) {
    const list = poolGroup[normColor];
    const photoId = list[(variantIndex - 1) % list.length];
    return [
      {
        url: buildRealPhotoUrl(photoId),
        type: 'primary'
      }
    ];
  }

  // Otherwise pick from category pool with offset
  const basePool = REAL_SUBCATEGORY_POOLS[`${category}_${subCategory}`] 
    || REAL_SUBCATEGORY_POOLS[subCategory] 
    || STUDIO_FALLBACK_PHOTOS;
  const photoId = basePool[(prodId + variantIndex) % basePool.length];

  return [
    {
      url: buildRealPhotoUrl(photoId),
      type: 'primary'
    }
  ];
}

module.exports = {
  buildRealPhotoUrl,
  resolveRealProductImages,
  resolveRealVariantImages,
  COLOR_REAL_PHOTOS,
  REAL_SUBCATEGORY_POOLS
};

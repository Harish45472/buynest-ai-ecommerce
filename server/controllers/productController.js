const db = require('../db/database');

// Helper to safely parse JSON columns
function formatProduct(p) {
  if (!p) return null;
  return {
    ...p,
    images: p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [p.image_url],
    sizes: p.sizes ? (typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes) : ['Standard'],
    colors: p.colors ? (typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors) : ['Default'],
    specifications: p.specifications ? (typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications) : {},
    tags: p.tags ? (typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags) : []
  };
}

exports.getProducts = (req, res) => {
  try {
    const { q, category, sub_category, brands, minPrice, maxPrice, minRating, gender, inStock, sortBy } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (q && q.trim()) {
      const searchTerm = `%${q.trim().toLowerCase()}%`;
      query += ' AND (LOWER(name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(category) LIKE ? OR LOWER(sub_category) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ?)';
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (category && category !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (sub_category && sub_category !== 'all') {
      query += ' AND LOWER(sub_category) = LOWER(?)';
      params.push(sub_category);
    }

    if (brands && brands.trim()) {
      const brandList = brands.split(',').map(b => b.trim().toLowerCase()).filter(Boolean);
      if (brandList.length > 0) {
        const placeholders = brandList.map(() => '?').join(',');
        query += ` AND LOWER(brand) IN (${placeholders})`;
        params.push(...brandList);
      }
    }

    if (gender && gender !== 'all') {
      query += ' AND (LOWER(gender) = LOWER(?) OR LOWER(gender) = "unisex")';
      params.push(gender);
    }

    if (minRating && !isNaN(Number(minRating))) {
      query += ' AND rating >= ?';
      params.push(Number(minRating));
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      query += ' AND price >= ?';
      params.push(Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    if (inStock === 'true') {
      query += ' AND stock > 0';
    }

    switch (sortBy) {
      case 'price_asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price_desc':
        query += ' ORDER BY price DESC';
        break;
      case 'rating_desc':
      case 'rating':
        query += ' ORDER BY rating DESC, reviews_count DESC';
        break;
      case 'newest':
        query += ' ORDER BY product_id DESC';
        break;
      case 'popular':
        query += ' ORDER BY is_popular DESC, reviews_count DESC, rating DESC';
        break;
      default:
        query += ' ORDER BY featured DESC, is_popular DESC, rating DESC, product_id DESC';
        break;
    }

    const rows = db.prepare(query).all(...params);
    const products = rows.map(formatProduct);
    res.json({ products, total: products.length });
  } catch (err) {
    console.error('getProducts error:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
};

exports.getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const row = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);

    if (!row) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const product = formatProduct(row);

    // Fetch complementary related products in the same category
    const relatedRows = db.prepare(`
      SELECT * FROM products 
      WHERE category = ? AND product_id != ? 
      ORDER BY rating DESC, reviews_count DESC
      LIMIT 4
    `).all(product.category, product.product_id);

    const related = relatedRows.map(formatProduct);

    res.json({ product, related });
  } catch (err) {
    console.error('getProductById error:', err);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
};

// Returns dynamic filter facets (brands with count, subcategories with count, min/max price)
exports.getFacets = (req, res) => {
  try {
    const { category } = req.query;
    let baseWhere = 'WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      baseWhere += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    // Brands with counts
    const brandRows = db.prepare(`
      SELECT brand, COUNT(*) as count 
      FROM products 
      ${baseWhere} 
      GROUP BY brand 
      ORDER BY count DESC, brand ASC
    `).all(...params);

    // Subcategories with counts
    const subCatRows = db.prepare(`
      SELECT sub_category, COUNT(*) as count 
      FROM products 
      ${baseWhere} 
      GROUP BY sub_category 
      ORDER BY count DESC
    `).all(...params);

    // Min & Max prices
    const priceStats = db.prepare(`
      SELECT MIN(price) as minPrice, MAX(price) as maxPrice 
      FROM products 
      ${baseWhere}
    `).get(...params);

    res.json({
      brands: brandRows,
      subCategories: subCatRows,
      priceRange: {
        min: priceStats?.minPrice || 0,
        max: priceStats?.maxPrice || 100000
      }
    });
  } catch (err) {
    console.error('getFacets error:', err);
    res.status(500).json({ error: 'Failed to fetch filter facets.' });
  }
};

// "Frequently Bought Together" bundle generator
exports.getBundle = (req, res) => {
  try {
    const { id } = req.params;
    const mainProd = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);

    if (!mainProd) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Find 2 complementary products: one from same category (different subcategory) and one popular accessory
    const compRows = db.prepare(`
      SELECT * FROM products 
      WHERE product_id != ? AND category = ?
      ORDER BY rating DESC, reviews_count DESC
      LIMIT 2
    `).all(mainProd.product_id, mainProd.category);

    const items = [formatProduct(mainProd), ...compRows.map(formatProduct)];
    const originalTotal = items.reduce((sum, item) => sum + item.price, 0);
    const bundleDiscount = Math.round(originalTotal * 0.10); // Extra 10% bundle savings
    const bundlePrice = originalTotal - bundleDiscount;

    res.json({
      items,
      originalTotal,
      bundleDiscount,
      bundlePrice
    });
  } catch (err) {
    console.error('getBundle error:', err);
    res.status(500).json({ error: 'Failed to generate product bundle.' });
  }
};

exports.createProduct = (req, res) => {
  try {
    const {
      name, brand, category, sub_category = 'General', description,
      price, mrp, stock, image_url, images, sizes, colors,
      seller_name, specifications, tags, gender, featured
    } = req.body;

    if (!name || !category || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'Name, category, description, price, and stock are required.' });
    }

    const numPrice = Number(price);
    const numStock = parseInt(stock, 10);
    const numMrp = mrp ? Number(mrp) : Math.round(numPrice * 1.5);
    const disc = Math.round(((numMrp - numPrice) / numMrp) * 100);

    const defaultImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80';
    const finalImage = image_url && image_url.trim() ? image_url.trim() : defaultImg;

    const result = db.prepare(`
      INSERT INTO products (
        name, brand, category, sub_category, description,
        price, mrp, discount_percent, stock, image_url,
        images, sizes, colors, rating, reviews_count,
        seller_name, specifications, tags, gender, featured, is_popular
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 4.5, 0, ?, ?, ?, ?, ?, 0)
    `).run(
      name.trim(),
      (brand || 'BUYNEST Select').trim(),
      category.trim(),
      sub_category.trim(),
      description.trim(),
      numPrice,
      numMrp,
      disc,
      numStock,
      finalImage,
      JSON.stringify(images || [finalImage]),
      JSON.stringify(sizes || ['Standard']),
      JSON.stringify(colors || ['Default']),
      (seller_name || 'BUYNEST Direct').trim(),
      JSON.stringify(specifications || {}),
      JSON.stringify(tags || []),
      gender || 'Unisex',
      featured ? 1 : 0
    );

    const newProduct = formatProduct(db.prepare('SELECT * FROM products WHERE product_id = ?').get(result.lastInsertRowid));
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ error: 'Failed to create product.' });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, brand, category, sub_category, description, price, mrp,
      stock, image_url, featured, rating, seller_name
    } = req.body;

    const existing = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const updatedName = name !== undefined ? name.trim() : existing.name;
    const updatedBrand = brand !== undefined ? brand.trim() : existing.brand;
    const updatedCat = category !== undefined ? category.trim() : existing.category;
    const updatedSubCat = sub_category !== undefined ? sub_category.trim() : existing.sub_category;
    const updatedDesc = description !== undefined ? description.trim() : existing.description;
    const updatedPrice = price !== undefined ? Number(price) : existing.price;
    const updatedMrp = mrp !== undefined ? Number(mrp) : existing.mrp;
    const updatedDisc = Math.round(((updatedMrp - updatedPrice) / updatedMrp) * 100);
    const updatedStock = stock !== undefined ? parseInt(stock, 10) : existing.stock;
    const updatedImg = image_url !== undefined ? image_url.trim() : existing.image_url;
    const updatedFeatured = featured !== undefined ? (featured ? 1 : 0) : existing.featured;
    const updatedRating = rating !== undefined ? Number(rating) : existing.rating;
    const updatedSeller = seller_name !== undefined ? seller_name.trim() : existing.seller_name;

    db.prepare(`
      UPDATE products
      SET name = ?, brand = ?, category = ?, sub_category = ?, description = ?,
          price = ?, mrp = ?, discount_percent = ?, stock = ?, image_url = ?,
          featured = ?, rating = ?, seller_name = ?
      WHERE product_id = ?
    `).run(
      updatedName, updatedBrand, updatedCat, updatedSubCat, updatedDesc,
      updatedPrice, updatedMrp, updatedDisc, updatedStock, updatedImg,
      updatedFeatured, updatedRating, updatedSeller, id
    );

    const updatedProduct = formatProduct(db.prepare('SELECT * FROM products WHERE product_id = ?').get(id));
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ error: 'Failed to update product.' });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    db.prepare('DELETE FROM products WHERE product_id = ?').run(id);
    res.json({ message: 'Product deleted successfully', product_id: Number(id) });
  } catch (err) {
    console.error('deleteProduct error:', err);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};

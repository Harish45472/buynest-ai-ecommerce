const db = require('../db/database');

exports.getProducts = (req, res) => {
  try {
    const { q, category, sub_category, minPrice, maxPrice, inStock, sortBy } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (q && q.trim()) {
      query += ' AND (name LIKE ? OR description LIKE ? OR sub_category LIKE ?)';
      params.push(`%${q.trim()}%`, `%${q.trim()}%`, `%${q.trim()}%`);
    }

    if (category && category !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (sub_category && sub_category !== 'all') {
      query += ' AND LOWER(sub_category) = LOWER(?)';
      params.push(sub_category);
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
      case 'rating':
        query += ' ORDER BY rating DESC';
        break;
      case 'newest':
        query += ' ORDER BY product_id DESC';
        break;
      default:
        query += ' ORDER BY featured DESC, rating DESC, product_id DESC';
        break;
    }

    const products = db.prepare(query).all(...params);
    res.json({ products, total: products.length });
  } catch (err) {
    console.error('getProducts error:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
};

exports.getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Also fetch related products in the same category
    const related = db.prepare(`
      SELECT * FROM products 
      WHERE category = ? AND product_id != ? 
      LIMIT 4
    `).all(product.category, product.product_id);

    res.json({ product, related });
  } catch (err) {
    console.error('getProductById error:', err);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
};

exports.createProduct = (req, res) => {
  try {
    const { name, category, sub_category = 'General', description, price, stock, image_url, featured } = req.body;

    if (!name || !category || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'Name, category, description, price, and stock are required.' });
    }

    const numPrice = Number(price);
    const numStock = parseInt(stock, 10);

    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({ error: 'Price must be a valid positive number.' });
    }

    if (isNaN(numStock) || numStock < 0) {
      return res.status(400).json({ error: 'Stock must be a valid non-negative integer.' });
    }

    const defaultImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80';
    const finalImage = image_url && image_url.trim() ? image_url.trim() : defaultImg;

    const result = db.prepare(`
      INSERT INTO products (name, category, sub_category, description, price, stock, image_url, rating, reviews_count, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, 4.5, 0, ?)
    `).run(name.trim(), category.trim(), (sub_category || 'General').trim(), description.trim(), numPrice, numStock, finalImage, featured ? 1 : 0);

    const newProduct = db.prepare('SELECT * FROM products WHERE product_id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ error: 'Failed to create product.' });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, sub_category, description, price, stock, image_url, featured, rating } = req.body;

    const existing = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const updatedName = name !== undefined ? name.trim() : existing.name;
    const updatedCat = category !== undefined ? category.trim() : existing.category;
    const updatedSubCat = sub_category !== undefined ? sub_category.trim() : (existing.sub_category || 'General');
    const updatedDesc = description !== undefined ? description.trim() : existing.description;
    const updatedPrice = price !== undefined ? Number(price) : existing.price;
    const updatedStock = stock !== undefined ? parseInt(stock, 10) : existing.stock;
    const updatedImg = image_url !== undefined ? image_url.trim() : existing.image_url;
    const updatedFeatured = featured !== undefined ? (featured ? 1 : 0) : existing.featured;
    const updatedRating = rating !== undefined ? Number(rating) : existing.rating;

    db.prepare(`
      UPDATE products
      SET name = ?, category = ?, sub_category = ?, description = ?, price = ?, stock = ?, image_url = ?, featured = ?, rating = ?
      WHERE product_id = ?
    `).run(updatedName, updatedCat, updatedSubCat, updatedDesc, updatedPrice, updatedStock, updatedImg, updatedFeatured, updatedRating, id);

    const updatedProduct = db.prepare('SELECT * FROM products WHERE product_id = ?').get(id);
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

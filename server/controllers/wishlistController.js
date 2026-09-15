const db = require('../db/database');

// Helper to format product
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

exports.getWishlist = (req, res) => {
  try {
    const userId = req.user.user_id;
    const items = db.prepare(`
      SELECT p.*, w.wishlist_id, w.created_at as wishlisted_at
      FROM wishlist w
      JOIN products p ON w.product_id = p.product_id
      WHERE w.user_id = ?
      ORDER BY w.wishlist_id DESC
    `).all(userId);

    res.json({ items: items.map(formatProduct) });
  } catch (err) {
    console.error('getWishlist error:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist items.' });
  }
};

exports.addToWishlist = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const product = db.prepare('SELECT * FROM products WHERE product_id = ?').get(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Check if already in wishlist
    const existing = db.prepare('SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?').get(userId, product_id);
    if (!existing) {
      db.prepare('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)').run(userId, product_id);
    }

    const items = db.prepare(`
      SELECT p.*, w.wishlist_id, w.created_at as wishlisted_at
      FROM wishlist w
      JOIN products p ON w.product_id = p.product_id
      WHERE w.user_id = ?
      ORDER BY w.wishlist_id DESC
    `).all(userId);

    res.json({ message: 'Product added to wishlist.', items: items.map(formatProduct) });
  } catch (err) {
    console.error('addToWishlist error:', err);
    res.status(500).json({ error: 'Failed to add to wishlist.' });
  }
};

exports.removeFromWishlist = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { productId } = req.params;

    db.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(userId, productId);

    const items = db.prepare(`
      SELECT p.*, w.wishlist_id, w.created_at as wishlisted_at
      FROM wishlist w
      JOIN products p ON w.product_id = p.product_id
      WHERE w.user_id = ?
      ORDER BY w.wishlist_id DESC
    `).all(userId);

    res.json({ message: 'Item removed from wishlist.', items: items.map(formatProduct) });
  } catch (err) {
    console.error('removeFromWishlist error:', err);
    res.status(500).json({ error: 'Failed to remove from wishlist.' });
  }
};

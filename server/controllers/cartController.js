const db = require('../db/database');

exports.getCart = (req, res) => {
  try {
    const userId = req.user.user_id;

    const items = db.prepare(`
      SELECT 
        c.cart_id,
        c.user_id,
        c.product_id,
        c.quantity,
        c.updated_at,
        p.name,
        p.category,
        p.price,
        p.stock AS available_stock,
        p.image_url,
        (c.quantity * p.price) AS item_total,
        (c.quantity > p.stock) AS is_stock_exceeded
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.user_id = ?
      ORDER BY c.updated_at DESC
    `).all(userId);

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      items,
      subtotal: Number(subtotal.toFixed(2)),
      totalItems
    });
  } catch (err) {
    console.error('getCart error:', err);
    res.status(500).json({ error: 'Failed to fetch cart.' });
  }
};

exports.addToCart = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { product_id, quantity = 1 } = req.body;

    const addQty = parseInt(quantity, 10) || 1;
    if (addQty <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
    }

    const product = db.prepare('SELECT * FROM products WHERE product_id = ?').get(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ error: 'Sorry, this product is currently out of stock.' });
    }

    const existingItem = db.prepare(`
      SELECT * FROM cart WHERE user_id = ? AND product_id = ?
    `).get(userId, product_id);

    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    const newQty = currentQtyInCart + addQty;

    if (newQty > product.stock) {
      return res.status(400).json({
        error: `Only ${product.stock} units available in stock. You already have ${currentQtyInCart} in your cart.`
      });
    }

    if (existingItem) {
      db.prepare(`
        UPDATE cart 
        SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE cart_id = ?
      `).run(newQty, existingItem.cart_id);
    } else {
      db.prepare(`
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
      `).run(userId, product_id, newQty);
    }

    return exports.getCart(req, res);
  } catch (err) {
    console.error('addToCart error:', err);
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
};

exports.updateQuantity = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params; // cart_id
    const { quantity } = req.body;

    const newQty = parseInt(quantity, 10);
    if (isNaN(newQty)) {
      return res.status(400).json({ error: 'Invalid quantity.' });
    }

    const cartItem = db.prepare(`
      SELECT c.*, p.stock 
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.cart_id = ? AND c.user_id = ?
    `).get(id, userId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    if (newQty <= 0) {
      db.prepare('DELETE FROM cart WHERE cart_id = ?').run(id);
      return exports.getCart(req, res);
    }

    if (newQty > cartItem.stock) {
      return res.status(400).json({
        error: `Cannot exceed available stock of ${cartItem.stock} items.`
      });
    }

    db.prepare(`
      UPDATE cart 
      SET quantity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE cart_id = ?
    `).run(newQty, id);

    return exports.getCart(req, res);
  } catch (err) {
    console.error('updateQuantity error:', err);
    res.status(500).json({ error: 'Failed to update cart quantity.' });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const result = db.prepare('DELETE FROM cart WHERE cart_id = ? AND user_id = ?').run(id, userId);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    return exports.getCart(req, res);
  } catch (err) {
    console.error('removeFromCart error:', err);
    res.status(500).json({ error: 'Failed to remove item from cart.' });
  }
};

exports.clearCart = (req, res) => {
  try {
    const userId = req.user.user_id;
    db.prepare('DELETE FROM cart WHERE user_id = ?').run(userId);
    res.json({ message: 'Cart cleared successfully', items: [], subtotal: 0, totalItems: 0 });
  } catch (err) {
    console.error('clearCart error:', err);
    res.status(500).json({ error: 'Failed to clear cart.' });
  }
};

const db = require('../db/database');

exports.createOrder = (req, res) => {
  try {
    const userId = req.user.user_id;
    const {
      shipping_name,
      shipping_address,
      shipping_city,
      shipping_postal,
      payment_method = 'Credit Card'
    } = req.body;

    if (!shipping_name || !shipping_address || !shipping_city || !shipping_postal) {
      return res.status(400).json({ error: 'Please provide full shipping details (name, address, city, and postal code).' });
    }

    // Execute atomic transaction for checkout
    const checkoutTx = db.transaction(() => {
      // 1. Get user cart items
      const cartItems = db.prepare(`
        SELECT c.cart_id, c.product_id, c.quantity, p.name, p.price, p.stock
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.user_id = ?
      `).all(userId);

      if (!cartItems || cartItems.length === 0) {
        throw new Error('Your cart is empty. Please add products before placing an order.');
      }

      // 2. Validate stock for every item
      for (const item of cartItems) {
        if (item.quantity > item.stock) {
          throw new Error(`Insufficient stock for "${item.name}". Only ${item.stock} available, but you requested ${item.quantity}.`);
        }
      }

      // 3. Calculate total amount (Free shipping over $50, else $10)
      const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const shippingFee = subtotal > 50 ? 0 : 9.99;
      const totalAmount = Number((subtotal + shippingFee).toFixed(2));

      // 4. Create Order record
      const orderInsert = db.prepare(`
        INSERT INTO orders (user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_postal, payment_method)
        VALUES (?, ?, 'pending', ?, ?, ?, ?, ?)
      `).run(userId, totalAmount, shipping_name.trim(), shipping_address.trim(), shipping_city.trim(), shipping_postal.trim(), payment_method);

      const orderId = orderInsert.lastInsertRowid;

      // 5. Deduct inventory and insert order items
      const insertOrderItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `);

      const deductStock = db.prepare(`
        UPDATE products SET stock = stock - ? WHERE product_id = ?
      `);

      for (const item of cartItems) {
        deductStock.run(item.quantity, item.product_id);
        insertOrderItem.run(orderId, item.product_id, item.quantity, item.price);
      }

      // 6. Clear cart
      db.prepare('DELETE FROM cart WHERE user_id = ?').run(userId);

      return { orderId, totalAmount, subtotal, shippingFee };
    });

    const result = checkoutTx();

    // Fetch newly created order with items
    const newOrder = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(result.orderId);
    const items = db.prepare(`
      SELECT oi.*, p.name, p.image_url, p.category
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `).all(result.orderId);

    res.status(201).json({
      message: 'Order placed successfully!',
      order: {
        ...newOrder,
        items
      }
    });
  } catch (err) {
    console.error('createOrder error:', err.message);
    res.status(400).json({ error: err.message || 'Failed to complete order checkout.' });
  }
};

exports.getUserOrders = (req, res) => {
  try {
    const userId = req.user.user_id;

    const orders = db.prepare(`
      SELECT * FROM orders 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `).all(userId);

    const getItems = db.prepare(`
      SELECT oi.*, p.name, p.image_url, p.category
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `);

    const ordersWithItems = orders.map(order => ({
      ...order,
      items: getItems.all(order.order_id)
    }));

    res.json({ orders: ordersWithItems });
  } catch (err) {
    console.error('getUserOrders error:', err);
    res.status(500).json({ error: 'Failed to fetch your orders.' });
  }
};

exports.getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;
    const isAdmin = req.user.role === 'admin';

    let order;
    if (isAdmin) {
      order = db.prepare(`
        SELECT o.*, u.name as customer_name, u.email as customer_email
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        WHERE o.order_id = ?
      `).get(id);
    } else {
      order = db.prepare('SELECT * FROM orders WHERE order_id = ? AND user_id = ?').get(id, userId);
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const items = db.prepare(`
      SELECT oi.*, p.name, p.image_url, p.category
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `).all(id);

    res.json({ order: { ...order, items } });
  } catch (err) {
    console.error('getOrderById error:', err);
    res.status(500).json({ error: 'Failed to fetch order details.' });
  }
};

// Admin Endpoints
exports.getAllOrders = (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ' WHERE o.status = ?';
      params.push(status);
    }

    query += ' ORDER BY o.created_at DESC';

    const orders = db.prepare(query).all(...params);

    const getItems = db.prepare(`
      SELECT oi.*, p.name, p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `);

    const ordersWithItems = orders.map(order => ({
      ...order,
      items: getItems.all(order.order_id)
    }));

    res.json({ orders: ordersWithItems, total: orders.length });
  } catch (err) {
    console.error('getAllOrders error:', err);
    res.status(500).json({ error: 'Failed to fetch all orders.' });
  }
};

exports.updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // If changing to cancelled and it wasn't already cancelled, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(id);
      const restoreStock = db.prepare('UPDATE products SET stock = stock + ? WHERE product_id = ?');
      for (const item of items) {
        restoreStock.run(item.quantity, item.product_id);
      }
    }

    db.prepare('UPDATE orders SET status = ? WHERE order_id = ?').run(status, id);

    const updated = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(id);
    res.json({ message: 'Order status updated successfully', order: updated });
  } catch (err) {
    console.error('updateOrderStatus error:', err);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
};

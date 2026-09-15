const db = require('../db/database');

exports.getStats = (req, res) => {
  try {
    const totalOrdersRow = db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(total_amount), 0) as revenue FROM orders WHERE status != "cancelled"').get();
    const totalProductsRow = db.prepare('SELECT COUNT(*) as count FROM products').get();
    const totalUsersRow = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "user"').get();
    const lowStockCountRow = db.prepare('SELECT COUNT(*) as count FROM products WHERE stock <= 5').get();

    const lowStockProducts = db.prepare('SELECT product_id, name, stock, price, category FROM products WHERE stock <= 5 ORDER BY stock ASC').all();
    const recentOrders = db.prepare(`
      SELECT o.order_id, o.total_amount, o.status, o.created_at, u.name as customer_name
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
      LIMIT 5
    `).all();

    res.json({
      stats: {
        totalRevenue: Number(totalOrdersRow.revenue.toFixed(2)),
        totalOrders: totalOrdersRow.count,
        totalProducts: totalProductsRow.count,
        totalCustomers: totalUsersRow.count,
        lowStockCount: lowStockCountRow.count
      },
      lowStockProducts,
      recentOrders
    });
  } catch (err) {
    console.error('getStats error:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats.' });
  }
};

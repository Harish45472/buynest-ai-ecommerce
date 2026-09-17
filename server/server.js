require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { verifyToken, optionalToken, requireAdmin } = require('./middleware/auth');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');
const adminController = require('./controllers/adminController');
const wishlistController = require('./controllers/wishlistController');
const paymentRoutes = require('./routes/payments');
const aiService = require('./services/aiService');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static product image assets
const productsPath = path.join(__dirname, '../client/public/products');
if (fs.existsSync(productsPath)) {
  app.use('/products', express.static(productsPath));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'BUYNEST', time: new Date().toISOString() });
});

// --- Auth Routes ---
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/google', authController.googleLogin);
app.get('/api/auth/me', verifyToken, authController.getMe);

// --- Product Routes ---
app.get('/api/products/facets', productController.getFacets);
app.get('/api/products/search-suggestions', productController.getSearchSuggestions);
app.get('/api/products/:id/bundle', productController.getBundle);
app.get('/api/products', productController.getProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', verifyToken, requireAdmin, productController.createProduct);
app.put('/api/products/:id', verifyToken, requireAdmin, productController.updateProduct);
app.delete('/api/products/:id', verifyToken, requireAdmin, productController.deleteProduct);

// --- Wishlist Routes ---
app.get('/api/wishlist', verifyToken, wishlistController.getWishlist);
app.post('/api/wishlist', verifyToken, wishlistController.addToWishlist);
app.delete('/api/wishlist/:productId', verifyToken, wishlistController.removeFromWishlist);

// --- Category Routes ---
app.get('/api/categories', categoryController.getCategories);
app.post('/api/categories', verifyToken, requireAdmin, categoryController.createCategory);
app.delete('/api/categories/:id', verifyToken, requireAdmin, categoryController.deleteCategory);

// --- Cart Routes ---
app.get('/api/cart', verifyToken, cartController.getCart);
app.post('/api/cart', verifyToken, cartController.addToCart);
app.put('/api/cart/:id', verifyToken, cartController.updateQuantity);
app.delete('/api/cart/:id', verifyToken, cartController.removeFromCart);
app.delete('/api/cart', verifyToken, cartController.clearCart);

// --- Order Routes ---
app.post('/api/orders', verifyToken, orderController.createOrder);
app.get('/api/orders', verifyToken, orderController.getUserOrders);
app.get('/api/orders/:id', verifyToken, orderController.getOrderById);
app.post('/api/orders/:id/cancel', verifyToken, orderController.cancelOrder);

// --- Payment Routes (Razorpay & UPI) ---
app.use('/api/payments', paymentRoutes);

// --- Admin Order & Stats Routes ---
app.get('/api/admin/orders', verifyToken, requireAdmin, orderController.getAllOrders);
app.patch('/api/admin/orders/:id/status', verifyToken, requireAdmin, orderController.updateOrderStatus);
app.get('/api/admin/stats', verifyToken, requireAdmin, adminController.getStats);

// --- AI Assistant Routes ---
app.post('/api/ai/chat', aiService.chat);
app.get('/api/ai/recommend-similar/:productId', aiService.getSimilarRecommendations);

// Serve static frontend files if client/dist exists, or build if missing
const clientDist = path.join(__dirname, '../client/dist');
if (!fs.existsSync(clientDist)) {
  console.log('⚠️ client/dist not found. Attempting to build frontend production bundle...');
  try {
    const { execSync } = require('child_process');
    const clientDir = path.join(__dirname, '../client');
    if (fs.existsSync(path.join(clientDir, 'package.json'))) {
      execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });
    }
  } catch (e) {
    console.warn('⚠️ Could not auto-build frontend bundle:', e.message);
  }
}

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ error: `API route ${req.originalUrl} not found.` });
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // Helpful landing page if frontend bundle has not yet been built
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>BUYNEST Fullstack Server</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 40px; max-width: 580px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
            h1 { font-size: 26px; margin-bottom: 12px; color: #10b981; }
            p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
            code { background: #0f172a; padding: 4px 8px; border-radius: 6px; font-size: 14px; color: #38bdf8; border: 1px solid #334155; }
            .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 12px; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🚀 BUYNEST API Server is Live!</h1>
            <p>The backend REST API and SQLite database are active and healthy.</p>
            <p>To launch the React storefront UI, run:</p>
            <p><code>npm run build</code> (Production) or <code>npm run dev</code> (Development)</p>
            <a href="/api/health" class="btn">View API Health Status →</a>
          </div>
        </body>
      </html>
    `);
  });
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: `API route ${req.originalUrl} not found.` });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error.' });
});

const seed = require('./db/seed');

async function startServer() {
  try {
    await db.init();
    console.log('📦 Database initialized and ready.');

    // Auto-seed if database has no products or no users (e.g. freshly cloned from GitHub)
    try {
      const productCheck = db.prepare('SELECT COUNT(*) as count FROM products').get();
      const userCheck = db.prepare('SELECT COUNT(*) as count FROM users').get();
      if (!productCheck || productCheck.count === 0 || !userCheck || userCheck.count === 0) {
        console.log('🌱 Fresh or empty database detected on startup. Auto-seeding 1,280+ products and demo users...');
        await seed();
        console.log('✅ Auto-seeding completed successfully.');
      }
    } catch (seedErr) {
      console.warn('⚠️ Auto-seed check notice:', seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database and start server:', err);
    process.exit(1);
  }
}

startServer();

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

// Serve static frontend files if client/dist exists
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ error: `API route ${req.originalUrl} not found.` });
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // Global 404 for unmatched API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: `API route ${req.originalUrl} not found.` });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error.' });
});

async function startServer() {
  try {
    await db.init();
    console.log('📦 Database initialized and ready.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database and start server:', err);
    process.exit(1);
  }
}

startServer();

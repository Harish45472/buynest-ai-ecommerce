const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

// Public config to fetch public key_id safely
router.get('/config', paymentController.getConfig);

// Order creation via Razorpay
router.post('/create-order', verifyToken, paymentController.createOrder);

// Verify signature and commit order
router.post('/verify', verifyToken, paymentController.verifyPayment);

// Webhook endpoint
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;

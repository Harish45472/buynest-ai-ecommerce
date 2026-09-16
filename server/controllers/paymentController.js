const crypto = require('crypto');
const Razorpay = require('razorpay');
const db = require('../db/database');

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

const isLiveRazorpay = keyId && keySecret && !keyId.includes('placeholder') && !keySecret.includes('placeholder');

let razorpayInstance = null;
if (isLiveRazorpay) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
    console.log('💳 Razorpay official SDK initialized with live/test API keys');
  } catch (err) {
    console.warn('⚠️ Razorpay initialization warning:', err.message);
  }
} else {
  console.log('ℹ️ Razorpay running in test/sandbox simulator mode (safe fallback for development & automated tests)');
}

// 1. Get Client Config (Safe Public Key)
exports.getConfig = (req, res) => {
  const currentKey = isLiveRazorpay ? keyId : 'rzp_test_buynest_demo_key';
  res.json({
    success: true,
    key_id: currentKey,
    keyId: currentKey,
    is_test_mode: !isLiveRazorpay,
    testMode: !isLiveRazorpay,
    store_name: 'BUYNEST',
    currency: 'INR'
  });
};

// 2. Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'A valid amount is required' });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    const receiptId = receipt || `order_rcpt_${Date.now()}`;

    if (isLiveRazorpay && razorpayInstance) {
      const options = {
        amount: amountInPaise,
        currency,
        receipt: receiptId,
        notes: notes || { store: 'BUYNEST Marketplace' }
      };

      const order = await razorpayInstance.orders.create(options);
      return res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status
        }
      });
    } else {
      // Test simulator order
      const mockOrderId = `order_sim_${crypto.randomBytes(8).toString('hex')}`;
      return res.json({
        success: true,
        is_simulated: true,
        orderId: mockOrderId,
        amount: amountInPaise,
        currency,
        order: {
          id: mockOrderId,
          amount: amountInPaise,
          currency,
          receipt: receiptId,
          status: 'created'
        }
      });
    }
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
};

// 3. Verify Payment & Confirm Order
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shipping_name,
      shipping_address,
      shipping_city,
      shipping_postal,
      payment_method = 'Razorpay (UPI / Cards)',
      items = [],
      subtotal = 0,
      tax_amount = 0,
      delivery_fee = 0,
      discount_amount = 0,
      total_amount
    } = req.body;

    const userId = req.user?.user_id || req.user?.userId;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required Razorpay payment credentials'
      });
    }

    // Signature Verification
    if (isLiveRazorpay) {
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: 'Razorpay HMAC signature verification failed. Payment tampered or unverified.'
        });
      }
    } else {
      // Sandbox verify check
      if (!razorpay_signature || razorpay_signature.length < 5) {
        return res.status(400).json({
          success: false,
          message: 'Invalid signature provided in test mode'
        });
      }
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order to checkout' });
    }

    // Atomic transaction: Verify stock, create order, deduct stock, clear cart
    const finalTotal = Number(total_amount) || (Number(subtotal) + Number(tax_amount) + Number(delivery_fee) - Number(discount_amount));

    let createdOrderId = null;

    const executePaymentTx = db.transaction(() => {
      // 1. Stock check and deduction
      for (const item of items) {
        const prod = db.prepare('SELECT product_id, stock, name FROM products WHERE product_id = ?').get(item.product_id);
        if (!prod) {
          throw new Error(`Product #${item.product_id} not found in catalog.`);
        }
        if (prod.stock < item.quantity) {
          throw new Error(`Insufficient stock for "${prod.name}". Available: ${prod.stock}, Requested: ${item.quantity}`);
        }

        db.prepare('UPDATE products SET stock = stock - ? WHERE product_id = ?').run(item.quantity, item.product_id);
      }

      // 2. Insert order
      const insertOrder = db.prepare(`
        INSERT INTO orders (
          user_id, total_amount, status, shipping_name, shipping_address, shipping_city, shipping_postal,
          payment_method, razorpay_order_id, razorpay_payment_id, razorpay_signature,
          payment_status, subtotal, tax_amount, delivery_fee, discount_amount
        )
        VALUES (?, ?, 'confirmed', ?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?, ?)
      `);

      const result = insertOrder.run(
        userId,
        finalTotal,
        shipping_name || 'Customer',
        shipping_address || 'Shipping Address',
        shipping_city || 'City',
        shipping_postal || '560001',
        payment_method,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        Number(subtotal) || 0,
        Number(tax_amount) || 0,
        Number(delivery_fee) || 0,
        Number(discount_amount) || 0
      );

      createdOrderId = result.lastInsertRowid;

      // 3. Insert order items
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `);

      for (const item of items) {
        insertItem.run(createdOrderId, item.product_id, item.quantity, item.price);
      }

      // 4. Clear user's active cart
      db.prepare('DELETE FROM cart WHERE user_id = ?').run(userId);
    });

    executePaymentTx();

    res.status(201).json({
      success: true,
      order_id: createdOrderId,
      order: {
        order_id: createdOrderId,
        status: 'confirmed',
        payment_status: 'paid',
        total_amount: finalTotal,
        razorpay_payment_id
      },
      payment_id: razorpay_payment_id,
      status: 'confirmed',
      payment_status: 'paid',
      total_amount: finalTotal,
      message: 'Payment verified and order confirmed successfully with BUYNEST!'
    });
  } catch (error) {
    console.error('Error during payment verification:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

// 4. Webhook Handler for Async Razorpay Notifications
exports.handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = webhookSecret || keySecret;

    if (secret && signature) {
      const shasum = crypto.createHmac('sha256', secret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        return res.status(400).json({ status: 'invalid_signature' });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured' && payload?.payment?.entity) {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;
      if (orderId) {
        db.prepare('UPDATE orders SET payment_status = ?, status = ? WHERE razorpay_order_id = ?')
          .run('paid', 'confirmed', orderId);
      }
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

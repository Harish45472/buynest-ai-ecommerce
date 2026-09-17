# 🛍️ BUYNEST — AI-Powered Smart Lifestyle Marketplace

A modern, full-stack Indian e-commerce web platform featuring dynamic product catalogue browsing, category filtering, real-time stock validation, cart & checkout workflow, order fulfillment status tracking, admin management dashboard, Razorpay & UPI payment simulation, and an embedded **AI Shopping Assistant** that recommends matching items from the 1,280+ store catalogue.

---

## ✨ Features

- 🔐 **Authentication & Roles**:
  - JWT-based authentication with bcrypt password hashing.
  - Role-based access control (`user` and `admin`).
  - 1-Click Demo Login buttons for fast testing.
- 📦 **1,280+ Curated Products & Real Photography**:
  - 10 Core Departments (`Men`, `Women`, `Electronics`, `Home & Kitchen`, `Beauty & Personal Care`, `Grocery`, `Sports & Fitness`, `Books`, `Toys & Baby`, `Automotive`).
  - 100% Real studio product photography with dynamic color-accurate variant switching (0 vector/SVG graphics).
  - Prioritized apparel display on login and natural browsing.
- 🔍 **Natural Language Search & Smart Filtering**:
  - Natural query parsing: e.g., "shoes under 3000", "levis jeans", "black shirt".
  - Multi-attribute facet filters (Brand, Category, Subcategory, Price Range, Min Rating, In-Stock, Color, Size).
- 🛒 **Cart & Real-Time Stock Validation**:
  - Slide-out cart drawer with free-shipping progress tracker (₹999 threshold).
  - Quantity controls strictly bounded by available inventory stock.
- 💳 **Checkout, Razorpay & Real UPI Simulation**:
  - Full Razorpay checkout modal simulation with UPI ID validation and QR code workflows.
  - Atomic SQLite transactions ensure stock is reserved and deducted safely with zero overselling.
  - 1-click customer order cancellations with automatic inventory reversal before shipment.
- 🚚 **Order History & Live Status Tracking**:
  - Visual 5-step progress stepper: `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
  - Itemized shipment receipts and 1-click re-order shortcuts.
- 🤖 **AI Shopping Assistant ("BUYNEST AI")**:
  - Natural language intent parsing, budget constraints (e.g. "laptop under 60000"), and smart semantic recommendations.
  - Interactive embedded recommendation cards right inside the chat with one-click **"Add to Cart"** and **"Quick View"**.
  - Contextual product comparisons and wedding/festive outfit suggestions.

---

## 🚀 Quick Start Guide (Run from GitHub)

### 1. Clone the Repository
```bash
git clone https://github.com/Harish45472/ai-ecommerce-website.git
cd ai-ecommerce-website
```

### 2. Install Dependencies
```bash
npm install
```
*(The automatic `postinstall` script automatically installs both `server` and `client` dependencies).*

### 3. Run the Application

#### Option A: Unified Fullstack Mode (Single Port 5000 — Recommended)
```bash
npm start
```
> **Note:** The server **automatically seeds the SQLite database** on first boot with 1,280+ products and demo accounts! If the frontend bundle isn't built yet, the server will auto-build it.
> Open **[http://localhost:5000](http://localhost:5000)** in your browser!

#### Option B: Concurrent Development Mode (Vite Hot Reload + Express API)
```bash
npm run dev
```
- Frontend: **[http://localhost:5173](http://localhost:5173)**
- Backend API: **[http://localhost:5000](http://localhost:5000)**

---

## 🧪 Verification & Audit Tools

```bash
# Run 20-point enterprise test suite (Auth, Catalog, Cart, Razorpay, Stock, AI)
npm test

# Run product photography audit (0 SVGs, 100% verified photography)
npm run audit:images
```

---

## 🧪 Automated Verification Suite

To run the automated test suite testing health check, auth, catalogue filtering, cart stock bounds, atomic checkout, admin controls, and AI recommendations:

```bash
node server/test-suite.js
```

---

## 📡 API Reference

### Auth
- `POST /api/auth/register` — Register a new customer
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/me` — Get profile of currently signed-in user

### Products & Categories
- `GET /api/products` — List products with filters (`q`, `category`, `minPrice`, `maxPrice`, `inStock`, `sortBy`)
- `GET /api/products/:id` — Get product details and related items
- `POST /api/products` *(Admin)* — Create new product
- `PUT /api/products/:id` *(Admin)* — Update existing product
- `DELETE /api/products/:id` *(Admin)* — Delete product
- `GET /api/categories` — Get all department categories
- `POST /api/categories` *(Admin)* — Create department category
- `DELETE /api/categories/:id` *(Admin)* — Remove department category

### Cart
- `GET /api/cart` — View user's cart items and available stock
- `POST /api/cart` — Add product to cart with stock validation
- `PUT /api/cart/:id` — Update cart item quantity
- `DELETE /api/cart/:id` — Remove item from cart
- `DELETE /api/cart` — Clear all items in cart

### Orders
- `POST /api/orders` — Place order (atomic stock deduction transaction)
- `GET /api/orders` — View user's past orders and tracking stepper
- `GET /api/orders/:id` — Get single order details
- `GET /api/admin/orders` *(Admin)* — List all customer orders
- `PATCH /api/admin/orders/:id/status` *(Admin)* — Update order status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`)
- `GET /api/admin/stats` *(Admin)* — Dashboard analytics (revenue, order counts, low stock warnings)

### AI Shopping Assistant
- `POST /api/ai/chat` — Chat with Aura AI assistant (supports OpenAI, Gemini, or built-in engine)
- `GET /api/ai/recommend-similar/:productId` — Get AI-powered complementary item recommendations

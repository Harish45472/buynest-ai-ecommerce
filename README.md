# 🛍️ AuraMart — AI-Powered E-Commerce & Shopping Assistant

A modern, full-stack e-commerce web platform featuring dynamic product catalogue browsing, category filtering, real-time stock validation, cart & checkout workflow, order fulfillment status tracking, an admin management dashboard, and an embedded **AI Shopping Assistant** that recommends matching items from the store catalogue.

---

## ✨ Features

- 🔐 **Authentication & Roles**:
  - JWT-based authentication with bcrypt password hashing.
  - Role-based access control (`user` and `admin`).
  - 1-Click Demo Login buttons for fast testing.
- 📦 **Product Catalogue & Search**:
  - Department filtering (`Electronics`, `Fashion`, `Home & Living`, `Sports & Fitness`, `Accessories`).
  - Keyword search across product names and descriptions.
  - Budget range filters and sorting (Price Low-High, High-Low, Highest Rated, Newest, Featured).
  - Real-time stock status pills (`In Stock`, `Only X Left!`, `Out of Stock`).
- 🛒 **Cart & Real-Time Stock Validation**:
  - Slide-out cart drawer with free-shipping progress tracker ($50 threshold).
  - Quantity controls strictly bounded by available inventory stock.
  - Dynamic subtotals and real-time stock warning indicators.
- 💳 **Checkout & Atomic Order Fulfillment**:
  - Multi-step checkout with recipient shipping details and payment simulation.
  - Atomic database transactions ensure stock is reserved and deducted safely with zero overselling.
- 🚚 **Order History & Live Status Tracking**:
  - Visual 4-step progress stepper: `Order Placed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`.
  - Itemized shipment receipts and 1-click re-order shortcuts.
- 🛡️ **Admin Management Console**:
  - Real-time KPI metrics: Net Revenue, Orders count, Catalog size, Low-stock alerts.
  - Product CRUD: Create, Edit, Delete products with image URLs and inventory stock.
  - Category CRUD: Add and manage departments.
  - Live Order Status Updater: transition orders across statuses (`pending` ➔ `processing` ➔ `shipped` ➔ `delivered` / `cancelled`).
- 🤖 **AI Shopping Assistant ("Aura")**:
  - Dual-mode architecture:
    1. **Zero-Config Smart Catalogue Engine**: Works instantly out of the box with natural language intent parsing, budget constraints (e.g. "under $100"), and keyword matching.
    2. **External LLM Mode**: Supports custom OpenAI (`OPENAI_API_KEY`) or Google Gemini (`GEMINI_API_KEY`) configured via `.env` or the in-app settings drawer.
  - Interactive embedded recommendation cards right inside the chat with one-click **"Add to Cart"** and **"Quick View"**.
  - Suggested prompt chips for fast discovery.
  - Contextual complementary item recommendations on product detail pages.

---

## 🗄️ Database Schema (SQLite)

- **`users`**: `user_id`, `name`, `email`, `password_hash`, `role`, `created_at`
- **`categories`**: `category_id`, `name`, `description`, `slug`
- **`products`**: `product_id`, `name`, `category`, `description`, `price`, `stock`, `image_url`, `rating`, `reviews_count`, `featured`, `created_at`
- **`cart`**: `cart_id`, `user_id`, `product_id`, `quantity`, `updated_at`
- **`orders`**: `order_id`, `user_id`, `total_amount`, `status`, `shipping_name`, `shipping_address`, `shipping_city`, `shipping_postal`, `payment_method`, `created_at`
- **`order_items`**: `item_id`, `order_id`, `product_id`, `quantity`, `price`

---

## 🔑 Demo Accounts

The database comes pre-seeded with sample data and test accounts:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Store Admin** | `admin@ecommerce.com` | `admin123` | Full access to Admin Console, Product CRUD, Order Status Manager |
| **Customer** | `user@ecommerce.com` | `user123` | Catalogue browsing, Cart, Checkout, Order History & Tracking |

*(Both accounts can be logged into with a single click using the demo buttons inside the Sign In modal).*

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Seed Database
```bash
cd ../server
npm run seed
```

### 3. Run the Application
You can run the application in two ways:

#### Option A: Single Port Production Mode (Recommended)
```bash
# Build frontend
cd client
npm run build

# Start server (serves both API & Frontend on http://localhost:5000)
cd ../server
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

#### Option B: Vite Dev Server Mode (Hot Reload)
```bash
# Terminal 1: Backend API
cd server
npm start

# Terminal 2: Frontend Vite Dev Server
cd client
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!

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

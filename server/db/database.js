const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const dbPath = path.join(__dirname, 'ecommerce.sqlite');
let rawDb = null;
let SQL = null;
let inTransaction = false;

async function initDatabase() {
  if (rawDb) return rawDb;

  SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    try {
      const fileBuffer = fs.readFileSync(dbPath);
      rawDb = new SQL.Database(fileBuffer);
    } catch (e) {
      console.warn('Failed to load existing db file, creating a fresh database:', e.message);
      rawDb = new SQL.Database();
    }
  } else {
    rawDb = new SQL.Database();
  }

  // Create tables if not already present
  rawDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      slug TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT DEFAULT 'BUYNEST Select',
      category TEXT NOT NULL,
      sub_category TEXT DEFAULT 'General',
      description TEXT NOT NULL,
      price REAL NOT NULL,
      mrp REAL DEFAULT 0,
      discount_percent INTEGER DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 0,
      image_url TEXT,
      images TEXT,
      sizes TEXT,
      colors TEXT,
      rating REAL DEFAULT 4.5,
      reviews_count INTEGER DEFAULT 0,
      seller_name TEXT DEFAULT 'BUYNEST Retail',
      specifications TEXT,
      tags TEXT,
      gender TEXT DEFAULT 'Unisex',
      featured INTEGER DEFAULT 0,
      is_popular INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS wishlist (
      wishlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    );

    CREATE TABLE IF NOT EXISTS cart (
      cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      order_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      shipping_name TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      shipping_city TEXT NOT NULL,
      shipping_postal TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
      item_id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `);

  const columnsToAdd = [
    "ALTER TABLE products ADD COLUMN sub_category TEXT DEFAULT 'General';",
    "ALTER TABLE products ADD COLUMN brand TEXT DEFAULT 'BUYNEST Select';",
    "ALTER TABLE products ADD COLUMN mrp REAL DEFAULT 0;",
    "ALTER TABLE products ADD COLUMN discount_percent INTEGER DEFAULT 0;",
    "ALTER TABLE products ADD COLUMN images TEXT;",
    "ALTER TABLE products ADD COLUMN sizes TEXT;",
    "ALTER TABLE products ADD COLUMN colors TEXT;",
    "ALTER TABLE products ADD COLUMN seller_name TEXT DEFAULT 'BUYNEST Retail';",
    "ALTER TABLE products ADD COLUMN specifications TEXT;",
    "ALTER TABLE products ADD COLUMN tags TEXT;",
    "ALTER TABLE products ADD COLUMN gender TEXT DEFAULT 'Unisex';",
    "ALTER TABLE products ADD COLUMN is_popular INTEGER DEFAULT 0;"
  ];

  for (const colSql of columnsToAdd) {
    try {
      rawDb.run(colSql);
    } catch (e) {
      // Column already exists
    }
  }

  saveToDisk();
  return rawDb;
}

function saveToDisk() {
  if (!rawDb) return;
  try {
    const data = rawDb.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  } catch (err) {
    console.error('Error saving SQLite database to disk:', err);
  }
}

// Wrapper interface matching better-sqlite3 API
const dbWrapper = {
  init: initDatabase,

  exec: (sql) => {
    if (!rawDb) throw new Error('Database not initialized yet.');
    rawDb.run(sql);
    saveToDisk();
  },

  pragma: (sql) => {
    if (!rawDb) return;
    try {
      rawDb.run(`PRAGMA ${sql};`);
    } catch (e) {
      // Ignored for wasm sqlite
    }
  },

  prepare: (sql) => {
    if (!rawDb) throw new Error('Database not initialized yet.');

    return {
      all: (...args) => {
        const flatArgs = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        const stmt = rawDb.prepare(sql);
        if (flatArgs.length > 0) stmt.bind(flatArgs);
        const rows = [];
        while (stmt.step()) {
          rows.push(stmt.getAsObject());
        }
        stmt.free();
        return rows;
      },

      get: (...args) => {
        const flatArgs = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        const stmt = rawDb.prepare(sql);
        if (flatArgs.length > 0) stmt.bind(flatArgs);
        let row = undefined;
        if (stmt.step()) {
          row = stmt.getAsObject();
        }
        stmt.free();
        return row;
      },

      run: (...args) => {
        const flatArgs = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        rawDb.run(sql, flatArgs);
        const idRes = rawDb.exec('SELECT last_insert_rowid() as id');
        const changesRes = rawDb.exec('SELECT changes() as count');
        const lastInsertRowid = idRes[0]?.values[0][0] || 0;
        const changes = changesRes[0]?.values[0][0] || 0;
        if (!inTransaction) {
          saveToDisk();
        }
        return { lastInsertRowid, changes };
      }
    };
  },

  transaction: (fn) => {
    return (...args) => {
      if (!rawDb) throw new Error('Database not initialized.');
      inTransaction = true;
      rawDb.run('BEGIN TRANSACTION;');
      try {
        const result = fn(...args);
        rawDb.run('COMMIT;');
        inTransaction = false;
        saveToDisk();
        return result;
      } catch (err) {
        try {
          rawDb.run('ROLLBACK;');
        } catch (rbErr) {
          // Transaction may have already been rolled back
        }
        inTransaction = false;
        throw err;
      }
    };
  }
};

module.exports = dbWrapper;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = db.prepare('SELECT user_id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'user')
    `).run(name.trim(), normalizedEmail, password_hash);

    const user = {
      user_id: result.lastInsertRowid,
      name: name.trim(),
      email: normalizedEmail,
      role: 'user'
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful',
      user,
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userRow = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

    if (!userRow) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, userRow.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = {
      user_id: userRow.user_id,
      name: userRow.name,
      email: userRow.email,
      role: userRow.role
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      user,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
};

exports.getMe = (req, res) => {
  try {
    const userRow = db.prepare('SELECT user_id, name, email, role, created_at FROM users WHERE user_id = ?').get(req.user.user_id);
    if (!userRow) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user: userRow });
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

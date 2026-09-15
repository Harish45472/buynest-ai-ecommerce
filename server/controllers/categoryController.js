const db = require('../db/database');

exports.getCategories = (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY name ASC').all();
    res.json({ categories });
  } catch (err) {
    console.error('getCategories error:', err);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
};

exports.createCategory = (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required.' });
    }

    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = db.prepare('SELECT * FROM categories WHERE slug = ? OR LOWER(name) = LOWER(?)').get(slug, name.trim());
    if (existing) {
      return res.status(409).json({ error: 'Category already exists.' });
    }

    const result = db.prepare(`
      INSERT INTO categories (name, description, slug)
      VALUES (?, ?, ?)
    `).run(name.trim(), description ? description.trim() : '', slug);

    const newCategory = db.prepare('SELECT * FROM categories WHERE category_id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    console.error('createCategory error:', err);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};

exports.deleteCategory = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM categories WHERE category_id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    db.prepare('DELETE FROM categories WHERE category_id = ?').run(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('deleteCategory error:', err);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
};

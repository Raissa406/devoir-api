const db = require('../config/db');

const ArticleModel = {
  create: (article) => {
    return new Promise((resolve, reject) => {
      const { title, content, author, category, tags } = article;
      const tagsJson = JSON.stringify(tags || []);
      db.run(
        `INSERT INTO articles (title, content, author, category, tags) 
         VALUES (?, ?, ?, ?, ?)`,
        [title, content, author, category, tagsJson],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  getAll: (filters = {}) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM articles';
      const params = [];
      const conditions = [];

      if (filters.category) { conditions.push('category = ?'); params.push(filters.category); }
      if (filters.author) { conditions.push('author = ?'); params.push(filters.author); }
      if (filters.date) { conditions.push('date LIKE ?'); params.push(filters.date + '%'); }

      if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY date DESC';

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else {
          const result = rows.map(row => ({
            ...row,
            tags: JSON.parse(row.tags || '[]')
          }));
          resolve(result);
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else if (!row) resolve(null);
        else resolve({ ...row, tags: JSON.parse(row.tags || '[]') });
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { title, content, category, tags } = data;
      const tagsJson = JSON.stringify(tags || []);
      db.run(
        `UPDATE articles 
         SET title = ?, content = ?, category = ?, tags = ? 
         WHERE id = ?`,
        [title, content, category, tagsJson, id],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes > 0);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM articles WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  },

  search: (query) => {
    return new Promise((resolve, reject) => {
      const term = `%${query}%`;
      db.all(
        `SELECT * FROM articles 
         WHERE title LIKE ? OR content LIKE ? 
         ORDER BY date DESC`,
        [term, term],
        (err, rows) => {
          if (err) reject(err);
          else {
            const result = rows.map(row => ({
              ...row,
              tags: JSON.parse(row.tags || '[]')
            }));
            resolve(result);
          }
        }
      );
    });
  }
};

module.exports = ArticleModel;
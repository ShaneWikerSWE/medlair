const db = require('../util/database');

module.exports = class Article {
  constructor(title, content, description, coverUrl, category, editor) {
    this.title = title;
    this.content = content;
    this.description = description;
    this.coverUrl = coverUrl;
    this.category = category;
    this.editor = editor;
  }

  save() {
    return db.execute(
      'INSERT INTO articles(title, content, description, coverUrl, category, editor) VALUES(?, ?, ?, ?, ?, ?)',
      [
        this.title,
        this.content,
        this.description,
        this.coverUrl,
        this.category,
        this.editor,
      ]
    );
  }

  static find() {
    return db.execute('SELECT * FROM articles ORDER BY createdAt DESC');
  }

  static findTrending() {
    return db.execute(
      'SELECT id, title FROM articles ORDER BY visitorsNo DESC LIMIT 4'
    );
  }

  static findById(id) {
    return db.execute('SELECT * FROM articles WHERE id = ?', [id]);
  }
  static findByCategory(category) {
    return db.execute(
      'SELECT * FROM articles WHERE category = ? ORDER BY createdAt DESC',
      [category]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM articles WHERE id = ?', [id]);
  }

  static updateById(id, title, content, description, coverUrl, category) {
    return db.execute(
      'UPDATE articles SET title = ?, content = ?, description = ?, coverUrl = ?, category = ? WHERE id = ?',
      [title, content, description, coverUrl, category, id]
    );
  }
  static updateVisitorNo(id, counter) {
    return db.execute('UPDATE articles SET visitorsNo = ? WHERE id = ?', [
      counter,
      id,
    ]);
  }
};

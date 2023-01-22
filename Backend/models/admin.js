const db = require('../util/database');

module.exports = class Admin {
  static findByName(name) {
    return db.execute('SELECT * FROM articles WHERE name = ?', [name]);
  }
};

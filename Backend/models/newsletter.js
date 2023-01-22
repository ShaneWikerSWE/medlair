const db = require('../util/database');

module.exports = class Newsletter {
  constructor(email) {
    this.email = email;
  }
  save() {
    return db.execute('INSERT INTO newsletter(email) VALUES(?)', [this.email]);
  }
  static find() {
    return db.execute('SELECT * FROM newsletter');
  }
  static findByEmail(email) {
    return db.execute('SELECT * FROM newsletter where email = ?', [email]);
  }
};

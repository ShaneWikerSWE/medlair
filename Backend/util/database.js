const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'test99',
  database: 'medlair',
});

module.exports = pool.promise();

const fs = require('fs');
const path = require('path');

module.exports = (filePath) => {
  filePath = path.join(process.cwd(), filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

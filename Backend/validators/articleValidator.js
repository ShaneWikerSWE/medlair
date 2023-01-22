const { body } = require('express-validator');

exports.addArticle = [
  body('title').not().isEmpty(),
  body('content').not().isEmpty(),
  body('description').not().isEmpty(),
  body('category').not().isEmpty(),
];

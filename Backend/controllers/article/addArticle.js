const Article = require('../../models/article');
const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const { title, content, description, category, editor } = req.body;

  try {
    // Check if validation has any errors.
    if (!validationErrors.isEmpty()) {
      const error = new Error('Validation Failed.');
      error.statusCode = 422;
      error.data = validationErrors.array();
      throw error;
    }

    // Check if image not provided.
    if (!req.file) {
      const error = new Error('No image provided.');
      error.statusCode = 422;
      throw error;
    }
    const coverUrl = req.file.path.replace('\\', '/');

    // Create and save new article.
    const article = await new Article(
      title,
      content,
      description,
      coverUrl,
      category,
      editor
    ).save();

    // Send response
    res.status(201).json({
      msg: 'Article created.',
      id: article[0].insertId,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

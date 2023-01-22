const clearImage = require('../../helpers/clearImage');
const Article = require('../../models/article');

module.exports = async (req, res, next) => {
  const id = req.query.id;

  try {
    const article = await Article.findById(id);

    // Check if artilce exist
    if (article[0].length === 0) {
      const error = new Error('Article Not Found.');
      error.statusCode = 404;
      throw error;
    }

    // Delete article cover
    clearImage(article[0][0].coverUrl);
    // Delete artilce
    await Article.deleteById(id);

    // Send Response
    res.status(200).json({
      msg: `Article #${id} deleted.`,
    });
  } catch (err) {
    next(err);
  }
};

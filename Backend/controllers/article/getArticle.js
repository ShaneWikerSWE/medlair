const Article = require('../../models/article');

module.exports = async (req, res, next) => {
  const { id } = req.query;
  try {
    const article = await Article.findById(id);

    // check if the article exists.
    if (article[0].length === 0) {
      const error = new Error('Could not found article.');
      error.statusCode = 404;
      throw error;
    }
    const newVisitorsNo = article[0][0].visitorsNo + 1;
    await Article.updateVisitorNo(id, newVisitorsNo);

    res.status(200).json({
      msg: 'Article fetched.',
      article: article[0][0],
    });
  } catch (err) {
    next(err);
  }
};

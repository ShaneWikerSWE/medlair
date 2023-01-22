const Article = require('../../models/article');

module.exports = async (req, res, next) => {
  const category = req.query.category.trim();
  try {
    let articles = await Article.find();
    if (category !== 'all') {
      articles = await Article.findByCategory(category);
    }
    const trendingArticles = await Article.findTrending();
    res.status(200).json({
      msg: 'Articles Fetched.',
      articles: articles[0],
      trending: trendingArticles[0],
    });
  } catch (err) {
    next(err);
  }
};

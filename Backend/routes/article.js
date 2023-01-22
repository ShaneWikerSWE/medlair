// Requires
const express = require('express');
const router = express.Router();
// Controllers
const articleController = require('../controllers/article');
// Validators
const articleValidator = require('../validators/articleValidator');

router.get('/', articleController.allArticles);

router.post('/add', articleValidator.addArticle, articleController.addArticle);

router.get('/get', articleController.getArticle);

router.delete('/delete', articleController.deleteArticle);

module.exports = router;

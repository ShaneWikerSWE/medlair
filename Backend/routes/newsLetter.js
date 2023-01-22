// Requires
const express = require('express');
const router = express.Router();
// Controllers
const newsLetterController = require('../controllers/newsletter');

router.post('/addemail', newsLetterController.addEmail);

router.post('/sendemail', newsLetterController.sendEmail);

module.exports = router;

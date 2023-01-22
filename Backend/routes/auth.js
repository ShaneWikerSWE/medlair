// Requires
const express = require('express');
const router = express.Router();
// Controllers
const authController = require('../controllers/auth');

router.post('/admin/signin', authController.adminSignin);

module.exports = router;

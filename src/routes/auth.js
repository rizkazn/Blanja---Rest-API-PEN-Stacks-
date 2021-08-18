const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');

// all routes in here are starting with /auth
router.post('/', controllers.login);

module.exports = router;
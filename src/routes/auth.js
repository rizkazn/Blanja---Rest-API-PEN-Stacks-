const express = require('express');
const router = express.Router();
const controllerC = require('../controllers/authCustomer');
const controllerS = require('../controllers/authSeller')

// all routes in here are starting with /auth
router.post('/customer', controllerC.login);
router.post('/seller', controllerS.login);

module.exports = router;
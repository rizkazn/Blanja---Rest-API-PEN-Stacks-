const express = require('express');
const router = express.Router();
const controllers = require('../controllers/sellers');
const validate = require("../middleware/validate");

// all routes in here are starting with /sellers
router.get('/', validate("seller"), controllers.getAllSellers);
router.get('/:email', validate("seller"), controllers.getSellerByEmail);

router.post('/add', controllers.addDataSeller);

router.put('/update', validate("seller"), controllers.updateDataSeller);

router.delete('/id', validate("seller"), controllers.removeDataSeller);


module.exports = router
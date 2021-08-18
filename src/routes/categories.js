const express = require("express")
const router = express.Router()
const controllers = require('../controllers/categories');

// all routes in here are starting with /categories
router.get('/', controllers.getAllCategories);
router.post('/', controllers.addDataCategory);
router.put('/', controllers.updateDataCategory);
router.delete('/', controllers.removeDataCategory);

module.exports = router;
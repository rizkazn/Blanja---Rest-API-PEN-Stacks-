const express = require("express")
const router = express.Router()
const validate = require("../middleware/validate")
const controllers = require('../controllers/categories');

// all routes in here are starting with /categories
router.get('/', controllers.getAllCategories);
router.get('/:id', controllers.getCategoryById);
router.get('/sort/category', controllers.orderCategoryByName);

router.post('/add', validate("seller"), controllers.addDataCategory);

router.put('/update', validate("seller"), controllers.updateDataCategory);

router.delete('/remove/:id', validate("seller"), controllers.removeDataCategory);

module.exports = router;
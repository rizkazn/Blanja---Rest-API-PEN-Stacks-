const express = require('express')
const router = express.Router()
const controllers = require('../controllers/products')
const validate = require("../middleware/validate")
const uploads = require("../middleware/upload")
const cache = require('../middleware/cache')

// all routes in here are starting with /products
router.get('/', validate("admin"), cache, controllers.getAllProducts);
router.get('/:product_id', controllers.getProductsById);
router.post('/', validate("admin"), uploads.single("product_image"), controllers.addDataProduct);
router.put('/', validate("admin"), controllers.updateDataProduct);
router.delete('/:product_id', validate("admin"), controllers.removeDataProduct);

module.exports = router;
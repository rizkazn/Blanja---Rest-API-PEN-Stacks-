const express = require('express')
const router = express.Router()
const controllers = require('../controllers/products')
const validate = require("../middleware/validate")
const uploads = require("../middleware/upload")
const cache = require('../middleware/cache')

// all routes in here are starting with /products
router.get('/', cache, controllers.getAllProducts);
router.get('/:id', controllers.getProductsById);
router.get('/search/name', controllers.searchProductByName);
router.get('/sort/name', controllers.orderProductByName);
router.get('/sort/cat', controllers.orderProductByCat);
router.get('/sort/date', controllers.orderProductByNewest);
router.get('/sort/price', controllers.orderProductByPrice);

router.post('/add', validate("seller"), uploads.single("product_image"), controllers.addDataProduct);

router.put('/update', validate("seller"), uploads.single("product_image"), controllers.updateDataProduct);

router.delete('/remove/:id', validate("seller"), controllers.removeDataProduct)


// router.get('/all', validate("admin"), cache, controllers.getAllProducts);
// router.get('/:product_id', controllers.getProductsById);
// router.post('/', validate("admin"), uploads.single("product_image"), controllers.addDataProduct);
// router.put('/', validate("admin"), controllers.updateDataProduct);
// router.delete('/:product_id', validate("admin"), controllers.removeDataProduct);

module.exports = router;
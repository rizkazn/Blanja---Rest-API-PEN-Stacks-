const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bags');
const validate = require("../middleware/validate");

// all routes in here are starting with /bags
router.get('/', validate("customer"), controllers.getAllBags);
router.get('/:id', validate("customer"), controllers.getBagsById);

router.post('/add', validate("customer"), controllers.addDataBags);

router.put('/update', validate("customer"), controllers.updateDataBags);

router.delete('/:id', validate("customer"), controllers.removeDataBags);

module.exports = router;
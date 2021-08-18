const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bags');

// all routes in here are starting with /bags
router.get('/', controllers.getAllBags);
router.post('/', controllers.addDataBags);
router.put('/', controllers.updateDataBags);
router.delete('/', controllers.removeDataBags);

module.exports = router;
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const validate = require("../middleware/validate")

// all routes in here are starting with /users
router.get('/', validate("admin"), controllers.getAllUsers);
router.post('/', controllers.addDataUser);


module.exports = router;
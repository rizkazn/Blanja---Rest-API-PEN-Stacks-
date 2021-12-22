const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const validate = require("../middleware/validate")

// all routes in here are starting with /users
router.get('/', validate("customer"), controllers.getAllUsers);
router.get('/:email', validate("customer"), controllers.getUserByEmail);

router.post('/add', controllers.addDataUser);

router.put('/update', validate("customer"), controllers.updateDataUser);

router.delete('/remove/:id', validate("customer"), controllers.removeDataUser);


module.exports = router
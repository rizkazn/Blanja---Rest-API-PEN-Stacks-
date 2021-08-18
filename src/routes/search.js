const express = require("express")
const router = express.Router()
const controllers = require('../controllers/search')

// all routes in here are starting with /search
router.get("/", controllers.searchDataProduct)

module.exports = router
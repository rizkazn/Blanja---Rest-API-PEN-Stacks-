const express = require("express")
const router = express.Router()
const products = require("./routes/products")
const categories = require("./routes/categories")
const bags = require("./routes/bags")
const users = require("./routes/users")
const auth = require("./routes/auth")
const search = require("./routes/search")
const { cloudConfig } = require("./configs/cloudinary")

router.use("*", cloudConfig)
router.use("/products", products)
router.use("/search", search)
router.use("/categories", categories)
router.use("/bags", bags)
router.use("/users", users)
router.use("/auth", auth)

router.use("*", (req, res) => {
    res.status(404).json("Endpoint Wrong!!")
})

module.exports = router
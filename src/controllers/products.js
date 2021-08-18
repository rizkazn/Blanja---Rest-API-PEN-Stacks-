const products = {}
const model = require("../models/products")
const response = require("../helpers/response")
const uploads = require("../helpers/uploadCloud")
const { redisDb } = require('../configs/redis')


products.getAllProducts = async (req, res) => {
    try {
        // console.log('data dari postgres')
        const result = await model.getAllProducts()
        const data = JSON.stringify(result)
        redisDb.setex("products", 60, data)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

products.getProductsById = async (req, res) => {
    try {
        const result = await model.getProductsById(req.params.product_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

products.addDataProduct = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        
        const data = {
            product_name: req.body.product_name,
            category_id : req.body.category_id,
            product_brand : req.body.product_brand,
            product_rating : req.body.product_rating,
            product_price: req.body.product_price,
            product_colour : req.body.product_colour,
            product_size : req.body.product_size,
            product_qty : req.body.product_qty,
            product_image: urlImage || req.file.path,
        }
        const result = await model.addDataProduct(data)
        redisD.del("products")
        return response(res, 201, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

products.updateDataProduct = async (req, res) => {
    try {
        const result = await model.updateDataProduct(req.params.product_id, req.body)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

products.removeDataProduct = async (req, res) => {
    try {
        const result = await model.removeDataProduct(req.params.product_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = products

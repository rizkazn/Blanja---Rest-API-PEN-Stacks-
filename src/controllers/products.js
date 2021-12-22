const products = {}
const model = require("../models/products")
const response = require("../helpers/response")
const uploads = require("../helpers/uploadCloud")
const Logger = require("../helpers/logger")
const { redisDb } = require('../configs/redis')


products.getAllProducts = async (req, res) => {
    try {
        // console.log('data dari postgres')
        const result = await model.getAllProducts()
        const data = JSON.stringify(result)
        redisDb.setex("products", 60, data)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

products.getProductsById = async (req, res) => {
    try {
        const result = await model.getProductsById(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

products.orderProductByName = async (req, res) => {
    try {
        const result = await model.orderProductByName()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

products.orderProductByCat = async (req, res) => {
    try {
        const result = await model.orderProductByCat()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

products.orderProductByNewest = async (req, res) => {
    try {
        const result = await model.orderProductByNewest()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }  
}

products.orderProductByPrice = async (req, res) => {
    try {
        const result = await model.orderProductByPrice()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

products.searchProductByName = async (req, res) => {
    try {
        const result = await model.searchProductsByName(req.query.product_name)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error)
    }
}

products.addDataProduct = async (req, res) => {
    try {
        let urlImage = "https://res.cloudinary.com/dyli6i0pw/image/upload/v1626704462/product/dummy-img_xc5jlb.png"
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const object = await (req.body)
        const data = {
            product_name: object.product_name,
            category_id : object.category_id,
            store : object.store,
            product_brand : object.product_brand,
            product_rating : object.product_rating,
            product_colour : object.product_colour,
            product_size : object.product_size,
            product_qty : object.product_qty,
            product_price: object.product_price,
            condition: object.condition,
            description: object.description,
            product_image: urlImage || req.file.path,
        } 
        const result = await model.addDataProduct(data)
        redisDb.del("products")
        return response(res, 201, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

products.updateDataProduct = async (req, res) => {
    try {
        let urlImage = "https://res.cloudinary.com/dyli6i0pw/image/upload/v1626704462/product/dummy-img_xc5jlb.png"
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const object = await (req.body)
        const data = {
            id: object.id,
            product_name: object.product_name,
            category_id : object.category_id,
            store : object.store,
            product_brand : object.product_brand,
            product_rating : object.product_rating,
            product_colour : object.product_colour,
            product_size : object.product_size,
            product_qty : object.product_qty,
            product_price: object.product_price,
            condition: object.condition,
            description: object.description,
            product_image: urlImage || req.file.path,
        } 
        const result = await model.updateDataProduct(data)
        redisDb.del("products")
        return response(res, 201, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}
products.removeDataProduct = async (req, res) => {
    try {
        const result = await model.removeDataProduct(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

module.exports = products

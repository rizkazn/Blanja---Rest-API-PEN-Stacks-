const categories = {}
const model = require("../models/categories")
const response = require("../helpers/response")
const Logger = require("../helpers/logger")

categories.getAllCategories = async (req, res) => {
    try {
        const result = await model.getAllCategories()
        return response(res, 200, result)
    } catch (error) {
        // Logger.error(error)
        return response(res, 500, error, true)
    }
}

categories.getCategoryById = async (req, res) => {
    try {
        const result = await model.getCategoryById(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        // Logger.error(error)
        return response(res, 500, error, true)
    }
}

categories.orderCategoryByName = async (req, res) => {
    try {
        const result = await model.orderCategoryByName()
        return response(res, 200, result)
    } catch (error) {
        // Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

categories.addDataCategory = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            category_name : object.category_name,
            category_image : object.category_image,
        }
        const result = await model.addDataCategory(data)
        return response(res, 201, result, true)
    } catch (error) {
        // Logger.error(error)
        return response(res, 500, error)
    }
}

categories.updateDataCategory = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            id: object.id,
            category_name : object.category_name,
            category_image : object.category_image,
        }
        const result = await model.updateDataCategory(data)
        return response(res, 201, result)
    } catch (error) {
        // Logger.error(error)
        return response(res, 500, error, true)
    }
}

categories.removeDataCategory = async (req, res) => {
    try {
        const result = await model.removeDataCategory(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        // Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

module.exports = categories
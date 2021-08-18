const categories = {}
const model = require("../models/categories")
const response = require("../helpers/response")

categories.getAllCategories = async (req, res) => {
    try {
        const result = await model.getAllCategories()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

categories.getCategoryById = async (req, res) => {
    try {
        const result = await model.getCategoryById()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

categories.addDataCategory = async (req, res) => {
    try {
        const result = await model.addDataCategory(req.query)
        return response(res, 201, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

categories.updateDataCategory = async (req, res) => {
    try {
        const result = await model.updateDataCategory(req.params.category_id, req.query)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

categories.removeDataCategory = async (req, res) => {
    try {
        const result = await model.removeDataCategory(req.params.category_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = categories
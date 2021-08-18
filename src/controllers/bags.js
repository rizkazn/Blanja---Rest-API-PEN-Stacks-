const bags = {}
const model = require("../models/bags")
const response = require("../helpers/response")

bags.getAllBags = async (req, res) => {
    try {
        const result = await model.getAllBags()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

bags.addDataBags = async (req, res) => {
    try {
        const result = await model.addDataBags(req.body)
        return response(res, 201, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

bags.updateDataBags = async (req, res) => {
    try {
        const result = await model.updateDataBags(req.params.product_id, req.body)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

bags.removeDataBags = async (req, res) => {
    try {
        const result = await model.removeDataBags(req.params.product_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = bags
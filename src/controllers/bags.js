const bags = {}
const model = require("../models/bags")
const response = require("../helpers/response")
const Logger = require("../helpers/logger")

bags.getAllBags = async (req, res) => {
    try {
        const result = await model.getAllBags()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

bags.getBagsById = async (req, res) => {
    try {
        const result = await model.getBagsById(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

bags.addDataBags = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            product_id : object.product_id,
            qty : object.qty,
        }
        const result = await model.addDataBags(data)
        return response(res, 201, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

bags.updateDataBags = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            product_id : object.product_id,
            qty : object.qty,
        }
        const result = await model.updateDataBags(data)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

bags.removeDataBags = async (req, res) => {
    try {
        const result = await model.removeDataBags(req.params.product_id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

module.exports = bags
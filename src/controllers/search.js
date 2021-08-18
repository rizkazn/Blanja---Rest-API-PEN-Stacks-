const search = {}
const model = require("../models/search")
const response = require("../helpers/response")

search.searchDataProduct = async (req, res) => {
    try {
        const result = await model.searchDataProduct(req.query)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 404, error)
    }
}

module.exports = search
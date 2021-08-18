const users = {}
const model = require("../models/users")
const passwordHash = require("../helpers/hash")
const response = require("../helpers/response")

users.getAllUsers = async (req, res) => {
    try {
        const result = await model.getAllUsers()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.getUserByEmail = async (req, res) => {
    try {
        const result = await model.getUserByEmail()
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.addDataUser = async (req, res) => {
    try {
        const passHash = await passwordHash(req.body.password)
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: passHash
        }
        const result = await model.addDataUser(data)
        return response(res, 201, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.updateDataUser = async (req, res) => {
    try {
        const result = await model.updateDataUser(req.params.product_id, req.body)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error, true)
    }
}

users.removeDataUser = async (req, res) => {
    try {
        const result = await model.removeDataUser(req.params.product_id)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error, true)
    }
}

module.exports = users
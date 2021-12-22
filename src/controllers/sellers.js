const sellers = {}
const model = require("../models/sellers")
const passwordHash = require("../helpers/hash")
const response = require("../helpers/response")
const uploads = require("../helpers/uploadCloud")
const Logger = require("../helpers/logger")

sellers.getAllSellers = async (req, res) => {
    try {
        const result = await model.getAllSellers()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

sellers.getSellerByEmail = async (req, res) => {
    try {
        const result = await model.getSellerByEmail(req.params.email)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

sellers.addDataSeller = async (req, res) => {
    try {
        const check = await model.getSellerByEmail(req.body.email)
        const passHash = await passwordHash(req.body.password)
        let defaultImage =
        "https://res.cloudinary.com/rizkazn/image/upload/v1635255268/user_meodkb_nxaift.png"
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const object = await (req.body)
        const data = {
            name: object.name,
            email: object.email,
            password: passHash,
            store: object.store,
            phone_number: object.phone_number,
            store_desc: object.store_desc,
            image: urlImage || defaultImage,
        }
        if (check.length > 0) {
            return response(res, 200, { msg: "email already registered" }, true)
        }
        const result = await model.addDataSeller(data)
        return response(res, 201, result)
    } catch (error) {
        Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

sellers.updateDataSeller = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            id: object.id,
            name: object.name,
            email: object.email,
            password: passHash,
            store: object.store,
            phone_number: object.phone_number,
            store_desc: object.store_desc,
            image: urlImage || defaultImage,
        }
        const result = await model.updateDataSeller(data)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

sellers.removeDataSeller = async (req, res) => {
    try {
        const result = await model.removeDataSeller(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

module.exports = sellers
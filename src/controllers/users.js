const users = {}
const model = require("../models/users")
// const model2 = require("../models/user_adress")
const passwordHash = require("../helpers/hash")
const response = require("../helpers/response")
const uploads = require("../helpers/uploadCloud")
const Logger = require("../helpers/logger")

users.getAllUsers = async (req, res) => {
    try {
        const result = await model.getAllUsers()
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

users.getUserByEmail = async (req, res) => {
    try {
        const result = await model.getUserByEmail(req.params.email)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

users.addDataUser = async (req, res) => {
    try {
        const check = await model.getUserByEmail(req.body.email)
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
            phone_number: object.phone_number,
            gender: object.gender,
            dob: object.dob,
            image: urlImage || defaultImage,
        }
        if (check.length > 0) {
            return response(res, 200, { msg: "email already registered" }, true)
        }
        const result = await model.addDataUser(data)
        return response(res, 201, result)
    } catch (error) {
        Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

users.updateDataUser = async (req, res) => {
    try {
        const check = await model.getUserByEmail(req.body.email)
        const passHash = await passwordHash(req.body.password)
        let defaultImage =
        "https://res.cloudinary.com/rizkazn/image/upload/v1635255268/user_meodkb_nxaift.png"
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const object = await (req.body)
        const data = {
            id: object.id,
            name: object.name,
            email: object.email,
            password: passHash,
            phone_number: object.phone_number,
            gender: object.gender,
            dob: object.dob,
            image: urlImage || defaultImage,
        }
        if (check.length > 0) {
            return response(res, 200, { msg: "email already registered" }, true)
        }
        const result = await model.updateDataUser(data)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        console.log(error)
        return response(res, 500, error, true)
    }
}

users.removeDataUser = async (req, res) => {
    try {
        const result = await model.removeDataUser(req.params.id)
        return response(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return response(res, 500, error, true)
    }
}

module.exports = users
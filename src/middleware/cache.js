const respon = require("../helpers/response")
const { redisDb } = require("../configs/redis")

const getAll = (req, res, next) => {
    redisDb.get("products", (err, data) => {
        if (err) {
            return respon(res, 500, err, true)
        }

        if (data !== null) {
            // console.log("data dari redis")
            const result = JSON.parse(data)
            return respon(res, 200, result)
        } else {
            next()
        }
    })
}

module.exports = getAll
const response = require("../helpers/response")
const jwt = require("jsonwebtoken")

const checkToken = (role) => {
    return (req, res, next) => {
        const { tokenauth } = req.headers

        if (!tokenauth) {
            return response(res, 401, { msg: "Please Login First" })
        }

        jwt.verify(tokenauth, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                return response(res, 401, err)
            }

            if (decode.role === role) {
                next()     
            } else {
                return response(res, 401, { msg: "Access not Allowed" })
            }
        })
    }
}

module.exports = checkToken
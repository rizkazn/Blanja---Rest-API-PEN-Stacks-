const response = require("../helpers/response")
const jwt = require("jsonwebtoken")

const checkToken = (roles) => {
    return (req, res, next) => {
        const { tokenauth } = req.headers
        // let isAccsess = false
        // if (process.env.NODE_ENV === "test") {
        //     next()
        //     return
        // }

        if (!tokenauth) {
            return response(res, 401, { msg: "Please Login First" })
        }

        jwt.verify(tokenauth, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                return response(res, 401, err)
            }

            if (decode.roles === roles) {
                next()     
            } else {
                return response(res, 401, { msg: "Access not Allowed" })
            }
            // role.map((value) => {
            //     if (value == decode.role) {
            //         isAccsess = true
            //     }
            // })

            // if (isAccsess) {
            //     next()
            // } else {
            //     return response(res, 401, { msg: "Access not Allowed" })
            // }
        })
    }
}

module.exports = checkToken
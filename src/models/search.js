const {pool :database} = require("../configs/database")
const search = {}

search.searchDataProduct = (keyword) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public.products WHERE public.products.product_name ILIKE '%${keyword}%'`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = search
    
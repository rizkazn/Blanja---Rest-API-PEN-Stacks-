const {pool : database} = require("../configs/database")
const bags = {}

// Get all data bags
bags.getAllBags = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM public.bags ORDER BY product_name DESC')       
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Add data to bags table
bags.addDataBags = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO public.bags(product_name, product_price, total_price, qty) VALUES($1, $2, $3, $4)`, [data.product_name, data.product_price, data.total_price, data.qty])
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update data from bags table
bags.updateDataBags = (bag_id, data) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE public.bags SET product_name = ${data.product_name}, product_price = ${data.product_price}, total_ptice = ${data.total_price}, qty = ${data.qty} WHERE bag_id = ${bag_id}`)
        .then((res) => {
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

// Remove data from bags table 
bags.removeDataBags = (bag_id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM public.bags WHERE bag_id = ${bag_id}`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = bags
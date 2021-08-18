const {pool : database} = require("../configs/database")
const products = {}

// Get all data products
products.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM public.products INNER JOIN public.categories ON public.products.category_id = public.categories.category_id ORDER BY category_name DESC')
            .then((res) => {
                    resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get product by Id
products.getProductsById = (data, product_id) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM products WHERE product_id = ${product_id}`)
            .then((res) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get all data by category
products.getProductsByCategory = (data, category_id) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM products WHERE category_id = ${category_id}`)
            .then((res) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Add data to products table
products.addDataProduct = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO public.products
        (product_name, product_brand, product_rating, product_price, product_colour, product_size, product_qty, product_image, category_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [data.product_name, data.product_brand, product_rating, data.product_price, data.product_colour, data.product_size, data.product_qty, data.product_image, data.category_id])
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update data from products table
products.updateDataProduct = (product_id, data) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE public.products
        SET product_name = ${data.product_name}, product_brand = ${data.product_brand}, product_rating = ${data.product_rating}, product_price = ${data.product_price}, product_colour = ${data.product_colour}, 
        product_size = ${data.product_size}, product_qty = ${data.product_qty}, product_image = ${data.product_image}, category_id = ${data.category_id}
        WHERE product_id = ${product_id}`)
        .then((res) => {
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

// Remove data from products table
products.removeDataProduct = (product_id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM public.products WHERE product_id = ${product_id}`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = products
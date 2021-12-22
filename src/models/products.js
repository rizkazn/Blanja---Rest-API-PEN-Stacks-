const orm  = require("../configs/database")
const { DataTypes, Op } = require("sequelize")
const categories = require('./categories')
const sellers = require('./sellers')

class Products {   
    constructor() {
        this.table = orm.define("products", {
            id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                autoIncrement : true,
                primaryKey : true
            },
            product_name: {
                type : DataTypes.STRING(100),
                allowNull : false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            store: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'sellers',
                    key: 'id',
                },
            },
            product_brand: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            product_rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_colour: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            product_size: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            product_qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            condition: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT
            },
            product_image: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        })
        this.table.belongsTo(categories.table, {
            foreignKey: 'category_id',
            as: 'categories',
            onDelete: 'CASCADE',
        })
        this.table.belongsTo(sellers.table, {
            foreignKey: 'store',
            as: 'sellers',
            onDelete: 'CASCADE',
        })
    }

    getAllProducts() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["updatedAt", "DESC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    getProductsById(id) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["id", "DESC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
                where: {
                    id,
                },
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
    
    orderProductByName() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["product_name", "ASC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    orderProductByCat() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["category_id", "ASC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    orderProductByNewest() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["updatedAt", "DESC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    orderProductByPrice() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["product_price", "ASC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    searchProductsByName(key) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                where: {
                    product_name: {
                        [Op.iLike]: `%${key}%`,
                    }
                },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: categories.table,
                        as: 'categories'
                    },
                    {
                        model: sellers.table,
                        as: 'sellers'
                    },
                ],
            })
            .then((res) => {
                resolve(res)
                console.log(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    addDataProduct(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    updateDataProduct(data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                product_name: data.product_name,
                category_id : data.category_id,
                store : data.store,
                product_brand : data.product_brand,
                product_rating : data.product_rating,
                product_colour : data.product_colour,
                product_size : data.product_size,
                product_qty : data.product_qty,
                product_price: data.product_price,
                condition: data.condition,
                description: data.description,
                product_image: data.product_image,
            }, {
                where: {
                    id : data.id,
                }
            })
            .then((res) => {
                resolve("Update Data Product Success")
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    removeDataProduct(id) {
        return new Promise((resolve,reject) => {
            this.table.destroy({
                where: {
                    id : id,
                }
            })
            .then((res) => {
                resolve("Delete Data Product Success")
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

module.exports = new Products()


// const {pool : database} = require("../configs/database")
// const products = {}

// // Get all data products
// products.getAllProducts = () => {
//     return new Promise((resolve, reject) => {
//         database.query('SELECT * FROM public.products INNER JOIN public.categories ON public.products.category_id = public.categories.category_id ORDER BY category_name DESC')
//             .then((res) => {
//                     resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Get product by Id
// products.getProductsById = (data, product_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`SELECT * FROM products WHERE product_id = ${product_id}`)
//             .then((res) => {
//                 resolve(data)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Get all data by category
// products.getProductsByCategory = (data, category_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`SELECT * FROM products WHERE category_id = ${category_id}`)
//             .then((res) => {
//                 resolve(data)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Add data to products table
// products.addDataProduct = (data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`INSERT INTO public.products
//         (product_name, product_brand, product_rating, product_price, product_colour, product_size, product_qty, product_image, category_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [data.product_name, data.product_brand, product_rating, data.product_price, data.product_colour, data.product_size, data.product_qty, data.product_image, data.category_id])
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Update data from products table
// products.updateDataProduct = (product_id, data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`UPDATE public.products
//         SET product_name = ${data.product_name}, product_brand = ${data.product_brand}, product_rating = ${data.product_rating}, product_price = ${data.product_price}, product_colour = ${data.product_colour}, 
//         product_size = ${data.product_size}, product_qty = ${data.product_qty}, product_image = ${data.product_image}, category_id = ${data.category_id}
//         WHERE product_id = ${product_id}`)
//         .then((res) => {
//             resolve(res)
//         })
//         .catch((err)=>{
//             reject(err)
//         })
//     })
// }

// // Remove data from products table
// products.removeDataProduct = (product_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`DELETE FROM public.products WHERE product_id = ${product_id}`)
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// module.exports = products
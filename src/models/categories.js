const orm = require('../configs/database')
const { DataTypes } = require('sequelize')

class Categories {
    constructor() {
        this.table = orm.define("categories", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            category_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            category_image: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        })
    }

    getAllCategories() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["updatedAt", "DESC"]],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    getCategoryById(id) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["id", "DESC"]],
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

    orderCategoryByName() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["category_name", "ASC"]],
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    addDataCategory(data) {
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

    updateDataCategory(data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                category_name : data.category_name,
                category_image : data.category_image,
            }, {
                where: {
                    id: data.id,
                }
            })
            .then((res) => {
                resolve("Update Data Category Success")
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    removeDataCategory(id) {
        return new Promise((resolve,reject) => {
            this.table.destroy({
                where: {
                    id :id,
                }
            })
            .then((res) => {
                resolve("Delete Data Category Success")
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

module.exports = new Categories()


// const {pool : database} = require("../configs/database")
// const categories = {}

// // Get all data categories
// categories.getAllCategories = () => {
//     return new Promise((resolve, reject) => {
//         database.query('SELECT * FROM public.categories ORDER BY category_id DESC')
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Get data categories by Id
// categories.getCategoryById = (category_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`SELECT * FROM public.categories WHERE category_id = ${category_id}`)
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Add data category to categories table
// categories.addDataCategory = (data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`INSERT INTO public.categories (category_name, category_image) VALUES($1, $2)`, [data.category_name, data.cateory_image])
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Update data from categories table
// categories.updateDataCategory = (data, category_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`UPDATE public.categories SET category_name = ${data.category_name}, category_image = ${data.category_image} WHERE category_id = ${category_id}`)
//         .then((res) => {
//             resolve(res)
//         })
//         .catch((err)=>{
//             console.log(err)
//             reject(err)
//         })
//     })
// }

// // Remove data category from categories table
// categories.removeDataCategory = (category_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`DELETE FROM public.categories WHERE category_id = ${category_id}`)
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// module.exports = categories
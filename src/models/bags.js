const orm = require('../configs/database')
const { DataTypes } = require('sequelize')
const users = require('./users');
const products = require('./products');

class Bags {   
    constructor() {
        this.table = orm.define("bags", {
            id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                autoIncrement : true,
                primaryKey : true
            },
            user_id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            product_id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                onDelete: 'CASCADE',
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        })
        this.table.belongsTo(users.table, {
            foreignKey: 'user_id',
            as: 'users',
            onDelete: 'CASCADE',
        });
        this.table.belongsTo(products.table, {
            foreignKey: 'product_id',
            as: 'products',
            onDelete: 'CASCADE',
        });
    }

    getAllBags() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["updatedAt", "DESC"]],
                include: [
                    {
                        model: products.table,
                        as: 'products',
                    },
                    {
                        model: users.table,
                        as: 'users',
                    }
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

    getBagsById(id) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["id", "DESC"]],
                include: [
                    {
                        model: products.table,
                        as: 'products',
                    },
                    {
                        model: users.table,
                        as: 'users',
                    }
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

    addDataBags(data) {
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

    updateDataBags(data) {
        return new Promise((resolve, reject) => {
            this.table.update(data, {
                where: {
                    id: data.id,
                }
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    removeDataBags(id) {
        return new Promise((resolve,reject) => {
            this.table.destroy({
                where: {
                    id,
                }
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

module.exports = new Bags()

// const {pool : database} = require("../configs/database")
// const bags = {}

// // Get all data bags
// bags.getAllBags = () => {
//     return new Promise((resolve, reject) => {
//         database.query('SELECT * FROM public.bags ORDER BY product_name DESC')       
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Add data to bags table
// bags.addDataBags = (data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`INSERT INTO public.bags(product_name, product_price, total_price, qty) VALUES($1, $2, $3, $4)`, [data.product_name, data.product_price, data.total_price, data.qty])
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// // Update data from bags table
// bags.updateDataBags = (bag_id, data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`UPDATE public.bags SET product_name = ${data.product_name}, product_price = ${data.product_price}, total_ptice = ${data.total_price}, qty = ${data.qty} WHERE bag_id = ${bag_id}`)
//         .then((res) => {
//             resolve(res)
//         })
//         .catch((err)=>{
//             reject(err)
//         })
//     })
// }

// // Remove data from bags table 
// bags.removeDataBags = (bag_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`DELETE FROM public.bags WHERE bag_id = ${bag_id}`)
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// module.exports = bags
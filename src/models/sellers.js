const orm = require("../configs/database")
const {DataTypes} = require("sequelize")

class Sellers {   
    constructor() {
        this.table = orm.define("sellers", {
            id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            email: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            password: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            phone_number: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            store: {
                type : DataTypes.STRING(100),
                allowNull : true
            },
            store_desc: {
                type : DataTypes.TEXT,
                allowNull : true
            },
            image: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            roles: {
                type : DataTypes.STRING(100),
                allowNull : true
            },
        })
    }

    getAllSellers() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order : [["createdAt", "DESC"]]
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    getSellerByEmail(email) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    email,
                },
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    
    addDataSeller(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    updateDataSeller(data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                name: data.name,
                password: data.password,
                store: data.store,
                phone_number: data.phone_number,
                store_desc: data.store_desc,
                image: data.image,
            }, {
                where: {
                    email: data.email,
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

    removeDataSeller(id) {
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

module.exports = new Sellers()

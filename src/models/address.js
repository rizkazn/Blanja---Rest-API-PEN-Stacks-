const orm = require("../configs/database")
const { DataTypes } = require("sequelize")
// const users = require('./users')

class Address {   
    constructor() {
        this.table = orm.define("address", {
            id: {
                type : DataTypes.INTEGER,
                allowNull : false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type : DataTypes.STRING(100),
                allowNull : false,
                // onDelete: 'CASCADE',
                // references: {
                //     model: 'users',
                //     key: 'id',
                // },
            },
            place: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            recipient_name: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            recipient_tlp: {
                type : DataTypes.STRING(100),
                allowNull : true
            },
            address: {
                type : DataTypes.STRING(100),
                allowNull : true
            },
            postalCode: {
                type : DataTypes.STRING(100),
                allowNull : true
            },
            city: {
                type : DataTypes.STRING(100),
                allowNull : false
            },
        })
        // this.table.belongsTo(users.table, {
        //     foreignKey: 'user_id',
        //     as: 'user',
        //     onDelete: 'CASCADE',
        // })
    }

    getAllAddress() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order : [["createdAt", "DESC"]],
                // include: [
                //     {
                //         model: users.table,
                //         as: 'users'
                //     }
                // ],
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    getAddressByEmail(email) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order : [["createdAt", "DESC"]],
                // include: [
                //     {
                //         model: users.table,
                //         as: 'users'
                //     }
                // ],
                where: {
                    email,
                  }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    
    addDataAddress(data) {
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

    updateDataAddress(data) {
        return new Promise((resolve, reject) => {
            this.table.update(data, {
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

    removeDataAddress(id) {
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

module.exports = new Address()

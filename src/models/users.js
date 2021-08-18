 const { orm } = require("../configs/database")
const {DataTypes} = require("sequelize")

class Users {   
    constructor() {
        this.table = orm.define("users", {
            name : {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            email : {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            password : {
                type : DataTypes.STRING(100),
                allowNull : false
            }
        })
    }

    addDataUser(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res.toJSON())
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    getAllUsers() {
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


    getUserByEmail() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                where: {
                    email : email
                  }
            })
            .then(res => {
                resolve(res.rows)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = new Users()

// users.getAllUsers = () => {
//     return new Promise((resolve, reject) => {
//         database.query('SELECT * FROM public.users ORDER BY name DESC')
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// users.getUserByUsername = (username) => {
//     return new Promise((resolve, reject) => {
//         database.query(`SELECT * FROM public.users WHERE username = ${username}`)
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// users.addDataUser = (data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`INSERT INTO public.users ("name", username, "password") VALUES($1, $2, $3)`, [data.name, data.username, data.password])
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// users.updateDataUser = (user_id, data) => {
//     return new Promise((resolve, reject) => {
//         database.query(`UPDATE public.users SET name = ${data.name}, username = ${data.username}, password = ${data.password} WHERE user_id = ${user_id}`)
//         .then((res) => {
//             resolve(res)
//         })
//         .catch((err)=>{
//             reject(err)
//         })
//     })
// }

// users.removeDataUser = (user_id) => {
//     return new Promise((resolve, reject) => {
//         database.query(`DELETE FROM public.users WHERE user_id = ${user_id}`)
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }
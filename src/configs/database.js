const { Pool } = require("pg")
const { Sequelize } = require("sequelize")

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
}) 

const orm = new Sequelize({
    username : process.env.DB_USER,
    database : process.env.DB_NAME,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
    port : 5432,
    dialect : "postgres",
    logging : false
})

module.exports = { pool, orm }
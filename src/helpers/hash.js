const bcr = require("bcrypt")

async function hashPassword(password) {
    try {
        const salt = await bcr.genSalt(10) //random char from a-z sebanyak parameter (misal : 10), kemudian digabung dengan password kita nanti. Salt menyembunyikan bentuk asli dari password 
        const result = await bcr.hash(password, salt)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = hashPassword
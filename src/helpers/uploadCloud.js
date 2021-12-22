const { uploader } = require("../configs/cloudinary")

async function uploads(pathFile) {
    try {
        const result = await uploader.upload(pathFile, {
            folder: "products",
            use_filename: true,
        })
        return result.url
    } catch (error) {
        throw error
    }
}

module.exports = uploads
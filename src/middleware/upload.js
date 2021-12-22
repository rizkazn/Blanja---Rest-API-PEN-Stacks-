const multer = require("multer");

// mengatur penyimpanan filename
const storages = multer.diskStorage({
    destination: "public/upload",
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
})

// hanya menerima image dengan ekstensi tertentu
const filter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "text/plain"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storages,
    fileFilter: filter,
})

module.exports = upload
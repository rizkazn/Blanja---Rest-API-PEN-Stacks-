const morgan = require("morgan")
const Logger = ("../helpers/logger")
const { Writable } = require("stream")

class MyStream extends Writable {
    write(msg) {
        Logger.http(msg)
    }
}

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
}

const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream : new MyStream(),
    skip,
})

module.exports = morganMiddleware


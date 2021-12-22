const winston = require("winston")

const levels = {
    error : 0,
    warn : 1,
    info : 2,
    http : 3,
    debug : 4,
}

const level = () => {
    const env = process.env.NODE_ENV || "Dev"
    const isDevelopment = env === "dev"
    return isDevelopment ? "debug" : "warn"
}

const colors = {
    error : "red",
    warn : "yellow",
    info : "green",
    http : "blue",
    debug : "white",
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
    winston.format.colorize({ all : true}),
    winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`),
)

const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})
  
module.exports = Logger
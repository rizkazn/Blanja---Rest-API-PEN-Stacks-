// const dotenv = require("dotenv")
const server = require('./app')
// const { orm : db } = require('./src/configs/database');
const orm = require('./src/configs/database')
// const { pool : database } = require('./src/configs/database');
const redis = require('./src/configs/redis')
const PORT = 9000;

// if (process.env.NODE_ENV === "dev") {
//     dotenv.config({path:_dirname + "/.env.development"})
// }

// if (process.env.NODE_ENV === "prod") {
//     dotenv.config({path:_dirname + "/.env.production"})
// }

async function init() {
    try {
        await orm.authenticate()
        // await database.connect()
        await orm.sync({alter : true})
        const msg = await redis.check()
        server.listen(PORT, () => {
            console.log(`Connecting to Database`)
            console.log(msg)
            console.log(`Server running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
  }
  
  init()
  
  // database.connect()
  //   .then(() => {
  //     server.listen(PORT, () => {
  //       console.log('Connecting to Database');
  //       console.log(`Running Server at http://localhost:${PORT}`);
  //     });
  //   })
  //   .catch(() => {
  //     console.log('Error Establishing a Database Connection');
  //   })
    
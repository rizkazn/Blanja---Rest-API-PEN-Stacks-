const server = require('./app')
const { orm : db } = require('./src/configs/database');
const { pool : database } = require('./src/configs/database');
const redis = require('./src/configs/redis')
const PORT = 9000;

async function init() {
    try {
        await db.authenticate()
        await database.connect()
        await db.sync({alter : true})
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
    
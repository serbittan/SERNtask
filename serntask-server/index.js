require('dotenv').config()  // Leer los archivos .env

// Traigo las variables de .env que requiero.
const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process


const express = require('express')
const winston = require('winston')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const router = require('./routes')
// const cors = require('cors')
const { mongoose } = require('serntask-data')  // añadido a packaje.json como dependencia

const { name, version } = require('./package.json')   // Como info


// Conectamos con MongoDB.
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const logger = winston.createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'server.log' })
            ]
        })

        if (env !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }))
        }
        console.log('base de datos connectada')

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        // Creamos server
        const app = express()

        // app.use(cors())

        app.use(morgan('combined', { stream: accessLogStream }))

        app.use("/api", router)  // Router es de express y lo requeriremos en index de folder routes.


        // Arrancamos app.
        app.listen(port, () =>
            logger.info(`El servidor ${name} ${version} up and running on port: ${port}`)
        )

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })
    .catch(dbError => {
        console.log('DB Connection Error:', dbError.message)

        process.exit(1)
    })


// Definimos puerto por default
// const PORT = process.env.PORT || 8080




// Traemos el Router de express.

const express = require('express')
const router = express.Router() 

// const { Router } = require('express')    (otra forma de hacerlo)
// const router = new Router()

// Traemos las funciones del handler.
 const {
    registerUser,
    authenticateUser,
    retrieveUser
} = require('./handlers')

// Añadimos: jwtVerifierMidware y jsonBodyParser o el propio bodyparser de express
const jsonBodyParser = express.json()


// Creamos nuestras rutas con router.

// users
router.post('/users', jsonBodyParser, registerUser)
router.post('/users/auth', jsonBodyParser, authenticateUser)
router.get('/users', retrieveUser)



module.exports = router
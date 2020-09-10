// Traemos el Router de express.

const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

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
router.post('/users', jsonBodyParser,
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is required").not().isEmpty(),
        check("email", "put a valid email").isEmail(),
        check("password", "minimum password of 6 characters").isLength({ min: 6 })
    ],
     registerUser)

router.post('/users/auth', jsonBodyParser,
    [
        check("email", "email is required").not().isEmpty(),
        check("email", "put a valid email").isEmail(),
        check("password", "minimum password of 6 characters").isLength({ min: 6 })
    ],
     authenticateUser)
     
router.get('/users', retrieveUser)



module.exports = router
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
    retrieveUser,
    createProject,
    retrieveProjects,
    updateProject,
    deleteProject
} = require('./handlers')

// Añadimos: jwtVerifierMidware y jsonBodyParser o el propio bodyparser de express
const jsonBodyParser = express.json()

// MidleWare
const jwtVerifierMidware = require('../mid-wares/jwt-verifier-mid-ware')

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

router.get('/users', jwtVerifierMidware, retrieveUser)


// projects
router.post(
    '/projects', jwtVerifierMidware, jsonBodyParser,
    [
        check("name", "Project Name is required").not().isEmpty()
    ],
    createProject
)


router.get('/projects', jwtVerifierMidware, retrieveProjects)

router.put('/projects/:projectId', jwtVerifierMidware, jsonBodyParser,
    [
        check("name", "Project Name is required").not().isEmpty()
    ],
    updateProject
)

router.delete('/projects/delete/:projectId', jwtVerifierMidware, deleteProject)



module.exports = router
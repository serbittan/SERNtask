const { registerUser } = require('../../logic')
const { validationResult } = require('express-validator')

module.exports = (req, res) => {
    // ver los resultados de la validación 'check()' del router
    const errors = validationResult(req)  // errors es un array!
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { body: { name, email, password } } = req

    try {
        registerUser(name, email, password)
            .then(() => {
                res.status(200).json({ msg: 'User created succesfuly' })
            })
            .catch(error => {
                res.status(400).json({ msg: error.message })

            })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}



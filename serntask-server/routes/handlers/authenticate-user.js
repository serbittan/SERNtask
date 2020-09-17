const { authenticateUser } = require('../../logic')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { env: { JWT_SECRET, JWT_EXP } } = process

module.exports = (req, res) => {
    // validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(id => {
                //generar token (De dos formas diferentes)
                // const token = jwt.sing({ sub: id}, JWT_SECRET, { expiresIn: JWT_EXP})

                // firmar el JWT.
                jwt.sign({ sub: id }, JWT_SECRET, {
                    expiresIn: JWT_EXP
                }, (error, token) => {
                    if (error) throw error

                    // mensage de confirmación.
                    res.status(200).send({ token })
                })
            })
            .catch(error => {
                res.status(400).json({ msg: error.message })
            })
    } catch (error) {
        res.status(400).send('Hubo un error')

    }
}
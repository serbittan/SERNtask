const { authenticateUser } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET, JWT_EXP } } = process

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(id => {
                //generar token
                const token = jwt.sign({sub: id}, JWT_SECRET, { expiresIn: JWT_EXP})
                console.log({token})
                res.status(200).send({ token })
            })
            .catch(error => {
                res.status().send(error.message)
            })
    } catch (error) {
        //TODO
    }
}
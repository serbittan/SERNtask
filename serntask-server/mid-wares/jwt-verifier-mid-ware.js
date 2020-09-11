// midleWare de authentificación usuario

const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process


module.exports = (req, res, next) => {
    // Leer token del header.
    const token = req.header('x-auth-token')

    // Revisar si no hay token.
    if (!token) return res.status(401).json({ msg: 'Not available token, permission denayed' })

    // validar el token.
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.payload = payload

        next()
        
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}
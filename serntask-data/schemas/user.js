// Traerme Schema de mongoose
const { Schema } = require('mongoose')

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    created: { type: Data, require: true, default: Data.now()},
    authenticated: { type: Data },
    retrieved: { type: Data }
})

module.exports = user
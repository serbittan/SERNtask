const mongoose = require('mongoose')
const { user } = require('../schemas')

const User = mongoose.model('User', user)

module.exports = User
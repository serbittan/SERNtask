const mongoose = require('mongoose')
const { task } = require('../schemas')

const Task = mongoose.model('Task', task)

module.exports = Task
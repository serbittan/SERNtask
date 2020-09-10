const mongoose = require('mongoose')
const { project } = require('../schemas')

const Project = mongoose.model('Project', project)

module.exports = Project
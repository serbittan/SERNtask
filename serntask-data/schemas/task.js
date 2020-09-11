const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    project: { 
        type: ObjectId,
        ref: "Project"
    },
    date: {
        type: Date,
        default: Date.now()
    }

})
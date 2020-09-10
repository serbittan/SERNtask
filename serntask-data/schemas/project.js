const { Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    created: {
        type: Date,
        required: true, 
        default: Date.now()
    }
})


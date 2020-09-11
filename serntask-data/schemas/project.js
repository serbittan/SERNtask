const { Schema, Types: { ObjectId }  } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,  // mongoose.Schema.Types.ObjectId
        ref: "User"
    },
    created: {
        type: Date, 
        default: Date.now()
    }
})


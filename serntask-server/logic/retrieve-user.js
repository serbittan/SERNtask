const { models: { User } } = require('serntask-data')


const retrieveUser = (id) => {
    

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new Error(`User with id: ${id} not exist`)

        user.retrieved = new Date()

        user.id = user._id.toString()

        delete user._id
        delete user.__v

        return user
    })()
}

module.exports = retrieveUser
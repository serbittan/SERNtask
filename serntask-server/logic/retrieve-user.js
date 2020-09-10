const { models: { User } } = require('serntask-data')


const retrieveUser = (id) => {
    // validate

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} do not exist`)

        return user
    })()
}

module.exports = retrieveUser
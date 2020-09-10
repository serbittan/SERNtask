const { models: { User } } = require('serntask-data')
const bcrypt = require('bcrypt')


const authenticateUser = (email, password) => {
    // validate

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new Error(`El usuario con email: ${email} no existe`)

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) throw new Error('wrong credentials')

        user.authenticated = new Date()

        await user.save()

        return user.id


    })()
}
module.exports = authenticateUser
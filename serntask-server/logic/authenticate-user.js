const { models: { User } } = require('serntask-data')
const bcrypt = require('bcrypt')


const authenticateUser = (email, password) => {
    // validate

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new NotAllowedError(`user with ${email} do not exist`)

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) throw new NotAllowedError('wrong credentials')

        user.authenticated = new Date()

        await user.save()

        return user.id


    })()
}
module.exports = authenticateUser
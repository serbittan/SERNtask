const { models: { User } } = require('serntask-data')
const bcrypt = require('bcrypt')

const registerUser = (name, email, password) => {
    // validate

    return (async () => {
        let user = await User.findOne({ email })

        if (user) throw new Error('El usuario ya existe')

        const validPassword = await bcrypt.hash(password, 10)

        user = await new User({ name, email, password : validPassword })

        await user.save()

    })()

}
module.exports = registerUser
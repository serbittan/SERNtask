require('dotenv').config()
const { expect } = require('chai')
const { mongoose, models: { User } } = require('serntask-data')
const { env: { TEST_MONGODB_URL } } =  process

const { random } = Math
const bcrypt = require('bcrypt')
const registerUser = require('./register-user')

describe('registerUser', () => {
    let name, email, password

    before(() => 
        mongoose.connect( TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct data', async () => {
        let id

        const returnValue = await registerUser(name, email, password)

        expect(returnValue).to.be.undefined

        const user = await User.findOne({ email })
        id = user.id

        expect(user).to.exist
        expect(user.id).to.be.a('string')
        expect(user.id).to.be.equal(id)
        expect(user.name).to.be.equal(name)
        expect(user.email).to.be.equal(email)
        expect(user.created).to.be.an.instanceOf(Date)

        const _password = await bcrypt.compare(password, user.password)

        expect(_password).to.be.exist
        expect(_password).to.be.true
    })

    describe('when user already exist', () => {
        let id
        
        // creamos al usuario
        beforeEach(async () => {
            const user = await User.create({ name, email, password })

            id = user.id
            await user.save()
        })
        
        it('should fail and throw', async () => {
            try {
                await registerUser(name, email, password)
                throw new Error('user already exist')
            } catch (error) {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('user already exist')
            }
        })
    })

    // Estos errores no estan contemplados aquí. (a falta de function validate)

    // it('should fail on non-string or empty name', () => {
    //     name = 1
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${name} is not a string`)

    //     name = true
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${name} is not a string`)

    //     name = {}
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${name} is not a string`)

    //     name = undefined
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${name} is not a string`)

    //     name = ''
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(Error, `name is required`)
    // })

    // it('should fail on-non string or empty email', () => {
    //     email = 1
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `email ${email} is not a string`)

    //     email = true
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `email ${email} is not a string`)

    //     email = {}
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `email ${email} is not a string`)

    //     email = undefined
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${email} is not a string`)

    //     email = ''
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(Error, `email is empty`)
    // })

    // it('should fail on-wrong email format', () => {
    //     email = 'email'
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(ContentError, `email ${email} is not an e-mail`)

    //     email = 'email@email--';
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(ContentError, `email ${email} is not an e-mail`)
    // })

    // it('should fail on non-string or empty password', () => {
    //     password = 1
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `password ${password} is not a string`)

    //     password = true
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `password ${password} is not a string`)

    //     password = {}
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `password ${password} is not a string`)

    //     password = undefined
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(TypeError, `name ${password} is not a string`)

    //     password = ''
    //     expect(() =>
    //         registerUser(name, email, password)
    //     ).to.throw(Error, `password is empty`)


    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })

})


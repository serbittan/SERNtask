require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User } } = require('serntask-data')
const bcrypt = require('bcrypt')
const registerUser = require('./register-user')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let name, email, password, confirm

    Before(() => 
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `${Math.random()}@email.com`
        password = `password-${Math.random()}`
    })

    it('should succeed on correct user data', async () => {
        const returnValue = await registerUser(name, email, password)
        expect(returnValue).to.be.undefined

        
        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user._id).to.be.a('string')
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)
        expect(user.created).to.exist
        expect(user.create).to.be.an.instanceOf(Date)
        
        const validPassword = await bcrypt.compare(password, user.password)
        expect(validPassword).to.be.true
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            return await User.create({ name, email, password })
        })

        it('should fail when user already exist', async () => {
            try {
                await registerUser({ name, email, password })

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.be.equal(`user with email ${email} already exist`)
            }
        })
    })

    it('should fail on non-string or empty name', () => {
        name = 1
        expect(() => registerUser({ name, email, password})).to.throw(
            TypeError, 
            `name ${name} is not a string`
        )

        name = true
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `name ${name} is not a string`
        )

        name = {}
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `name ${name} is not a string`
        )

        name = ''
        expect(() => registerUser({ name, email, password})).to.throw(
            Error, 
            `name is empty`
        )
    })

    it('should fail on-non string or empty email', () => {
        email = 1
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `email ${email} is not a string`
        )

        email = true
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `email ${email} is not a string`
        )

        email = {}
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `email ${email} is not a string`
        )

        email = ''
        expect(() => registerUser({ name, email, password })).to.throw(
            Error,
            `email is empty`
        )
    })

    it('should fail on-wrong email format', () => {
        email = 'email'
        expect(() => registerUser({ name, email, password })).to.throw(
            ContentError,
            `${email} is not an e-mail`
        )

        email = 'email@email--';
		expect(() => registerUser({ name, surname, email, password })).to.throw(
			ContentError,
			`${email} is not an e-mail`
		)
    })

    it('should fail on non-string or empty password', () => {
        password = 1
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `password ${password} is not a string`
        )

        password = true
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `password ${password} is not a string`
        )

        password = {}
        expect(() => registerUser({ name, email, password })).to.throw(
            TypeError,
            `password ${password} is not a string`
        )

        password = ''
        expect(() => registerUser({ name, email, password })).to.throw(
            Error, 
            `password is empty`
        )

        after(() => User.deleteMany().then(() => mongoose.disconnect()))
    })
    
})

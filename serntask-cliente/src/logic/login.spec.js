const { mongoose, models: { User } } = require('serntask-data')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

const bcrypt = require('bcrypt')
const { random } = Math

const { login } = require('.')


describe('login', () => {
    let name, email, password

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user exist', () => {
        let id

        beforeEach(async () => {
            // creamos user
            const _password = await bcrypt.hash(password, 10)

            const user = await User.create({ name, email, password: _password })

            user.authenticated = new Date()

            id = user.id

            await user.save()
        })

        it('should succeed on right credentials', async () => {
            const response = await login({ email, password })
            
            const { data: { token } } = response
            
            expect(response).toBeDefined()
            expect(typeof response.data.token).toBe('string')
            expect(response.data.token.length).toBeGreaterThan(0)
            
            const { sub } = await JSON.parse(atob(token.split('.')[1]))
            
            expect(sub).toBe(id)
        })
    })

    it('should fail on wrong email', async () => {
        email = `${email}-wrong`

        try {
            const response = await login({ email, password })
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.response.status).toEqual(401)
            expect(error.response.data.msg).toBe(`User with email: ${email} do not exist`)
        }
    })

    it('should fail on wrong password', async () => {
        password = `${password}-wrong`
        try {
            const response = await login({ email, password })
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.response.data.msg).toBe(`User with email: ${email} do not exist`)
        }
    })
    

    describe('when user does not exist', () => {
        beforeEach(async () => {
            // creamos user.
            const _password = await bcrypt.hash(password, 10)

            const user = await User.create({ name, email, password: _password })

            // eliminamos el user.
            await User.deleteMany()
        })

        it('should be fail and throw', async () => {
            try {
                const response = await login({ email, password })
                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toEqual(`User with email: ${email} do not exist`)
            }
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})
// Adaptar el test a 'jest': function import..., expecs diferentes, beforeAll..., no require chai..., instalar serntask-data en package json & others...
const { mongoose, models: { User } } = require('serntask-data')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

const { random } = Math
const bcryt = require('bcrypt')

const { registerUser } = require('.')


describe('registerUser', () => {
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

    it('should succeed on correct data', async () => {
        const returnValue = await registerUser({ name, email, password })
        
        expect(returnValue).toBeUndefined()

        const user = await User.findOne({ email })
        
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)

        const validPassword = await bcryt.compare(password, user.password)

        expect(validPassword).toBeTruthy()
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password })

        })

        it('should fail and throw', async () => {
            try {
                const response = await registerUser({ name, email, password })
                throw new Error(error.message)
                
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.status).toEqual(400)
                expect(error.response.data.msg).toBe('user already exist')
            }
        })
    })
    // el error syncrono esta en el propio componente de Register

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})
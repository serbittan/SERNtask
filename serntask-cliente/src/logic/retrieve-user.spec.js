const { mongoose, models: { User } } = require('serntask-data')
const { env: { 
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET 
} } = process

const { random } = Math
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { tokenAuth } from '../config'

const { retrieveUser } = require('.')


describe('retrieveUser', () => {
    let name, email, password

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user exist', () => {
        let _id

        beforeEach(async () => {
            // creamos al user.
            const _password = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, email, password: _password })

            _id = id

            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            // metemos el token al headers
            tokenAuth(token)
        })

        it('should succeed on retrieve user', async () => {
            const response = await retrieveUser()

            expect(response.data).toBeDefined()
            expect(response.data.id).toEqual(_id)
            expect(response.data.name).toEqual(name)
            expect(response.data.email).toEqual(email)
            expect(response.data.password).toBeUndefined()
        })
    })

    it('should fail on invalid token', async () => {
        let token = 'jslddfsd..ss-wrong'
        tokenAuth(token)

        try {
            const response = await retrieveUser()
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.response.status).toEqual(401)
            expect(error.response.data.msg).toEqual('Invalid token')
        }
    })
    

    describe('when user does not exist', () => {
        let _id

        beforeEach(async () => {
            // crear user.
            const _password = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, email, password: _password })

            _id = id

            // eliminar user.
            await User.deleteMany()
          
            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            tokenAuth(token)

        })

        it('should fail and throw', async () => {
            try {
                const response = await retrieveUser()
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.status).toEqual(400)
                expect(error.response.data.msg).toEqual(`User with id: ${_id} not exist`)
            }
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})
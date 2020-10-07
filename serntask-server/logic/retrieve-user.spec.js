require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('serntask-data')

const { random } = Math
const retrieveUser = require('./retrieve-user')


describe('retrieveUser', () => {
    let name, email, password

    before(async () => {
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
        let _id

        beforeEach(async () => {
            // creamos al user
            const { id } = await User.create({ name, email, password })

            _id = id
        })

        it('should succeed on retrieve user', async () => {
            const user = await retrieveUser(_id)

            expect(user).to.be.exist
            expect(user).to.be.an('object')
            expect(user.id).to.be.equal(_id)
            expect(user.name).to.be.equal(name)
            expect(user.password).to.be.undefined
            expect(user.retrieved).to.exist
            expect(user.retrieved).to.be.an.instanceOf(Date)
        })
    })

    describe('when user do not exist', () => {
        let _id

        beforeEach(async () => {
            // eliminamos el user
            await User.deleteMany()
        })

        it('should fail a throw', async () => {
            try {
                const user = await retrieveUser(_id)
                throw new Error('you should not reach this point')
                
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal(`User with id: ${_id} not exist`)

            }
        })
    })

    // la validación asyncrona en caso de contemplarse

    // it('should fail on non-string or empty id', () => {
    // let id = 1
    // expect(() => 
    //     retrieveUser(id)
    // ).to.throw(Error, `id ${id} is not a string`)

    // id = true
    // expect(() => 
    //     retrieveUser(id)
    // ).to.throw(Error, `id ${id} is not a string`)

    // id = undefined
    // expect(() =>
    //     retrieveUser(id)
    // ).to.throw(Error, `id ${id} is not a string`)

    // id = ''
    // expect(() => 
    //     retrieveUser(id)
    // ).to.throw(Error, `id ${id} is not a string`)

    // id = {}
    // expect(() => 
    //     retrieveUser(id)
    // ).to.throw(Error, `id ${id} is not a string`)    
    //})

    after(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })

})

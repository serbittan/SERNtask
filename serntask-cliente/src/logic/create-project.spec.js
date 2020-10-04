const { mongoose, models: { User, Project } } = require('serntask-data')
const { env: { 
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
 } } = process

const { random } = Math
const jwt = require('jsonwebtoken')
import { tokenAuth } from '../config'

const { createProject} = require('.')


describe('createProject', () => {
    let name, email, password, projectName

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        return [User.deleteMany(), Project.deleteMany()]
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        projectName = `projectName-${random()}`
    })

    describe('when user exist', () => {
        let _id
        
        beforeEach(async () => {
            // crear user
            const { id } = await User.create({ name, email, password })

            _id = id

            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            tokenAuth(token)

        })

        it('should succeed on correct data', async () => {
            const response = await createProject({ name: projectName })
           
            expect(response).toBeDefined()
            expect(response.data.msg).toEqual('Project created succesfuly')

            const project = await Project.findOne({ creator: _id})
            
            expect(project).toBeDefined()
            expect(project).toBeInstanceOf(Object)
            expect(project.name).toEqual(projectName)
            expect(project.creator.toString()).toEqual(_id)
        })
    })

    it('should fail on wrong token', async () => {
        const token = 'ksld.sdfksfsf-wrong'
        tokenAuth(token)

        try {
            const response = await createProject({ name: projectName })
            throw new Error('you should not reach this point')

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.response.data.msg).toBe('Invalid token')
        }
    })
    

    describe('when user does not exist', () => {
        let _id

        beforeEach(async () => {
            // crear user.
            const { id } = await User.create({ name, email, password })

            _id = id

            // eliminar user.
            await User.deleteMany()

            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            tokenAuth(token)
        })

        it('should fail and throw', async () => {
            try {
                const project = await createProject({ name: projectName })
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toBe('User not found')
                expect(error.response.data.creator).toBeUndefined()
            }
        })
    })

    afterAll(async () => {
        [User.deleteMany(), Project.deleteMany()]
        return await mongoose.disconnect()
    })
})
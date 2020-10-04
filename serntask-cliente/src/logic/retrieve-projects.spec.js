const { mongoose, models: { User, Project } } = require('serntask-data')
const { env: { 
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET 
} } = process

const { random } = Math
const jwt = require('jsonwebtoken')
import { tokenAuth } from '../config'

const { retrieveProjects } = require('.')


describe.only('retrieveProjects', () => {
    let name, email, password, projectName

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return [User.deleteMany(), Project.deleteMany()]
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        projectName = `projectName-${random()}`
    })

    describe('when user and project exist', () => {
        let _id

        beforeEach(async () => {
            // crear user.
            const { id } = await User.create({ name, email, password })

            _id = id

            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)
          
            tokenAuth(token)

            // crear project.
            const project = await Project.create({ name: projectName })
            
            project.creator = _id

            await project.save()
        })

        it('should succeed on retrieve all projects', async () => {
            const response = await retrieveProjects()
            
            expect(response).toBeDefined()
            expect(response.data).toBeInstanceOf(Array)
            expect(typeof response.data[0].id).toBe('string')
            expect(response.data[0].name).toEqual(projectName)
            expect(response.data[0].creator.toString()).toEqual(_id)

        })
    })

    it('should fail on wrong token', async () => {
        let token = 'sldknb.scx,cvnslns'
        tokenAuth(token)

        try {
            const response = await retrieveProjects()
            throw new Error('you should not reach this point')

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.response.data.msg).toBe('Invalid token')
        }
    })

    afterAll(async () => {
        [User.deleteMany(), Project.deleteMany()]
        return await mongoose.disconnect()
    })
})



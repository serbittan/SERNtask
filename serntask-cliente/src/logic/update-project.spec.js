const { mongoose, models: { User, Project } } = require('serntask-data')
const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

const { random } = Math
const jwt = require('jsonwebtoken')
const { tokenAuth } = require('../config')

const { updateProject } = require('.')

describe('updateProject', () => {
    let name, email, password, name2, email2, password2, projectName

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

        name2 = `name2-${random()}`
        email2 = `email2-${random()}@mail.com`
        password2 = `password2-${random()}`

        projectName = `projectName-${random()}`
    })

    describe('when user and project exist', () => {
        let id, _project

        beforeEach(async () => {
            // user.
            const user = await User.create({ name, email, password })

            id = user.id
            // project.
            const project = await Project.create({ name: projectName })

            _project = project.id

            project.creator = id

            await project.save()
            // token.
            const token = jwt.sign({ sub: id }, TEST_JWT_SECRET)

            tokenAuth(token)
        })

        it('should succeed on update project name', async () => {
            const response = await updateProject({ id: _project, name: projectName })

            expect(response).toBeDefined()
            expect(response.data).toBeInstanceOf(Object)
            expect(response.data.id).toBe(_project)
            expect(response.data.name).toBe(projectName)
            expect(response.data.creator.toString()).toBe(id)
        })
    })

    describe('when user and project-user is not the same', () => {
        let id, id2, _project

        beforeEach(async () => {
            // user.
            const user = await User.create({ name, email, password })

            id = user.id
            // user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2 })

            id2 = user2.id
            // project.
            const project = await Project.create({ name: projectName })

            _project = project.id

            project.creator = id

            await project.save()
            // token.
            const token = jwt.sign({ sub: id2 }, TEST_JWT_SECRET)

            tokenAuth(token)
        })

        it('should fail and throw', async () => {
            try {
                const response = await updateProject({ id: _project, name: projectName })
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toBe('Not authorized')
            }
        })
    })

    describe('when project does not exist', () => {
        let id, _project

        beforeEach(async () => {
            // user.
            const user = await User.create({ name, email, password })

            id = user.id
            // project.
            const project = await Project.create({ name: projectName })

            _project = project.id

            project.creator = id

            await project.save()
            // token.
            const token = jwt.sign({ sub: id }, TEST_JWT_SECRET)

            tokenAuth(token)
            
            // eliminar project.
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                const response = await updateProject({ id: _project, name: projectName })
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toBe('Project not found')
                
            }
        })
    })

    afterAll(async () => {
        [User.deleteMany(), Project.deleteMany()]
         return await mongoose.disconnect()
    })

})

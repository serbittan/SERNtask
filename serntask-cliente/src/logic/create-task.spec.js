const { mongoose, models: { User, Project, Task } } = require('serntask-data')
const { env: { 
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET 
} } = process

const { random } = Math
const jwt = require('jsonwebtoken')
import { tokenAuth } from '../config'

const { createTask } = require('.')

describe('createTask', () => {
    let name, email, password, name2, email2, password2, projectName, taskName

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })

        return [User.deleteMany(), Project.deleteMany(), Task.deleteMany()]
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        name2 = `name2-${random()}`
        email2 = `email2-${random()}@mail.com`
        password2 = `password2-${random()}`

        projectName = `projectName-${random()}`

        taskName = `taskName-${random()}`
    })

    describe('when user and project exist', () => {
        let id, _project

        beforeEach(async () => {
            // crear user
            const user = await User.create({ name, email, password })

            id = user.id

            // crear project
            const project = await Project.create({ name: projectName })

            _project = project.id

            project.creator = id

            await project.save()

            // token
            const token = jwt.sign({ sub: id }, TEST_JWT_SECRET)

            tokenAuth(token)
        })

        it('should succeed on correct data', async () => {
            const response = await createTask({ id, name: taskName, project: _project })
            
            expect(response).toBeUndefined()

            const task = await Task.find({ project: _project })
            
            expect(task).toBeDefined()
            expect(task[0].id).toBeDefined()
            expect(task[0].name).toBe(taskName)
            expect(task[0].status).toBeFalsy()
            expect(task[0].project.toString()).toBe(_project)
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
                const response = await createTask({ id, name: taskName, project: _project })
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.status).toBe(400)
                expect(error.response.data.msg).toBe(`Project with id ${_project} not found`)
            }
            
        })
    })

    describe('when user and user-project are not the same', () => {
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
                const response = await createTask({ id2, name: taskName, project: _project })
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toBe('Not authorized')
            }
        })
    })

    afterAll(async () => {
        [User.deleteMany(), Project.deleteMany(), Task.deleteMany()]
        return await mongoose.disconnect()
    })
})
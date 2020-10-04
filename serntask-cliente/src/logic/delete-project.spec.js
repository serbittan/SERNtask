const { mogoose, models: { User, Project }, mongoose } = require('serntask-data') 
const { env: { 
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, 
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET 
} } = process

const { random } = Math
const jwt = require('jsonwebtoken')
import { tokenAuth } from '../config'

const { deleteProject } = require('.')


describe('deleteProject', () => {
    let name, email, password, name2, email2, password2, projectName 

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

        name2 = `name2-${random()}`
        email2 = `email2-${random()}@mail.com`
        password2 = `password2-${random()}`
        
        projectName = `projectName-${random()}`
    })

    describe('when user and project exist', () => {
        let _id, projectId

        beforeEach(async () => {
            // creamos a user.
            const { id } = await User.create({ name, email, password })

            _id = id

            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            tokenAuth(token)

            // creamos project.
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = _id

            await project.save()
        })

        it('should succeed on delete project', async () => {
            const response = await deleteProject(projectId)
            
            expect(response).toBeUndefined()

            const project = await Project.findById(projectId)
           
            expect(project).toBeNull()
        })
    })
     
    describe('when project does not exist', () => {
        let _id, projectId

        beforeEach(async () => {
            // crear user.
            const { id } = await User.create({ name, email, password })

            _id = id

            // crear project.
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = _id

            await project.save()

            // token.
            const token = jwt.sign({ sub: _id }, TEST_JWT_SECRET)

            tokenAuth(token)

            // eliminar project.
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                const response = await deleteProject(projectId)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.data.msg).toBe('Project not found')
            }
        })
    })

    describe('when user does not exist', () => {
        let _id, projectId, _id2

        beforeEach(async () => {
            // user1.
            const { id } = await User.create({ name, email, password })

            _id = id

            // user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2 })

            _id2 = user2.id

            // eliminar user1.
            await User.deleteMany()

            // project.
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = _id

            await project.save()

            // token.
            const token = jwt.sign({ sub: _id2 }, TEST_JWT_SECRET)

            tokenAuth(token)
        })

        it('should fail and throw', async () => {
            try {
                const response = await deleteProject(projectId)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.response.status).toBe(401)
                expect(error.response.data.msg).toBe('Not authorized')
            }
        })
    })
})
    
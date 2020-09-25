require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Project, Task } } = require('serntask-data')

const { random } = Math
const createTask = require('./create-task')

describe('createTask', () => {
    let name, email, password, projectName

    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        
        await [Project.deleteMany(), Project.deleteMany(), Task.deleteMany()]
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        projectName = `projectName-${random()}`

        taskName = `taskName-${random()}`
    })

    describe('when user and project exist', () => {
        let _id, _project

        beforeEach(async () => {
            // crear user.
            const { id } = await User.create({ name, email, password })
            _id = id

            // crear project.
            const project = await Project.create({ name: projectName })
            
            _project = project.id

            project.creator = _id

            await project.save()
        })

        it('should succeed in create a new task', async () => {
            const returnValue = await createTask(_id, taskName, _project)

            expect(returnValue).to.be.undefined

            // buscamos la tarea creada.
            const task = await Task.findOne({ project: _project })
            
            expect(task).to.exist
            expect(task).to.be.an.instanceOf(Object)
            expect(task.id).to.be.an('string')
            expect(task.name).to.be.equal(taskName)
            expect(task.project.toString()).to.be.equal(_project)
            expect(task.status).to.be.false
        })
    })

    describe('when user does not exist', () => {
        let _id , _project

        beforeEach(async () => {
            // creamos user
            const { id } = await User.create({ name, email, password })
            _id = id

            // creamos project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = _id

            await project.save()

            // eliminamos el user
            await User.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                await createTask(_id, taskName, _project)
                throw new Error('Not authorized')

            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('Not authorized')
            }
        })
    })

    describe('when project does not exist', () => {
        let id, _project

        beforeEach(async () => {
            // creamos user
            const user = await User.create({ name, email, password })
            id = user.id

            // creamos project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // eliminamos el project
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                await createTask(id, taskName, _project)
                throw new Error(`Project with id ${_project} not found`)

            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal(`Project with id ${_project} not found`)
            }
        })
    })

    after(async () => {
        await [User.deleteMany(), Project.deleteMany(), Task.deleteMany()]
        await mongoose.disconnect()
    })
})
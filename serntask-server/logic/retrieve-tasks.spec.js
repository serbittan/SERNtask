require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Project, Task } } = require('serntask-data')

const { random } = Math
const retrieveTasks = require('./retrieve-tasks')


describe('retrieveTasks', () => {
    before(async () => {
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
            // creamos user.
            const user = await User.create({ name, email, password })
            id = user.id

            // creamos project.
            const project = await Project({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // creamos una task.
            const task = await Task.create({ name: taskName, project: _project })
        })

        it('should succeed in retrieve all tasks', async () => {
            const tasks = await retrieveTasks(id, _project)
  
            expect(tasks).to.exist
            expect(tasks).to.be.an('array')
            expect(tasks[0].id).to.be.exist
            expect(tasks[0].id).to.be.a('string')
            expect(tasks[0].name).to.be.equal(taskName)
            expect(tasks[0].status).to.be.false
            expect(tasks[0].project.toString()).to.be.equal(_project)
            expect(tasks[0].date).to.be.an.instanceOf(Date)
        })
    })

    describe('when user and project-user are not the same', () => {
        let id, id2, _project

        beforeEach(async () => {
            // creamos user.
            const user = await User.create({ name, email, password })
            id = user.id

            // creamos user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2 })
            id2 = user2.id

            // creamos project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // creamos task.
            const task = await Task.create({ name: taskName, project: _project })
        })

        it('should fail and throw', async () => {
            try {
                const tasks = await retrieveTasks(id2, _project)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('Not authorized')
            }
        })
    })

    describe('when project does not exist', () => {
        let id, _project

        beforeEach(async () => {
            // creamos user.
            const user = await User.create({ name, email, password })
            id = user.id

            // creamos project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // creamos task.
            const task = await Task.create({ name: taskName, project: _project })

            // eliminamos project.
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                const tasks = await retrieveTasks(id, _project)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal(`project with id: ${_project} not found`)
            }
        })
    })

    after(async () => {
        [User.deleteMany(), Project.deleteMany(), Task.deleteMany()]
        return await mongoose.disconnect()
    })
            
})
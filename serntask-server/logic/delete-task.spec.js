require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Project, Task } } = require('serntask-data')

const { random } = Math
const deleteTask = require('./delete-task')


describe('deleteTask', () => {
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

    describe('when user and project and task exist', () => {
        let id, _project, taskId

        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password })
            id = user.id

            // crear project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // crear task.
            const task = await Task.create({ name: taskName, _project })
            taskId = task.id
        })

        it('should succeed remove the task', async () => {
            const returnValue = await deleteTask(id, _project, taskId)

            expect(returnValue).to.be.undefined

            // buscamos la task
            const task = await Task.findById(taskId)

            expect(task).not.exist
            expect(task).to.be.null
        })
    })

    describe('when user and project-user are not the same', () => {
        let id, id2, _project, taskId

        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password })
            id = user.id

            // crear user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2 })
            id2 = user2.id

            // crear project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // crear task.
            const task = await Task.create({ name: taskName, _project })
            taskId = task.id
        })

        it('should fail and throw', async () => {
            try {
                await deleteTask(id2, _project, taskId)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('Not authorized')
            }
        })
    })

    describe('when project does not exist', () => {
        let id, _project, taskId

        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password })
            id = user.id

            // crear project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // crear task.
            const task = await Task.create({ name: taskName, _project })
            taskId = task.id

            // eliminar project.
            await Project.deleteMany()
            
        })

        it('should fail and throw', async () => {
            try {
                await deleteTask(id, _project, taskId)
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
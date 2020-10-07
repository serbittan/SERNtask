require('dotenv').config()
const { expect } = require('chai')
const { mongoose, models: { User, Project, Task } } = require('serntask-data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

const updateTask = require('./update-task')


describe('updateTask', () => {
    // status será true o false de forma aleatoria
    let statusUpdate = Math.floor(Math.random() * 2)


    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
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
        status = statusUpdate === 0 ? true : false
    })

    describe('when user and project and task exist', () => {
        let id, _project, taskId

        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password})
            id = user.id

            // crear project.
            const project = await Project.create({ name: projectName })
            _project = project.id

            project.creator = id

            await project.save()

            // crear task.
            const task = await Task.create({ name: taskName })
            taskId = task.id
        })

        it('should succeed in update new task', async () => {
            const update = await updateTask(id, _project, taskId, taskName, status)
           
            expect(update).to.be.exist
            expect(update).to.be.an.instanceOf(Object)
            expect(update).to.be.an('object')

            expect(update.id).to.be.equal(taskId)
            expect(update.name).to.be.equal(taskName)
            expect(update.status).to.be.exist
            expect(update.status).to.be.equal(status)
            
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
            const task = await Task.create({ name: taskName })
            taskId = task.id
        })

        it('should fail and throw', async () => {
            try {
                const update = await updateTask(id2, _project, taskId, taskName, status)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.be.exist
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
            const task = await Task.create({ name: taskName })
            taskId = task.id

            // eliminar project.
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                const update = await updateTask(id, _project, taskId, taskName, status)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.be.exist
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
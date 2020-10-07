require('dotenv').config()
const { expect } = require('chai')
const { mongoose, models: { User, Project } } = require('serntask-data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

const updateProject = require('./update-project')


describe('updateProject', () => {
    // estas variables son para el testeo syncrono.(No tiene serntido definirlas si no existe ese test)

    before(async () => {
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
            // crear user.
            const { id } = await User.create({ name, email, password })

            _id = id
            // crear project.
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = _id

            await project.save()
        })

        it('should succeed when update project', async () => {
            const update = await updateProject(_id, projectId, projectName)
           
            expect(update).to.exist
            expect(update).to.be.an.instanceOf(Object)
            expect(update).to.be.an('object')

            expect(update.id).to.be.exist
            expect(update.name).to.be.equal(projectName)
            expect(update.creator.toString()).to.be.equal(_id)
            expect(update.created).to.be.an.instanceOf(Date)
        })
    })

    describe('when user and project-user are not the same', () => {
        let _id, _id2, projectId

        beforeEach(async () => {
            // crear user.
            const user = await User.create({ name, email, password })

            _id = user.id
            // crear user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2})

            _id2 = user2.id
            // crear project.
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = _id

            await project.save()
        })

        it('should fail and throw', async () => {
            try {
                const update = await updateProject(_id2, projectId, projectName)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('Not authorized')
            }
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

            // eliminar project
            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                const update = await updateProject(_id, projectId, projectName)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('Project not found')
            }
        })
    })

    after(async () => {
        [User.deleteMany(), Project.deleteMany()]
        return await mongoose.disconnect()
    })
})
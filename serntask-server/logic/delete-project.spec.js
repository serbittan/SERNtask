require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Project } } = require('serntask-data')

const { random } = Math
const deleteProject = require('./delete-project')


describe('deleteProject', () => {
    let name, email, password, name2, email2, password2

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
        let id, projectId

        beforeEach(async () => {
            // crear user
            const user = await User.create({ name, email, password })
            id = user.id

            // crear project.
            const project = await  Project.create({ name: projectName })
            project.creator = id

            await project.save()
            projectId = project.id
        })

        it('should succeed on delete project', async () => {
            const returnvalue = await deleteProject(id, projectId)
            
            expect(returnvalue).to.be.undefined
            
            const project = await Project.findById(projectId)

            expect(project).to.be.null
            
        })
    })

    describe('when user does not exist', () => {
        let _id, _id2, projectId

        beforeEach(async () => {
            // user.
            const user = await User.create({ name, email, password })

            _id = user.id
            // user2.
            const user2 = await User.create({ name: name2, email: email2, password: password2 })

            _id2 = user2.id


            const project = await Project.create( { name: projectName })

            project.creator = _id

            projectId = project.id

            await project.save()
        })

        it('should fail and throw', async () => {
            try {
                await deleteProject(_id2, projectId)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.be.an.instanceOf(Error)
                expect(error).to.exist
                expect(error.message).to.be.equal('Not authorized')
            }
        })
    })

    describe('when project does not exist', () => {
        let _id, projectId

        beforeEach(async () => {
            // creamos user
            const { id } = await User.create({ name, email, password })
            _id = id

            // creamos project.
            const project = await Project.create({ name: projectName })
            project.creator = _id
            projectId = project.id
            
            await project.save()

            await Project.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                await deleteProject(_id, projectId)
                throw new Error('you should not reach this point')

            } catch (error) {
                expect(error).to.be.an.instanceOf(Error)
                expect(error).to.be.exist
                expect(error.message).to.be.equal('Project not found')
            }
        })
    })

    after(async () => {
        [User.deleteMany(), Project.deleteMany()]
        return await mongoose.disconnect()
    })
})
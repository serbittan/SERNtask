require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Project } } = require('serntask-data')

const { random } = Math
const retrieveProjects = require('./retrieve-projects')


describe('retrieveProjects', () => {
    let name, email, password, projectName

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

        projectName = `projectName-${random()}`
    })

    describe('when user exist and project exist', () => {
        let id, projectId

        beforeEach(async () => {
            // creamos al user
            const user = await User.create({ name, email, password })

            id = user.id
            // creamos un project
            const project = await Project.create({ name: projectName })

            projectId = project.id

            project.creator = id


            await project.save()
        })

        it('should succeed on retrieve projects', async () => {
            const projects = await retrieveProjects(id)

            expect(projects).to.be.an('array')
            expect(projects).to.be.exist
            expect(projectId).to.exist
            expect(projects[0].creator.toString()).to.be.equal(id)
            expect(projects[0].name).to.be.equal(projectName)
            expect(projects[0].created).to.be.an.instanceOf(Date)
            expect(projects[0].id).to.be.equal(projectId)
        })

    })

    after(async () => {
        [User.deleteMany(), Project.deleteMany()]
        return await mongoose.disconnect()
    })
})
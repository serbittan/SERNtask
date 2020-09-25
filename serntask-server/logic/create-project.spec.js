require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models : { User, Project } } = require('serntask-data')

const { random } = Math
const createProject = require('./create-project')


describe('createProject', () => {
    let projectName
    let name, email, password
    
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        await [User.deleteMany(), Project.deleteMany()]
    })

    beforeEach(() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        projectName = `projectName-${random()}`
    })

    describe('when user exist', () => {
        let id, projectId

        beforeEach(async () => {
            // creamos al user
            const user = await User.create({ name, email, password })

            id = user.id
        })

        it('should succeed on correct data', async () => {

            const returnValue = await createProject(id, projectName)

            expect(returnValue).to.be.undefined

            const project = await Project.findOne({ creator: id })

            projectId = project.id

            expect(project).to.be.exist
            expect(project).to.be.an('object')
            expect(project.id.toString()).to.be.equal(projectId)
            expect(project.name).to.be.equal(projectName)
            expect(project.creator.toString()).to.be.equal(id)
            expect(project.created).to.be.an.instanceOf(Date)
        })
    })

    describe('when user do not exist', () => {
        let noId

        beforeEach(async () => {
            // eliminamos al user
            await User.deleteMany()
        })

        it('should fail and throw', async () => {
            try {
                await createProject(noId, projectName)
                throw new Error('User not found')

            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.be.equal('User not found')
            }
        })
    })

    after(async () => {
        await [User.deleteMany(), Project.deleteMany()]
        await mongoose.disconnect()
    })
})



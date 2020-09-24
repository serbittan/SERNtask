const { models: { User, Project } } = require("serntask-data")


const createProject = (id, name) => {

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error('User not found')

        const project = await new Project({ name })

        project.creator = id

        await project.save()


    })()
}

module.exports = createProject
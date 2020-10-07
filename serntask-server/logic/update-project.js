const { models: { Project } } = require('serntask-data')


const updateProject = (id, projectId, name) => {
    return (async () => {
        let project = await Project.findById(projectId)

        // existe proyecto
        if (!project) throw new Error('Project not found')

        // el usuario es el mismo que el autenticado
        if (project.creator.toString() !== id) throw new Error('Not authorized')  //ObjectId

        project = await Project.findByIdAndUpdate({ _id: projectId }, { name }, {new: true} ).lean()

        // sanitize
        project.id = project._id.toString()

        delete project._id
        delete project.__v

        return project

    })()
}

module.exports = updateProject



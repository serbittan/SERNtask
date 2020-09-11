const { models: { Project } } = require('serntask-data')

const deleteProject = (id, projectId) => {

    return (async () => {
        const project = await Project.findById(projectId)
        
        if (!project) throw new Error('Project not found')

        if (project.creator.toString() !== id) throw new Error('Not authorized')

        await Project.findOneAndRemove({ _id: projectId })

        return 


    })()
}

module.exports = deleteProject
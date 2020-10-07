const { models: { Project } } = require('serntask-data')


const retrieveProjects = (id) => {
    return (async () => {
        const projects = await Project.find({ creator: id }).lean()

        // sanitize
        projects.forEach(project => {
            project.id = project._id.toString()

            delete project._id
            delete project.__v
        })
        return projects

    })()
}

module.exports = retrieveProjects

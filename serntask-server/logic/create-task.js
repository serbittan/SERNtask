const { models: { Project, Task } } = require('serntask-data')


const createTask = (id, name, project) => {
    return (async () => {
        const _project = await Project.findById(project)

        if (!_project) throw new Error(`Project with id ${project} not found`)
        if (_project.creator.toString() !== id) throw new Error('Not authorized')

        const task = new Task({ name, project })

        task.date = Date()

        await task.save()

    })()
}

module.exports = createTask


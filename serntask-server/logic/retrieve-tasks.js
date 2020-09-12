const { models: { Project, Task } } = require('serntask-data')


const retrieveTasks = (id, project) => {
    
    return (async () => {
        const _project = await Project.findById(project)

        if (!_project) throw new Error(`project with id: ${project} not found`)
        if (_project.creator.toString() !== id) throw new Error('Not authorized')

        const tasks = await Task.find({ project }).lean()

        if (!tasks.length) throw new Error('Not tasks yet!')

        tasks.forEach(task => {
            task.id = task._id.toString()

            delete task._id
            delete task.__v
        })

        return tasks
    })()
}

module.exports = retrieveTasks
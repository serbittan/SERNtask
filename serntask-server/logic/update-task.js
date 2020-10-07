const { models: { Project, Task } } = require('serntask-data')


const updateTask = (id, project, taskId, name, status) => {
    return (async () => {
        const _project = await Project.findById(project)

        if (!_project) throw new Error(`project with id: ${project} not found`)
        if (_project.creator.toString() !== id) throw new Error('Not authorized')

        const task = await Task.findByIdAndUpdate({ _id: taskId}, { name, status }, { new: true }).lean()

        task.id = task._id.toString()

        delete task._id
        delete task.__v

        return task
        
    })()
}

module.exports = updateTask

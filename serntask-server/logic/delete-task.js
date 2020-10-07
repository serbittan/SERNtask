const { models: { Project, Task } } = require('serntask-data')


const deleteTask = (id, project, taskId) => {
    return (async () => {
        const _project = await Project.findById(project)

        if (!_project) throw new Error(`project with id: ${project} not found`)
        if (_project.creator.toString() !== id) throw new Error('Not authorized')

        await Task.findByIdAndRemove(taskId)

        return
    })()
}

module.exports = deleteTask

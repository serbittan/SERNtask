const { deleteTask } = require('../../logic')

module.exports = (req, res) => {
    const { payload: { sub: id }, params: { project, taskId } } = req

    try {
        deleteTask(id, project, taskId)
            .then(() =>
                res
                    .status(200)
                    .json({ msg: 'Task deleted successfully'})
            )
            .catch(error => 
                res
                    .status(400)
                    .json({ msg: error.message })
            )
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
const { updateTask } = require('../../logic')
const { validationResult } = require('express-validator')

module.exports =  (req, res) => {
    // validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()})
    }

    const { payload: { sub: id}, params: { project, taskId }, body: { name, status } } = req
    // const { id, taskId, name, status } = task
    try {
        updateTask(id, project, taskId, name, status)
            .then(task => 
                res
                    .status(200)
                    .json(task)
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
const { createTask } = require('../../logic')
const { validationResult } = require('express-validator')


module.exports = (req, res) => {
    // validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    const { payload: { sub: id }, body: { name, project } } = req
    
    try {
        createTask(id, name, project)
            .then(() => 
                res
                    .status(200)
                    .json({ mgs: 'Task created successfully'})
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
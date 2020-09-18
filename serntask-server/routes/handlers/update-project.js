const { updateProject } = require('../../logic')
const { validationResult } = require('express-validator')


module.exports = (req, res) => {
    // validación
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { payload: { sub: id }, params: { projectId }, body: { name } } = req
    
    try {
        updateProject(id, projectId, name)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(error => {
                res.status(404).json({ msg: error.message })
            })
    } catch (error) {
        res.status(500).send('Server Error')
    }

}
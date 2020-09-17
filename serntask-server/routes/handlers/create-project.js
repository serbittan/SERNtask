const { createProject } = require('../../logic')
const { validationResult } = require('express-validator') 



module.exports = (req, res) => {
    // validacion campos
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { payload: { sub: id }, body: { name }  } = req
    try {
        createProject(id,name)
            .then( () => {
                res.status(201).json({ msg:'Project created succesfuly' })

            })
            .catch(error => {
                res.status(400).json({ msg: error.message })
            })
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}
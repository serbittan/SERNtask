const { retrieveProjects } = require('../../logic')


module.exports = (req, res) => {
    const { payload: { sub: id} } = req
    
    try {
        retrieveProjects(id)
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(error => {
                res.status(400).json({ msg: error.message })
            })
    } catch (error) {
        res.status(500).send('Hubo un error')
        
    }
}
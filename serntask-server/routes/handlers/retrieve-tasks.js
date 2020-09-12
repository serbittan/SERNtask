const { retrieveTasks } = require('../../logic')


module.exports = (req, res) => {
    const { payload: { sub: id }, params: { project } } = req
    
    try {
        retrieveTasks(id, project)
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(error => {
                res.status(400).json({ msg: error.message })
            })
        
    } catch (error) {
        res.status(500).send('Sever Error')
    }
    
}
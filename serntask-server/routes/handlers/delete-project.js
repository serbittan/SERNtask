const { deleteProject } = require('../../logic')


module.exports = (req, res) => {
    const { payload: { sub: id }, params: { projectId } } = req

    try {
        deleteProject(id, projectId)
            .then(() =>
                res
                    .status(200)
                    .json({ msg: 'Project removed succesily' })
            )
            .catch(error =>
                res
                    .status(401)
                    .json({ msg: error.message })
            )
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
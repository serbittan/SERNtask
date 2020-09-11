const { retrieveUser } = require('../../logic')


module.exports = (req, res) => {
    const { payload: { sub: id} } = req
    
    try{
        retrieveUser(id)
            .then(user => 
                res
                .status(200)
                .json(user)
            )
            .catch(error => {
                res.status(400).json({ msg: error.message })
            })
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }

}
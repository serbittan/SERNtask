const { retrieveUser } = require('../../logic')


module.exports = (req, res) => {
    const { sub: id } = req
    console.log(id)
    try{
        retrieveUser(id)
            .then(user => 
                res
                .status(200)
                .json(user)
            )
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {

    }

}
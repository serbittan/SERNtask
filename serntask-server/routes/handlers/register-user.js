const { registerUser } = require ('../../logic')

module.exports = (req, res) => {
    const { body: { name, email, password } } = req

    try {
        registerUser(name, email, password)
            .then(() => {
                res.status(200).end()
            })
            .catch(error => {
                console.log(error.message)
                  
                    
            })

    } catch (error) {
        // TODO
    }
}

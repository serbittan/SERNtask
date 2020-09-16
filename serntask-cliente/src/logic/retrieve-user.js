import axiosClient from "../config/axios"

const retrieveUser = () => { // necesito añadir el token por headers
    return (async () => {
        const response = await axiosClient.get('/users')

        return response

    })()
}
 
export default retrieveUser
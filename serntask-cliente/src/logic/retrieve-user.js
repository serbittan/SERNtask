import axiosClient from "../config/axios"

const retrieveUser = () => { 
    return (async () => {
        const response = await axiosClient.get('/users')

        return response

    })()
}
 
export default retrieveUser